"use client";

import { useEffect } from "react";

export function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // --- Scroll progress bar ---
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    const onScrollProgress = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    onScrollProgress();
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScrollProgress);
      bar.remove();
    });

    // --- Cursor spotlight (desktop only) ---
    if (fine && !reduce) {
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
      let raf = 0;
      let tx = window.innerWidth / 2;
      let ty = window.innerHeight / 2;
      let cx = tx;
      let cy = ty;
      const loop = () => {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        glow.style.transform = `translate(${cx}px, ${cy}px)`;
        raf = requestAnimationFrame(loop);
      };
      const onMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        glow.style.opacity = "1";
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
        glow.remove();
      });
    }

    // --- Spotlight on cards (glow follows pointer within each card) ---
    if (fine) {
      const cards = document.querySelectorAll<HTMLElement>("[data-spotlight]");
      const onEnter = (el: HTMLElement) => (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      const handlers: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
      cards.forEach((el) => {
        const h = onEnter(el);
        el.addEventListener("pointermove", h, { passive: true });
        handlers.push([el, h]);
      });
      cleanups.push(() => handlers.forEach(([el, h]) => el.removeEventListener("pointermove", h)));
    }

    // --- 3D tilt / pointer-parallax on the hero art ---
    if (fine && !reduce) {
      const tilt = document.querySelector<HTMLElement>("[data-tilt]");
      if (tilt) {
        const onMove = (e: PointerEvent) => {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
        };
        const onLeave = () => {
          tilt.style.setProperty("--rx", "0deg");
          tilt.style.setProperty("--ry", "0deg");
        };
        tilt.addEventListener("pointermove", onMove, { passive: true });
        tilt.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          tilt.removeEventListener("pointermove", onMove);
          tilt.removeEventListener("pointerleave", onLeave);
        });
      }
    }

    // --- Scroll-scrubbed parallax (sets --p 0..1 per element) ---
    const scrubEls = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]"));
    if (scrubEls.length && !reduce) {
      let ticking = false;
      const update = () => {
        ticking = false;
        const vh = window.innerHeight || 1;
        for (const el of scrubEls) {
          const r = el.getBoundingClientRect();
          const p = (vh - r.top) / (vh + r.height);
          el.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(4));
        }
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    // --- Count-up numbers when they enter the viewport ---
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    if (counters.length) {
      const runCount = (el: HTMLElement) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        if (reduce) {
          el.textContent = `${target}${suffix}`;
          return;
        }
        const dur = 1400;
        let start = 0;
        const step = (now: number) => {
          if (!start) start = now;
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((c) => io.observe(c));
      cleanups.push(() => io.disconnect());
    }

    // --- Section-aware nav highlighting ---
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              document.querySelectorAll(".nav-links a[href^='#']").forEach((a) => {
                a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
              });
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
