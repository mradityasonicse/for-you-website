"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import Ornament from "./ornament";

const LETTER = `Dear you,

I've rewritten this a hundred times. Every version felt too small, too ordinary, too scared.

So here it is — plain and true:

I like you.

Not the passing kind. The kind that memorizes your laugh like a favorite song. The kind that turns ordinary Tuesdays into my favorite days. The kind I can't keep quiet about anymore.`;

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
        return c + (Math.random() < 0.18 ? 2 : 1);
      });
    }, 26);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="text-center text-[11px] uppercase tracking-[0.4em] text-rose-300/60"
      >
        chapter four · the truth
      </motion.p>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 48, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-strong relative mt-14 w-full max-w-2xl rounded-3xl p-8 sm:p-12"
      >
        <div className="ring-glow absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700">
          <Heart className="h-5 w-5 fill-rose-100 text-rose-100" aria-hidden="true" />
        </div>
        <p className="min-h-[16rem] whitespace-pre-wrap text-left font-serif text-lg leading-relaxed text-rose-50/85 sm:text-xl">
          {LETTER.slice(0, count)}
          {!done && (
            <span
              className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] bg-rose-300"
              style={{ animation: "caret-blink 1s infinite" }}
              aria-hidden="true"
            />
          )}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="mt-8 text-right font-script text-4xl text-rose-200"
        >
          — finally, honestly, yours
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 text-sm text-rose-100/50"
      >
        P.S. keep scrolling… one last thing ↓
      </motion.p>
      <Ornament className="mt-10" />
    </section>
  );
}
