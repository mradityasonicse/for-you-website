"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number; speed: number; warm: boolean };
type Firefly = { x: number; y: number; vx: number; vy: number; r: number; color: string; phase: number };
type Bokeh = { x: number; y: number; r: number; vy: number; alpha: number; color: string };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };

const ROSE = "251,113,133";
const BLUSH = "253,164,175";
const GOLD = "252,211,77";

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let flies: Firefly[] = [];
    let bokeh: Bokeh[] = [];
    let meteor: Meteor | null = null;
    let frame = 0;
    let nextMeteor = 420;
    let raf = 0;

    const seed = () => {
      stars = Array.from({ length: Math.min(150, Math.floor((w * h) / 11000)) }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 1.4),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.4, 1.3),
        warm: Math.random() < 0.35,
      }));
      flies = Array.from({ length: Math.min(28, Math.max(14, Math.floor(w / 55))) }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.16, 0.16),
        vy: rand(-0.09, 0.09),
        r: rand(1.3, 2.9),
        color: Math.random() < 0.6 ? BLUSH : GOLD,
        phase: rand(0, Math.PI * 2),
      }));
      bokeh = Array.from({ length: 7 }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(55, 150),
        vy: rand(-0.14, -0.04),
        alpha: rand(0.025, 0.06),
        color: Math.random() < 0.7 ? ROSE : GOLD,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawBokeh = () => {
      for (const b of bokeh) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(${b.color},${b.alpha})`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStars = (t: number) => {
      for (const s of stars) {
        const a = 0.22 + 0.6 * Math.abs(Math.sin(t * 0.008 * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.warm ? `rgba(${GOLD},0.9)` : "rgba(255,244,240,0.95)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawFlies = (t: number) => {
      for (const f of flies) {
        f.x += f.vx + Math.sin(t * 0.001 + f.phase) * 0.12;
        f.y += f.vy + Math.cos(t * 0.0013 + f.phase) * 0.08;
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;
        if (f.y < -20) f.y = h + 20;
        if (f.y > h + 20) f.y = -20;
        const glow = 6 + 4 * Math.sin(t * 0.002 + f.phase);
        ctx.shadowColor = `rgba(${f.color},0.9)`;
        ctx.shadowBlur = glow;
        ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 0.0016 + f.phase);
        ctx.fillStyle = `rgba(${f.color},0.95)`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawMeteor = () => {
      if (!meteor) {
        if (frame > nextMeteor) {
          meteor = {
            x: rand(w * 0.25, w * 0.95),
            y: rand(-40, h * 0.25),
            vx: rand(-6.5, -4),
            vy: rand(2.6, 4.2),
            life: 0,
            maxLife: 55,
          };
        }
        return;
      }
      const m = meteor;
      m.x += m.vx;
      m.y += m.vy;
      m.life++;
      const p = 1 - m.life / m.maxLife;
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
      grad.addColorStop(0, `rgba(255,241,242,${0.85 * p})`);
      grad.addColorStop(1, "rgba(251,113,133,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 12, m.y - m.vy * 12);
      ctx.stroke();
      if (m.life >= m.maxLife) {
        meteor = null;
        nextMeteor = frame + rand(380, 900);
      }
    };

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      drawBokeh();
      drawStars(frame);
      drawMeteor();
      drawFlies(frame);
      raf = requestAnimationFrame(tick);
    };

    const renderStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawBokeh();
      drawStars(120);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      renderStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 55%, rgba(12,4,8,0.75) 100%)",
        }}
      />
    </div>
  );
}
