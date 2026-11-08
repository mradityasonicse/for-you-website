"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Heart, Mail, Sparkles } from "lucide-react";
import Ornament from "./ornament";

const LETTER_TEXT = `Dear you,

I've rewritten this a hundred times in my head. Every draft felt too small, too ordinary, too scared to capture what you truly mean to me.

You love the moon — the way it glows quietly in the dark sky, asking for nothing, just staying constant. That is honestly how I want to be for you: gentle, patient, and always right here beside you.

So here it is — simple, honest, and from the bottom of my heart:

I like you. Truly, deeply like you.

Not the fleeting kind. The kind that memorizes your radiant laugh like a favorite melody. The kind that turns ordinary days into the happiest moments of my life. The kind I can't keep quiet about anymore.`;

export default function InteractiveEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.15 });
  const reduced = useReducedMotion() ?? false;

  const [typedCount, setTypedCount] = useState(reduced ? LETTER_TEXT.length : 0);
  const isDone = typedCount >= LETTER_TEXT.length;

  // Typewriter effect once envelope is opened
  useEffect(() => {
    if (!isOpen || reduced) {
      if (reduced) setTypedCount(LETTER_TEXT.length);
      return;
    }

    const timer = window.setInterval(() => {
      setTypedCount((c) => {
        if (c >= LETTER_TEXT.length) {
          window.clearInterval(timer);
          return c;
        }
        return c + (Math.random() < 0.22 ? 2 : 1);
      });
    }, 22);

    return () => window.clearInterval(timer);
  }, [isOpen, reduced]);

  return (
    <section
      id="envelope"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      {/* Background Volumetric Candlelight Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-500/10 via-rose-500/15 to-transparent blur-[140px]"
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
      >
        chapter six · the sealed letter
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mt-6 max-w-2xl font-serif text-4xl font-light text-rose-50 sm:text-5xl lg:text-6xl"
      >
        A letter written{" "}
        <em className="text-shimmer font-medium italic">under the stars.</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-sm text-rose-100/60"
      >
        {isOpen ? "Read slowly — every word is from the heart." : "Tap the wax seal to break the seal and read ✦"}
      </motion.p>

      {/* Interactive Envelope & Letter Container */}
      <div className="relative mt-12 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Velvet Envelope */
            <motion.div
              key="envelope-closed"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.025, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass-cinematic group relative mx-auto flex h-72 w-full max-w-lg cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-rose-300/25 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(251,113,133,0.2)] transition-colors hover:border-amber-300/40"
            >
              {/* Envelope Flap Fold Lines */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(135deg, transparent 48%, rgba(251,113,133,0.4) 50%, transparent 52%), linear-gradient(45deg, transparent 48%, rgba(251,113,133,0.4) 50%, transparent 52%)`,
                }}
              />

              {/* Pulsing Gold Wax Seal */}
              <div className="ring-glow relative z-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 shadow-[0_0_35px_rgba(251,113,133,0.9)] transition-transform duration-300 group-hover:scale-110">
                <Heart className="h-8 w-8 fill-white text-white animate-heartbeat" />
                <span
                  className="absolute inset-0 -m-2 rounded-full border border-amber-300/40 animate-ping opacity-60"
                  aria-hidden="true"
                />
              </div>

              {/* Envelope Label */}
              <p className="relative z-10 mt-6 font-serif text-lg tracking-wider text-rose-100/90 transition-colors group-hover:text-amber-100">
                To Someone Very Special
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-rose-300/50">
                ✦ Tap to open letter ✦
              </p>
            </motion.div>
          ) : (
            /* Unfolded Parchment Letter */
            <motion.div
              key="letter-open"
              ref={letterRef}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-cinematic relative mx-auto w-full max-w-2xl rounded-3xl p-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_60px_rgba(251,113,133,0.22)] sm:p-12"
            >
              {/* Wax Seal Badge on Top */}
              <div className="ring-glow absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 shadow-[0_0_30px_rgba(251,113,133,0.85)]">
                <Heart className="h-6 w-6 fill-white text-white animate-pulse" />
              </div>

              {/* Typewriter Body */}
              <p className="min-h-[17rem] whitespace-pre-wrap font-serif text-lg leading-relaxed text-rose-50/90 sm:text-xl">
                {LETTER_TEXT.slice(0, typedCount)}
                {!isDone && (
                  <span
                    className="ml-0.5 inline-block h-[1.15em] w-[2px] translate-y-[0.18em] bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]"
                    style={{ animation: "caret-blink 1s infinite" }}
                    aria-hidden="true"
                  />
                )}
              </p>

              {/* Calligraphic Sign-off */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isDone ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="mt-8 flex items-center justify-between border-t border-rose-300/15 pt-6"
              >
                <span className="text-xs tracking-widest uppercase text-rose-300/50">
                  ✦ Raipur · Written for you ✦
                </span>
                <span className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                  — always & honestly yours
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-14 text-sm text-rose-100/55"
      >
        ✦ keep scrolling… the question awaits ↓ ✦
      </motion.p>

      <Ornament className="mt-12" />
    </section>
  );
}
