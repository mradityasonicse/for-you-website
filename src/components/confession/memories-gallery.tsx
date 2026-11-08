"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import Ornament from "./ornament";

export interface MemoryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  subtitle: string;
  badge: string;
  tapeColor: string;
  rotate: number;
}

export const MEMORIES: MemoryItem[] = [
  {
    id: "memory-2",
    src: "/memories/memory-2.jpg",
    title: "That Radiant Smile ✦",
    caption: "The one that can light up any room in a single fraction of a second.",
    subtitle: "A smile I fell for",
    badge: "Exhibit A · The Spark",
    tapeColor: "from-rose-200/50 via-rose-100/70 to-rose-300/50",
    rotate: -2,
  },
  {
    id: "memory-1",
    src: "/memories/memory-1.jpg",
    title: "Effortlessly Unforgettable ✦",
    caption: "In a world full of noise, my eyes will always search for you.",
    subtitle: "Living in my heart",
    badge: "Exhibit B · The Warmth",
    tapeColor: "from-amber-200/50 via-amber-100/70 to-rose-200/50",
    rotate: 2,
  },
];

export default function MemoriesGallery() {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const selectedPhoto = lightboxIdx !== null ? MEMORIES[lightboxIdx] : null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight" && lightboxIdx !== null) {
        setLightboxIdx((prev) => (prev !== null ? (prev + 1) % MEMORIES.length : 0));
      }
      if (e.key === "ArrowLeft" && lightboxIdx !== null) {
        setLightboxIdx((prev) => (prev !== null ? (prev - 1 + MEMORIES.length) % MEMORIES.length : 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx]);

  return (
    <section
      id="memories"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      {/* Cinematic Ambient Halos */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[550px] w-[550px] translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.45em] text-rose-200/80 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3 text-amber-300 animate-twinkle" />
          <span>Chapter Three · The Visual Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-rose-50 sm:text-5xl lg:text-6xl"
        >
          Moments frozen in time.{" "}
          <em className="text-shimmer font-medium italic">Treasured forever.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-rose-100/65"
        >
          Out of all the memories in the universe, these are the ones that make my heart beat
          a little faster every single time.
        </motion.p>

        {/* Mobile View Toggle Buttons */}
        <div className="mt-8 flex items-center justify-center gap-2 md:hidden">
          {MEMORIES.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMobileIdx(idx)}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeMobileIdx === idx
                  ? "bg-gradient-to-r from-rose-500 to-amber-400 font-semibold text-[#2a0d16] shadow-[0_0_20px_rgba(251,113,133,0.5)]"
                  : "glass text-rose-200/70 hover:text-rose-100"
              }`}
            >
              Memory {idx + 1}
            </button>
          ))}
        </div>

        {/* Desktop Dual-Card Showcase */}
        <div className="mt-14 w-full">
          <div className="hidden grid-cols-1 gap-10 md:grid md:grid-cols-2 lg:gap-14">
            {MEMORIES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, delay: 0.2 + index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Washi Tape Ribbon with Realistic Light Sheen */}
                <div
                  className={`absolute -top-4 left-1/2 z-20 h-7 w-28 -translate-x-1/2 rounded-sm bg-gradient-to-r ${item.tapeColor} shadow-md backdrop-blur-md ${
                    index === 0 ? "-rotate-2" : "rotate-2"
                  }`}
                  aria-hidden="true"
                />

                {/* Floating Heart / Sparkle Decor */}
                {index === 0 ? (
                  <Heart
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-6 top-16 h-6 w-6 animate-float-slow fill-rose-400/40 text-rose-400/40 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]"
                  />
                ) : (
                  <Sparkles
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 bottom-24 h-6 w-6 animate-twinkle text-amber-300/80 drop-shadow-[0_0_15px_rgba(252,211,77,0.5)]"
                  />
                )}

                {/* Polaroid Frame with 3D Hover & Directional Borders */}
                <motion.div
                  style={{ rotate: item.rotate }}
                  whileHover={{ rotate: 0, scale: 1.03, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="glass-cinematic group relative w-full max-w-sm overflow-hidden rounded-3xl p-5 pb-8"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setLightboxIdx(index)}
                    className="relative aspect-[9/14] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#14060e] shadow-inner"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Subtle vignette gradient */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0409]/80 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30"
                      aria-hidden="true"
                    />

                    {/* Zoom Pill Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-100 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-rose-950/80">
                      <ZoomIn className="h-3 w-3 text-rose-300" />
                      <span>Tap to zoom</span>
                    </div>

                    <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-0.5 text-[10px] uppercase tracking-wider text-rose-200/90 backdrop-blur-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Caption & Sentiment */}
                  <div className="mt-5 text-center">
                    <h3 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-serif text-base italic leading-snug text-rose-100/80 sm:text-lg">
                      &ldquo;{item.caption}&rdquo;
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-rose-300/55">
                      ✦ {item.subtitle} ✦
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Display: Single Card with Carousel controls */}
          <div className="flex flex-col items-center md:hidden">
            <AnimatePresence mode="wait">
              {(() => {
                const item = MEMORIES[activeMobileIdx];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full max-w-xs"
                  >
                    {/* Washi Tape Ribbon */}
                    <div
                      className={`absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 -rotate-1 rounded-sm bg-gradient-to-r ${item.tapeColor} shadow-md backdrop-blur-md`}
                      aria-hidden="true"
                    />

                    {/* Polaroid Card */}
                    <div className="glass-cinematic relative overflow-hidden rounded-3xl p-4 pb-7 shadow-2xl">
                      <div
                        onClick={() => setLightboxIdx(activeMobileIdx)}
                        className="relative aspect-[9/14] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#14060e]"
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="90vw"
                          className="object-cover object-center"
                        />
                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-rose-200 backdrop-blur-md">
                          <ZoomIn className="h-2.5 w-2.5 text-rose-300" />
                          <span>Tap to view</span>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="font-script text-3xl text-rose-200">{item.title}</h3>
                        <p className="mt-1 font-serif text-sm italic text-rose-100/80">
                          &ldquo;{item.caption}&rdquo;
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-widest text-rose-300/55">
                          ✦ {item.subtitle} ✦
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Mobile Carousel Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setActiveMobileIdx((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length)
                }
                aria-label="Previous photo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/25 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/25 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {MEMORIES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeMobileIdx === i ? "w-6 bg-rose-400" : "w-2 bg-rose-400/30"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveMobileIdx((prev) => (prev + 1) % MEMORIES.length)}
                aria-label="Next photo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/25 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/25 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <Ornament className="mt-16" />
      </div>

      {/* Fullscreen High-Def Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-label="Enlarged memory preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-[75] flex flex-col items-center justify-center bg-black/92 p-4 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close"
              className="absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-rose-600 hover:scale-110 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((prev) => (prev !== null ? (prev - 1 + MEMORIES.length) % MEMORIES.length : 0));
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-600 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((prev) => (prev !== null ? (prev + 1) % MEMORIES.length : 0));
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-600 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-md flex-col items-center overflow-hidden rounded-3xl border border-rose-300/30 bg-[#14060e]/95 p-3.5 shadow-[0_0_90px_rgba(251,113,133,0.35)] sm:max-w-lg"
            >
              <div className="relative aspect-[9/14] h-[68vh] max-h-[720px] w-full overflow-hidden rounded-2xl bg-[#0c0308]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-4 text-center">
                <h4 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.5)] sm:text-4xl">
                  {selectedPhoto.title}
                </h4>
                <p className="mt-1 font-serif text-sm italic text-rose-100/85 sm:text-base">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-rose-300/60">
                  Memory {(lightboxIdx ?? 0) + 1} of {MEMORIES.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
