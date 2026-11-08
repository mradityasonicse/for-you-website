"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Moon, RotateCcw, Sparkles } from "lucide-react";
import Ornament from "./ornament";

const REASONS = [
  {
    number: "01",
    tag: "The Moon & You",
    text: "You are a selenophile who looks at the moon in awe, but you never realized that to me, you outshine every celestial star in the night sky.",
  },
  {
    number: "02",
    tag: "That Radiant Smile",
    text: "Your smile has this effortless magic — it can take my worst, most exhausting day and quietly turn it into pure warmth.",
  },
  {
    number: "03",
    tag: "The Little Things",
    text: "The way you laugh, the gentle sparkle in your eyes, and how you make ordinary conversations feel like favorite memories.",
  },
  {
    number: "04",
    tag: "The Symptoms",
    text: "How my heart immediately skips a beat every single time your name lights up on my screen.",
  },
  {
    number: "05",
    tag: "The Comfort",
    text: "Because with you, even quiet moments and peaceful silence feel warmer than anything else in the world.",
  },
  {
    number: "06",
    tag: "The Truth",
    text: "Because 'इश्क़ में चूर-चूर' isn't just poetry on a photograph anymore — it is honestly, wholeheartedly how I feel about you.",
  },
];

export default function LoveReasons() {
  const [index, setIndex] = useState(0);

  const current = REASONS[index];

  const nextReason = () => {
    setIndex((prev) => (prev + 1) % REASONS.length);
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
      >
        interlude · notes from my heart
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-6 max-w-2xl font-serif text-4xl font-light text-rose-50 sm:text-5xl"
      >
        Reasons why my heart{" "}
        <em className="text-shimmer font-medium italic">chose you.</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-sm text-rose-100/60"
      >
        Tap the card to draw another note ✦
      </motion.p>

      {/* Interactive Flipping Reason Card */}
      <div className="relative mt-12 w-full max-w-lg">
        {/* Glow Halo */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/15 blur-3xl"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.94, rotate: 1.5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={nextReason}
            whileHover={{ scale: 1.025, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="glass-cinematic relative cursor-pointer overflow-hidden rounded-3xl p-8 pb-10 text-left shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(251,113,133,0.18)] sm:p-10"
          >
            {/* Header info inside card */}
            <div className="flex items-center justify-between border-b border-rose-300/15 pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-rose-200">
                <Sparkles className="h-3 w-3 text-amber-300" />
                <span>{current.tag}</span>
              </span>
              <span className="font-serif text-sm font-semibold tracking-widest text-rose-300/50">
                {current.number} / {String(REASONS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Note text */}
            <p className="mt-6 min-h-[5.5rem] font-serif text-xl font-light leading-relaxed text-rose-50/90 sm:text-2xl">
              &ldquo;{current.text}&rdquo;
            </p>

            {/* Footer inside card */}
            <div className="mt-8 flex items-center justify-between text-xs text-rose-300/60">
              <span className="flex items-center gap-1.5 font-script text-2xl text-rose-200/80">
                <Heart className="h-4 w-4 fill-rose-500 text-rose-400" />
                <span>always yours</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-200/70">
                <RotateCcw className="h-3 w-3" />
                <span>Tap for next</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Progress Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {REASONS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to reason ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "w-6 bg-rose-400" : "w-2 bg-rose-400/25 hover:bg-rose-400/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Ornament className="mt-16" />
    </section>
  );
}
