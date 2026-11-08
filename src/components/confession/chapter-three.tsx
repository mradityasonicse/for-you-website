"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import Ornament from "./ornament";

function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

const ECG_PATH =
  "M0 60 L110 60 L124 44 L136 76 L148 24 L162 98 L174 44 L186 60 L320 60 L334 44 L346 76 L358 24 L372 98 L384 44 L396 60 L600 60";

const cardClass =
  "glass-cinematic rounded-2xl p-6 text-center transition-all duration-300 hover:border-rose-300/40 hover:-translate-y-1.5 shadow-lg";

export default function ChapterThree() {
  return (
    <section
      id="symptoms"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
      >
        chapter five · the telemetry & pulse
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-6 max-w-2xl font-serif text-4xl font-light text-rose-50 sm:text-5xl lg:text-6xl"
      >
        Then there&apos;s what you{" "}
        <em className="text-shimmer font-medium italic">do to me…</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-rose-100/65"
      >
        My heart? It completely forgot how to beat quietly around you. Science might call it an
        elevated pulse. I just call it <em className="font-serif italic text-rose-200">you</em>.
      </motion.p>

      {/* Pulsing ECG Line Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-12 w-full max-w-2xl"
      >
        <svg
          viewBox="0 0 600 120"
          className="w-full"
          role="img"
          aria-label="A pulsing heartbeat line"
        >
          <defs>
            <linearGradient id="ecg-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <path
            d={ECG_PATH}
            fill="none"
            stroke="rgba(251,113,133,0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={ECG_PATH}
            fill="none"
            stroke="url(#ecg-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            style={{
              strokeDasharray: "14 86",
              animation: "ecg 3.2s linear infinite",
              filter: "drop-shadow(0 0 8px rgba(251,113,133,0.85))",
            }}
          />
        </svg>
      </motion.div>

      {/* Telemetry Stats Cards */}
      <div className="mt-12 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -6 }}
          className={cardClass}
        >
          <p className="font-serif text-5xl">
            <span className="text-shimmer">∞</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-rose-100/50">
            thoughts of you, daily
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          whileHover={{ y: -6 }}
          className={cardClass}
        >
          <p className="font-serif text-5xl">
            <span className="text-shimmer">
              <CountUp to={100} />%
            </span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-rose-100/50">
            distracted since we met
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          whileHover={{ y: -6 }}
          className={cardClass}
        >
          <p className="font-serif text-5xl">
            <span className="text-shimmer">0</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-rose-100/50">
            chances I ever stop
          </p>
        </motion.div>
      </div>

      <Ornament className="mt-16" />
    </section>
  );
}
