"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Sparkles, X, ZoomIn } from "lucide-react";
import Ornament from "./ornament";

export interface MemoryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  note?: string;
  rotate?: number;
}

// Extensible memories list — all new photos are added here!
export const MEMORIES_LIST: MemoryItem[] = [
  {
    id: "memory-1",
    src: "/memories/memory-1.jpg",
    title: "A Glimpse of You ✦",
    caption: "The moment that made my world pause and smile.",
    note: "Forever my favorite view.",
    rotate: -1.8,
  },
];

export default function MemoriesGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  const current = MEMORIES_LIST[currentIndex] || MEMORIES_LIST[0];
  const hasMultiple = MEMORIES_LIST.length > 1;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORIES_LIST.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMORIES_LIST.length) % MEMORIES_LIST.length);
  };

  return (
    <section
      id="memories"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center"
    >
      {/* Background ambient glow behind photo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.4em] text-rose-300/60"
        >
          moments · frozen in time
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 font-serif text-4xl font-light text-rose-50 sm:text-5xl lg:text-6xl"
        >
          Every glance, a <em className="text-shimmer font-medium">memory I treasure.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 max-w-lg text-sm text-rose-100/60 sm:text-base"
        >
          Out of all the pictures in the world, this is the one that reminds me how beautiful life
          is with you in it.
        </motion.p>

        {/* Polaroid Card Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="relative mt-12 w-full max-w-sm sm:max-w-md"
        >
          {/* Subtle rose gold washi-tape badge at the top */}
          <div
            className="absolute -top-4 left-1/2 z-20 h-7 w-28 -translate-x-1/2 -rotate-1 rounded-sm bg-gradient-to-r from-rose-200/40 via-amber-100/50 to-rose-300/40 shadow-sm backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Floating tiny hearts around the frame */}
          <Heart
            aria-hidden="true"
            className="pointer-events-none absolute -left-6 top-16 h-5 w-5 animate-float-slow fill-rose-400/40 text-rose-400/40"
          />
          <Sparkles
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 bottom-20 h-6 w-6 animate-twinkle text-amber-300/60"
          />

          {/* Polaroid Frame */}
          <motion.div
            style={{ rotate: current.rotate ?? -1.5 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="glass-strong group relative overflow-hidden rounded-3xl p-5 pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(251,113,133,0.2)]"
          >
            {/* Image Container with romantic corner radius and zoom on click */}
            <div
              onClick={() => setSelectedPhoto(current)}
              className="relative aspect-[9/16] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#24131b] shadow-inner"
            >
              <Image
                src={current.src}
                alt={current.title}
                fill
                priority
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gentle gradient vignette */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160a10]/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                aria-hidden="true"
              />

              {/* Zoom pill badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] text-rose-200 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                <ZoomIn className="h-3 w-3 text-rose-300" />
                <span>Tap to enlarge</span>
              </div>
            </div>

            {/* Handwritten style caption */}
            <div className="mt-5 text-center">
              <h3 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-1 font-serif text-base italic text-rose-100/80 sm:text-lg">
                &ldquo;{current.caption}&rdquo;
              </p>
              {current.note && (
                <p className="mt-2 text-xs uppercase tracking-widest text-rose-300/50">
                  {current.note}
                </p>
              )}
            </div>

            {/* Navigation arrows (if more than 1 photo) */}
            {hasMultiple && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  aria-label="Previous photo"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/25 active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-rose-300/60">
                  {currentIndex + 1} / {MEMORIES_LIST.length}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  aria-label="Next photo"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/25 active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>

        <Ornament className="mt-16" />
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-label="Enlarged photo preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] max-w-lg overflow-hidden rounded-3xl border border-rose-400/20 bg-[#160a10] p-3 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-600 active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[9/16] h-[72vh] max-h-[750px] w-full overflow-hidden rounded-2xl">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-4 text-center">
                <h4 className="font-script text-3xl text-rose-200">{selectedPhoto.title}</h4>
                <p className="mt-1 font-serif text-sm italic text-rose-100/80">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
