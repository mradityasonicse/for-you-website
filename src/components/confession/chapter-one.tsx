"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Ornament from "./ornament";

const TEXT =
  "Do you remember the first time we really talked? I didn't plan it. I didn't expect it. But something about that ordinary moment quietly rearranged my entire world — and it never went back.";

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.span style={{ opacity, filter }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function ChapterOne() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section
      id="chapter-1"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6 py-32"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[26vw] font-bold text-rose-500/[0.035]"
      >
        01
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
        >
          chapter one · the beginning
        </motion.p>

        <p className="mt-8 font-serif text-3xl font-light leading-relaxed text-rose-50 sm:text-4xl lg:text-[2.85rem]">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
            >
              {word}
            </Word>
          ))}
        </p>

        <Ornament className="mt-14" />
      </div>
    </section>
  );
}
