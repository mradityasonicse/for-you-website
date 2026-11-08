"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Moon } from "lucide-react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  life: number;
  maxLife: number;
  color: string;
  heart: boolean;
};

const COLORS = ["#fb7185", "#fda4af", "#f9a8d4", "#fcd34d", "#fde68a", "#fff1f2"];
const TEASES = [
  "",
  "are you sure?",
  "really sure?",
  "think again 🥺",
  "last chance!",
  "you're breaking my heart…",
  "the Yes button is right there, you know",
  "okay, I'll just wait here. forever.",
];

const DECO_HEARTS = [
  { c: "left-[8%] top-[18%]", d: "0s", s: "h-6 w-6" },
  { c: "right-[10%] top-[24%]", d: "1.2s", s: "h-8 w-8" },
  { c: "left-[14%] bottom-[20%]", d: "0.6s", s: "h-5 w-5" },
  { c: "right-[16%] bottom-[26%]", d: "1.8s", s: "h-7 w-7" },
  { c: "left-[45%] top-[10%]", d: "2.4s", s: "h-4 w-4" },
  { c: "right-[38%] bottom-[12%]", d: "3s", s: "h-5 w-5" },
];

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function clampAlpha(p: Particle) {
  return Math.max(0, Math.min(1, p.life / p.maxLife));
}

function drawHeart(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.scale(p.size, p.size);
  ctx.beginPath();
  ctx.moveTo(0, 0.35);
  ctx.bezierCurveTo(-0.55, -0.35, -1.1, 0.35, 0, 1);
  ctx.bezierCurveTo(1.1, 0.35, 0.55, -0.35, 0, 0.35);
  ctx.closePath();
  ctx.globalAlpha = clampAlpha(p);
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();
}

