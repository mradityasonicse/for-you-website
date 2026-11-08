"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Ornament from "./ornament";

const THINGS = [
  { text: "your laugh", x: 8, y: 10, d: 0 },
  { text: "your eyes", x: 72, y: 6, d: 1.1 },
  { text: "that radiant smile", x: 22, y: 22, d: 1.4 },
  { text: "the way you say my name", x: 2, y: 40, d: 2.2 },
  { text: "your midnight thoughts", x: 68, y: 36, d: 0.6 },
  { text: "your terrible, wonderful puns", x: 10, y: 70, d: 1.7 },
  { text: "your kindness", x: 70, y: 68, d: 2.8 },
  { text: "the sparkle in your eyes", x: 54, y: 76, d: 3.1 },
  { text: "the nose scrunch", x: 36, y: 84, d: 0.9 },
  { text: "your courage", x: 38, y: 0, d: 2.4 },
];

export default function ChapterTwo() {
  return (
    <section className="relative flex min-h-[110vh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase tracking-[0.4em] text-rose-300/60"
      >
        chapter two · the little things
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-6 max-w-2xl font-serif text-4xl font-light text-rose-50 sm:text-5xl"
      >
        It&apos;s the little things.{" "}
        <em className="text-shimmer font-medium">All of them.</em>
      </motion.h2>

      {/* constellation — desktop */}
      <div className="relative mt-6 hidden h-[480px] w-full max-w-4xl md:block">
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/30 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full border border-rose-400/25"
            aria-hidden="true"
          />
          <Heart
            className="relative h-12 w-12 animate-heartbeat fill-rose-500 text-rose-400 drop-shadow-[0_0_24px_rgba(251,113,133,0.8)]"
            aria-hidden="true"
          />
        </div>
        {THINGS.map((t) => (
          <span
            key={t.text}
            className="group absolute animate-float-slow cursor-default"
            style={{ left: `${t.x}%`, top: `${t.y}%`, animationDelay: `${t.d}s` }}
          >
            <span className="flex items-center gap-2 font-serif text-lg italic text-rose-100/60 transition-all duration-300 group-hover:text-rose-200 group-hover:drop-shadow-[0_0_12px_rgba(251,113,133,0.8)] lg:text-xl">
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 animate-twinkle text-amber-300/70"
                style={{ animationDelay: `${t.d}s` }}
                aria-hidden="true"
              />
              {t.text}
            </span>
          </span>
        ))}
      </div>

      {/* chips — mobile */}
      <div className="mt-10 flex max-w-md flex-wrap items-center justify-center gap-3 md:hidden">
        {THINGS.map((t) => (
          <span key={t.text} className="glass rounded-full px-4 py-2 text-sm text-rose-100/75">
            {t.text}
          </span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mt-12 max-w-md font-serif text-lg italic text-rose-100/50"
      >
        an incomplete list — the complete one is infinite.
      </motion.p>
      <Ornament className="mt-12" />
    </section>
  );
}
