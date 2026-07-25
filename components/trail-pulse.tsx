"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "trail_pulse_session";
const USER_KEY = "trail_pulse_user";

function identifier(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function storedIdentifier(key: string, prefix: string, storage: Storage) {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const value = identifier(prefix);
  storage.setItem(key, value);
  return value;
}

export function track(
  event: string,
  properties: Record<string, string | number | boolean> = {}
) {
  try {
    const payload = JSON.stringify({
      event,
      user: { id: storedIdentifier(USER_KEY, "anon", localStorage) },
      sessionId: storedIdentifier(SESSION_KEY, "session", sessionStorage),
      properties,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/trail-pulse",
        new Blob([payload], { type: "application/json" })
      );
      return;
    }

    void fetch("/api/trail-pulse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Analytics must never interrupt the visitor experience.
  }
}

export function TrailPulse() {
  const pathname = usePathname();

  useEffect(() => {
    track("page.viewed", {
      path: pathname,
      referrerHost: document.referrer
        ? new URL(document.referrer).hostname
        : "direct",
    });

    const viewed = new Set<string>();
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = (entry.target as HTMLElement).id;
          if (entry.isIntersecting && section && !viewed.has(section)) {
            viewed.add(section);
            track("section.viewed", { path: pathname, section });
          }
        }
      },
      { threshold: 0.55 }
    );
    sections.forEach((section) => observer.observe(section));

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      const name = target.dataset.track;
      if (name) {
        track(name, {
          path: pathname,
          target: target.dataset.trackTarget || "unknown",
        });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
