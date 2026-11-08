"use client";

import { motion } from "framer-motion";
import { ChevronDown, Heart, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: d, ease: "easeOut" as const },
  }),
};

export default function IntroScene() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative mb-10"
      >
        <span
          className="absolute inset-0 -m-5 animate-glow-pulse rounded-full border border-rose-400/25"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 -m-10 animate-glow-pulse rounded-full border border-rose-400/15"
          style={{ animationDelay: "1.2s" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -m-8 rounded-full bg-rose-500/25 blur-3xl"
          aria-hidden="true"
        />
        <Heart
          className="relative h-20 w-20 animate-heartbeat fill-rose-500 text-rose-400 drop-shadow-[0_0_35px_rgba(251,113,133,0.85)] sm:h-24 sm:w-24"
          aria-hidden="true"
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.5}
        className="font-script text-3xl text-rose-200/90 sm:text-4xl"
      >
        hey, you ✦
      </motion.p>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.9}
        className="mt-5 max-w-3xl font-serif text-5xl font-light leading-[1.08] tracking-tight text-rose-50 sm:text-6xl lg:text-7xl"
      >
        There&apos;s something{" "}
        <em className="text-shimmer font-medium">I&apos;ve been aching</em> to tell you…
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1.3}
        className="mt-6 max-w-xl text-base leading-relaxed text-rose-100/60 sm:text-lg"
      >
        Take a breath. Scroll slowly. This little universe was built just for you — every star,
        every word, every heartbeat of it.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1.7}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <a
          href="#chapter-1"
          className="ring-glow group inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-8 text-base font-semibold text-[#2a0d16] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Sparkles
            className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          />
          Begin our story
        </a>
        <p className="text-xs text-rose-100/40">
          ✦ tip: tap the speaker, top right — the music was written for this ✦
        </p>
      </motion.div>

      <motion.a
        href="#chapter-1"
        aria-label="Scroll to begin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-7 flex flex-col items-center gap-1 text-rose-200/50 transition-colors hover:text-rose-200"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
