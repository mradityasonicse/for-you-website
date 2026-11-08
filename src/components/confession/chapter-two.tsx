"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Ornament from "./ornament";

const THINGS = [
  { text: "your laugh", x: 10, y: 12, d: 0 },
  { text: "that radiant smile", x: 74, y: 8, d: 1.2 },
  { text: "the way you say my name", x: 4, y: 42, d: 2.2 },
  { text: "your midnight thoughts", x: 72, y: 38, d: 0.6 },
  { text: "the sparkle in your eyes", x: 12, y: 72, d: 1.8 },
  { text: "your kindness", x: 68, y: 70, d: 2.7 },
  { text: "the nose scrunch", x: 36, y: 86, d: 1.0 },
  { text: "your courage", x: 40, y: 2, d: 2.4 },
];

export default function ChapterTwo() {
  return (
    <section
      id="chapter-2"
      className="relative flex min-h-[110vh] flex-col items-center justify-center px-6 py-32 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
      >
        chapter two · the little things
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-6 max-w-2xl font-serif text-4xl font-light text-rose-50 sm:text-5xl lg:text-6xl"
      >
        It&apos;s the little things.{" "}
        <em className="text-shimmer font-medium italic">All of them.</em>
      </motion.h2>

      {/* Constellation Canvas Orbit Area — Desktop */}
      <div className="relative mt-10 hidden h-[520px] w-full max-w-4xl md:block">
        {/* Center Heart Beacon */}
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/25 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full border border-rose-400/20"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full border border-amber-300/10"
            style={{ animationDelay: "1.2s" }}
            aria-hidden="true"
          />
          <Heart
            className="relative h-14 w-14 animate-heartbeat fill-rose-500 text-rose-300 drop-shadow-[0_0_28px_rgba(251,113,133,0.85)]"
            aria-hidden="true"
          />
        </div>

        {/* Orbiting Starlight Nodes */}
        {THINGS.map((t) => (
          <motion.div
            key={t.text}
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="group absolute animate-float-slow cursor-default"
            style={{ left: `${t.x}%`, top: `${t.y}%`, animationDelay: `${t.d}s` }}
          >
            <span className="glass flex items-center gap-2 rounded-full px-4 py-2 font-serif text-lg italic text-rose-100/70 transition-all duration-300 group-hover:border-rose-300/50 group-hover:bg-rose-500/15 group-hover:text-rose-100 group-hover:drop-shadow-[0_0_20px_rgba(251,113,133,0.7)] lg:text-xl">
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 animate-twinkle text-amber-300"
                style={{ animationDelay: `${t.d}s` }}
                aria-hidden="true"
              />
              <span>{t.text}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating Chips — Mobile */}
      <div className="mt-10 flex max-w-md flex-wrap items-center justify-center gap-3 md:hidden">
        {THINGS.map((t) => (
          <span
            key={t.text}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-rose-100/80"
          >
            <Sparkles className="h-3 w-3 text-amber-300/80" />
            <span>{t.text}</span>
          </span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mt-14 max-w-md font-serif text-lg italic text-rose-100/55"
      >
        an incomplete list — the complete one is infinite.
      </motion.p>
      <Ornament className="mt-12" />
    </section>
  );
}
