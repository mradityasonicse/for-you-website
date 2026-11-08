"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  gold: boolean;
};

export default function CursorSparkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let sparks: Spark[] = [];
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const gold = Math.random() < 0.35;
      const n = Math.random() < 0.4 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1 - 0.35,
          life: 0,
          maxLife: 30 + Math.random() * 28,
          size: 1.6 + Math.random() * 2.6,
          gold,
        });
      }
      if (sparks.length > 140) sparks = sparks.slice(-140);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const drawStar = (s: Spark) => {
      const p = 1 - s.life / s.maxLife;
      const color = s.gold ? "252,211,77" : "253,164,175";
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.life * 0.08);
      ctx.strokeStyle = `rgba(${color},${p})`;
      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      ctx.shadowColor = `rgba(${color},${p})`;
      ctx.shadowBlur = 6;
      const r = s.size * (0.5 + 0.5 * p);
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      sparks = sparks.filter((s) => s.life < s.maxLife);
      for (const s of sparks) {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.015;
        drawStar(s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true" />;
}