function drawSpark(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = clampAlpha(p);
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 8;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, Math.max(0.6, p.size * 0.14), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function Finale() {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [saidYes, setSaidYes] = useState(false);
  const noGone = attempts >= 7;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const burstTimerRef = useRef<number | null>(null);
  const spawnBurstRef = useRef<((x: number, y: number, count: number) => void) | null>(null);
  const reduced = useReducedMotion() ?? false;

  const yesScale = Math.min(1 + attempts * 0.12, 2.4);
  const noScale = Math.max(1 - attempts * 0.1, 0.55);
  const tease = TEASES[Math.min(attempts, TEASES.length - 1)];

  const dodge = useCallback(() => {
    setAttempts((a) => Math.min(a + 1, 8));
    const small = typeof window !== "undefined" && window.innerWidth < 640;
    setNoPos({
      x: rand(...(small ? ([-60, 60] as const) : ([-140, 140] as const))),
      y: rand(...(small ? ([-46, 46] as const) : ([-70, 70] as const))),
    });
  }, []);

  const closeOverlay = useCallback((scrollToTop: boolean) => {
    setSaidYes(false);
    setAttempts(0);
    setNoPos({ x: 0, y: 0 });
    if (scrollToTop) {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ── celebration canvas ────────────────────────────────────────
  useEffect(() => {
    if (!saidYes) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

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

    const spawnBurst = (bx: number, by: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(1.5, 6.5);
        particlesRef.current.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: rand(5, 13),
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.05, 0.05),
          life: 0,
          maxLife: rand(90, 170),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          heart: Math.random() < 0.65,
        });
      }
      if (particlesRef.current.length > 380) {
        particlesRef.current = particlesRef.current.slice(-380);
      }
    };
    spawnBurstRef.current = spawnBurst;

    if (reduced) {
      const renderStatic = () => {
        resize();
        particlesRef.current = [];
        for (let i = 0; i < 42; i++) {
          particlesRef.current.push({
            x: rand(0, w),
            y: rand(0, h),
            vx: 0,
            vy: 0,
            size: rand(6, 14),
            rot: rand(0, Math.PI * 2),
            vr: 0,
            life: 60,
            maxLife: 90,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            heart: Math.random() < 0.7,
          });
        }
        ctx.clearRect(0, 0, w, h);
        for (const p of particlesRef.current) {
          if (p.heart) drawHeart(ctx, p);
          else drawSpark(ctx, p);
        }
      };
      renderStatic();
      window.addEventListener("resize", renderStatic);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", renderStatic);
        particlesRef.current = [];
        spawnBurstRef.current = null;
      };
    }

    spawnBurst(w / 2, h / 2.4, 70);
    const schedule = () => {
      burstTimerRef.current = window.setTimeout(() => {
        spawnBurst(rand(w * 0.15, w * 0.85), rand(h * 0.15, h * 0.6), Math.floor(rand(28, 50)));
        schedule();
      }, rand(650, 900));
    };
    schedule();

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.life++;
        if (p.life >= p.maxLife) {
          arr.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.035;
        p.rot += p.vr;
        if (p.heart) drawHeart(ctx, p);
        else drawSpark(ctx, p);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
      spawnBurstRef.current = null;
    };
  }, [saidYes, reduced]);

  // ── escape key + focus management for the overlay ────────────
  useEffect(() => {
    if (!saidYes) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay(false);
    };
    window.addEventListener("keydown", onKey);
    contentRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [saidYes, closeOverlay]);

  return (
    <section
      id="finale"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9 }}
        className="font-script text-3xl text-rose-200/80 sm:text-4xl"
      >
        so… here it is
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-4 text-[11px] uppercase tracking-[0.4em] text-rose-300/50"
      >
        the final chapter
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-6 max-w-4xl font-serif text-5xl font-light leading-tight text-rose-50 sm:text-7xl lg:text-8xl"
      >
        Will you <em className="text-shimmer font-medium">be mine?</em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.55 }}
        className="mt-6 max-w-md text-sm text-rose-100/50 sm:text-base"
      >
        No pressure. (Okay — tiny pressure. The other button is very persuasive.)
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
      >
        <motion.button
          type="button"
          onClick={() => setSaidYes(true)}
          whileHover={{ scale: yesScale * 1.06 }}
          whileTap={{ scale: yesScale * 0.94 }}
          animate={{ scale: noGone ? [yesScale, yesScale + 0.05, yesScale] : yesScale }}
          transition={
            noGone
              ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const }
              : { type: "spring", stiffness: 300, damping: 18 }
          }
          className="ring-glow flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-10 text-lg font-semibold text-[#2a0d16]"
        >
          {attempts >= 4 ? "Yes — a thousand times" : "Yes"}
        </motion.button>

        <AnimatePresence>
          {!noGone && (
            <motion.button
              key="no"
              type="button"
              onMouseEnter={dodge}
              onFocus={dodge}
              onClick={(e) => {
                e.preventDefault();
                dodge();
              }}
              animate={{ x: noPos.x, y: noPos.y, scale: noScale, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="h-14 w-full max-w-xs rounded-full border border-rose-300/30 px-8 text-lg text-rose-100/70 backdrop-blur-sm"
            >
              No
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex min-h-6 items-center justify-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {noGone ? (
            <motion.p
              key="gone"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-100/40"
            >
              the universe only accepts one answer anyway 😉
            </motion.p>
          ) : (
            tease && (
              <motion.p
                key={tease}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-sm italic text-rose-200/70"
              >
                {tease}
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {saidYes && (
          <motion.div
            key="celebration"
            role="dialog"
            aria-label="Celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              spawnBurstRef.current?.(e.clientX, e.clientY, 12);
            }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#160a10]/95 px-6 text-center backdrop-blur-md"
          >
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            />
            {DECO_HEARTS.map((hd, i) => (
              <Heart
                key={i}
                aria-hidden="true"
                className={`pointer-events-none absolute ${hd.c} ${hd.s} animate-float-slow fill-rose-400/30 text-rose-400/30`}
                style={{ animationDelay: hd.d }}
              />
            ))}

            <div
              ref={contentRef}
              tabIndex={-1}
              className="relative z-10 flex flex-col items-center outline-none"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[11px] uppercase tracking-[0.4em] text-amber-200/70"
              >
                and the universe said—
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 140, damping: 15 }}
                className="relative mt-4 flex items-center justify-center -space-x-3 sm:-space-x-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-rose-300/90 p-0.5 shadow-[0_0_30px_rgba(251,113,133,0.7)] sm:h-24 sm:w-24">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/memories/memory-2.jpg"
                      alt="That Radiant Smile"
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-400 shadow-[0_0_15px_rgba(251,113,133,0.8)]">
                  <Heart className="h-4 w-4 fill-white text-white animate-pulse" />
                </div>
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-300/90 p-0.5 shadow-[0_0_30px_rgba(252,211,77,0.6)] sm:h-24 sm:w-24">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/memories/memory-1.jpg"
                      alt="Effortlessly You"
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 14 }}
                className="text-shimmer mt-4 font-script text-6xl sm:text-8xl"
              >
                you said YES ♥
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-6 font-serif text-xl text-rose-50/90 sm:text-2xl"
              >
                You just made me the happiest person alive.
              </motion.p>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.68 }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-500/10 px-4 py-1 font-serif text-sm italic text-amber-200"
              >
                <Moon className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                <span>She is a selenophile, and he is the moon 🌕</span>
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.85 }}
                className="glass-cinematic mt-5 max-w-sm rounded-2xl border border-amber-300/30 p-4 text-center shadow-[0_0_35px_rgba(252,211,77,0.2)]"
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300/80">
                  ✦ Certificate of Us ✦
                </p>
                <p className="mt-1 font-serif text-base italic text-rose-100/90">
                  &ldquo;इश्क़ में चूर-चूर... officially forever.&rdquo;
                </p>
                <p className="mt-2 text-[10px] tracking-widest text-rose-200/50 uppercase">
                  Signed under the Moon & Stars
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => closeOverlay(true)}
                  className="h-11 rounded-full border border-rose-300/30 px-6 text-rose-100/80 transition hover:bg-rose-500/10"
                >
                  Relive our story ↺
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sw = window.innerWidth;
                    const sh = window.innerHeight;
                    spawnBurstRef.current?.(sw / 2, sh / 2.4, 40);
                    spawnBurstRef.current?.(
                      rand(sw * 0.2, sw * 0.4),
                      rand(sh * 0.2, sh * 0.5),
                      26
                    );
                    spawnBurstRef.current?.(
                      rand(sw * 0.6, sw * 0.8),
                      rand(sh * 0.2, sh * 0.5),
                      26
                    );
                  }}
                  className="ring-glow h-11 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-6 font-semibold text-[#2a0d16] transition hover:scale-105"
                >
                  One more ♥
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
