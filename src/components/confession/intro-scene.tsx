"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Moon, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function IntroScene() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-24 text-center"
    >
      {/* Volumetric Radial Spotlight */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-rose-500/15 via-amber-500/10 to-transparent blur-[160px]"
        aria-hidden="true"
      />

      {/* Intertwined Celestial Monogram Logo Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8"
      >
        <span
          className="absolute inset-0 -m-8 animate-glow-pulse rounded-full border border-amber-400/20"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 -m-16 animate-glow-pulse rounded-full border border-rose-400/15"
          style={{ animationDelay: "1.4s" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -m-12 rounded-full bg-rose-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative h-24 w-24 drop-shadow-[0_0_45px_rgba(251,113,133,0.9)] sm:h-28 sm:w-28">
          <Image src="/logo.svg" alt="The Moon & Heart Monogram" fill className="object-contain" priority />
        </div>
      </motion.div>

      {/* Editorial Chapter Badge */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.3}
        className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.45em] text-rose-200/90 backdrop-blur-md"
      >
        <Moon className="h-3 w-3 text-amber-300 animate-pulse" />
        <span>She is a Selenophile · He is the Moon</span>
      </motion.div>

      {/* Main Dramatic Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.7}
        className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[1.08] tracking-tight text-rose-50 sm:text-6xl lg:text-7xl"
      >
        There&apos;s something{" "}
        <em className="text-shimmer font-medium italic">I&apos;ve been aching</em> to tell you…
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1.1}
        className="mt-6 max-w-xl text-base leading-relaxed text-rose-100/70 sm:text-lg"
      >
        Take a gentle breath. Scroll slowly. Every constellation, every memory, and every beat
        of this universe was built for you.
      </motion.p>

      {/* Interactive Call to Action */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1.5}
        className="mt-10 flex flex-col items-center gap-3.5"
      >
        <a
          href="#chapter-1"
          className="ring-glow group relative inline-flex h-13 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-400 px-9 text-base font-semibold text-[#240a13] shadow-[0_10px_35px_rgba(251,113,133,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_45px_rgba(251,113,133,0.6)] active:scale-95"
        >
          <Sparkles
            className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          />
          <span>Begin our story</span>
        </a>
        <p className="text-xs text-rose-200/50">
          ✦ tap the soundtrack button top-right for the ambient music ✦
        </p>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.a
        href="#chapter-1"
        aria-label="Scroll to begin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-rose-200/50 transition-colors hover:text-rose-100"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
