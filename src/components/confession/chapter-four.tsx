"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import Ornament from "./ornament";

const LETTER = `Dear you,

I've rewritten this a hundred times in my head. Every version felt too small, too ordinary, too scared to capture what you really mean to me.

So here it is — honest, simple, and true:

I like you. Truly, deeply like you.

Not the fleeting kind. The kind that memorizes the sound of your laughter like a favorite song. The kind that turns ordinary days into my favorite memories. The kind I can't keep quiet about anymore.`;

export default function ChapterFour() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const reduced = useReducedMotion() ?? false;
  const [count, setCount] = useState(reduced ? LETTER.length : 0);
  const done = count >= LETTER.length;

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= LETTER.length) {
          window.clearInterval(id);
          return c;
        }
        return c + (Math.random() < 0.2 ? 2 : 1);
      });
    }, 24);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="text-center text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
      >
        chapter five · the truth
      </motion.p>

      {/* Tactile Letter Card with Candlelight Glow */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 48, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-cinematic relative mt-14 w-full max-w-2xl rounded-3xl p-8 sm:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_50px_rgba(251,113,133,0.18)]"
      >
        {/* Wax-Seal Heart Medallion */}
        <div className="ring-glow absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 shadow-[0_0_30px_rgba(251,113,133,0.85)]">
          <Heart className="h-6 w-6 fill-rose-100 text-rose-100 animate-heartbeat" aria-hidden="true" />
        </div>

        <p className="min-h-[16rem] whitespace-pre-wrap text-left font-serif text-lg leading-relaxed text-rose-50/90 sm:text-xl">
          {LETTER.slice(0, count)}
          {!done && (
            <span
              className="ml-0.5 inline-block h-[1.15em] w-[2px] translate-y-[0.18em] bg-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.9)]"
              style={{ animation: "caret-blink 1s infinite" }}
              aria-hidden="true"
            />
          )}
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="mt-8 text-right font-script text-4xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)]"
        >
          — forever & honestly yours
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 text-sm text-rose-100/55"
      >
        ✦ keep scrolling… the question awaits ↓ ✦
      </motion.p>

      <Ornament className="mt-10" />
    </section>
  );
}
