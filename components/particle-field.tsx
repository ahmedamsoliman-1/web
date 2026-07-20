"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const area = () => window.innerWidth * window.innerHeight;
    const targetCount = () => {
      const base = Math.round(area() / 16000);
      return Math.max(24, Math.min(coarse ? 46 : 120, base));
    };

    const particles: P[] = [];
    const seed = () => {
      particles.length = 0;
      const n = targetCount();
      for (let i = 0; i < n; i++) {
        // deterministic-ish spread without Math.random dependency issues
        const rx = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const ry = Math.abs(Math.sin(i * 78.233) * 12543.633) % 1;
        const rvx = (Math.abs(Math.sin(i * 3.17) * 1000) % 1) - 0.5;
        const rvy = (Math.abs(Math.cos(i * 5.71) * 1000) % 1) - 0.5;
        particles.push({ x: rx * w, y: ry * h, vx: rvx * 0.32, vy: rvy * 0.32 });
      }
    };

    // Theme-aware colour, re-read on toggle.
    let rgb: [number, number, number] = [102, 243, 209];
    const readColor = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--particle-rgb").trim();
      const parts = raw.split(",").map((s) => parseInt(s, 10));
      if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) rgb = [parts[0], parts[1], parts[2]];
    };
    readColor();

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      seed();
    };

    // ---- WebGL setup (falls back to 2D on any failure) ----
    const gl = (canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false }) ||
      canvas.getContext("experimental-webgl", { alpha: true })) as WebGLRenderingContext | null;

    let use2d = !gl;
    let program: WebGLProgram | null = null;
    let posBuf: WebGLBuffer | null = null;
    let aPos = -1;
    let aAlpha = -1;
    let uColor: WebGLUniformLocation | null = null;
    let uPoint: WebGLUniformLocation | null = null;

    const compile = (type: number, src: string) => {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(s);
        return null;
      }
      return s;
    };

    if (gl) {
      const vs = compile(
        gl.VERTEX_SHADER,
        `attribute vec2 a_pos; attribute float a_alpha; uniform float u_point; varying float v_alpha;
         void main(){ v_alpha=a_alpha; gl_Position=vec4(a_pos,0.0,1.0); gl_PointSize=u_point; }`
      );
      const fs = compile(
        gl.FRAGMENT_SHADER,
        `precision mediump float; uniform vec3 u_color; uniform float u_point; varying float v_alpha;
         void main(){
           if(u_point>0.5){ vec2 c=gl_PointCoord-vec2(0.5); float d=length(c); if(d>0.5) discard; float a=smoothstep(0.5,0.1,d); gl_FragColor=vec4(u_color, a*v_alpha); }
           else { gl_FragColor=vec4(u_color, v_alpha); }
         }`
      );
      if (vs && fs) {
        program = gl.createProgram();
        gl.attachShader(program!, vs);
        gl.attachShader(program!, fs);
        gl.linkProgram(program!);
        if (gl.getProgramParameter(program!, gl.LINK_STATUS)) {
          aPos = gl.getAttribLocation(program!, "a_pos");
          aAlpha = gl.getAttribLocation(program!, "a_alpha");
          uColor = gl.getUniformLocation(program!, "u_color");
          uPoint = gl.getUniformLocation(program!, "u_point");
          posBuf = gl.createBuffer();
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        } else {
          use2d = true;
        }
      } else {
        use2d = true;
      }
    }

    const ctx2d = use2d ? canvas.getContext("2d") : null;
    resize();

    const LINK_DIST = coarse ? 120 : 150;
    const lineVerts: number[] = [];
    const pointVerts: number[] = [];

    const step = () => {
      // physics
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 0.01) {
            const f = (1 - d2 / 26000) * 0.9;
            const d = Math.sqrt(d2);
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
      }
    };

    const buildBuffers = () => {
      lineVerts.length = 0;
      pointVerts.length = 0;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        pointVerts.push((a.x / w) * 2 - 1, 1 - (a.y / h) * 2, 0.9);
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.5;
            lineVerts.push((a.x / w) * 2 - 1, 1 - (a.y / h) * 2, alpha);
            lineVerts.push((b.x / w) * 2 - 1, 1 - (b.y / h) * 2, alpha);
          }
        }
      }
    };

    const drawGL = () => {
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.useProgram(program);
      gl!.uniform3f(uColor, rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);

      const drawSet = (verts: number[], mode: number, isPoint: number) => {
        if (!verts.length) return;
        gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuf);
        gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array(verts), gl!.DYNAMIC_DRAW);
        gl!.enableVertexAttribArray(aPos);
        gl!.vertexAttribPointer(aPos, 2, gl!.FLOAT, false, 12, 0);
        gl!.enableVertexAttribArray(aAlpha);
        gl!.vertexAttribPointer(aAlpha, 1, gl!.FLOAT, false, 12, 8);
        gl!.uniform1f(uPoint, isPoint ? dpr * 3.2 : 0);
        gl!.drawArrays(mode, 0, verts.length / 3);
      };
      drawSet(lineVerts, gl!.LINES, 0);
      drawSet(pointVerts, gl!.POINTS, 1);
    };

    const draw2d = () => {
      const c = ctx2d!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, w, h);
      const col = `${rgb[0]},${rgb[1]},${rgb[2]}`;
      c.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            c.strokeStyle = `rgba(${col},${((1 - dist / LINK_DIST) * 0.5).toFixed(3)})`;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }
      }
      c.fillStyle = `rgba(${col},0.9)`;
      for (const p of particles) {
        c.beginPath();
        c.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        c.fill();
      }
    };

    let raf = 0;
    let running = true;
    const frame = () => {
      if (!running) return;
      step();
      buildBuffers();
      if (use2d) draw2d();
      else drawGL();
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      // one static frame, no animation
      buildBuffers();
      if (use2d) draw2d();
      else drawGL();
    } else {
      raf = requestAnimationFrame(frame);
    }

    // events
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onResize = () => resize();
    const onVisibility = () => {
      if (reduce) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const onTheme = () => readColor();

    if (!coarse) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("themechange", onTheme);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
