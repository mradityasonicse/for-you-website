"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Maximize2,
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
  tag: string;
  date: string;
  rotate: number;
}

export const MEMORIES: MemoryItem[] = [
  {
    id: "memory-2",
    src: "/memories/memory-2.jpg",
    title: "That Radiant Smile ✦",
    caption: "The one that can light up the entire room in a single second.",
    tag: "The Spark",
    date: "A smile I'll never forget",
    rotate: -2.2,
  },
  {
    id: "memory-1",
    src: "/memories/memory-1.jpg",
    title: "Effortlessly Unforgettable ✦",
    caption: "In a world full of noise, my eyes will always search for you.",
    tag: "The Warmth",
    date: "Living in my heart",
    rotate: 2.2,
  },
];

export default function MemoriesGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedPhoto = lightboxIndex !== null ? MEMORIES[lightboxIndex] : null;

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % MEMORIES.length : 0));
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + MEMORIES.length) % MEMORIES.length : 0));
  };

  return (
    <section
      id="memories"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* Cinematic Ambient Glow Behind Photos */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[450px] w-[450px] translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/12 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Cinematic Section Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.45em] text-rose-300/70"
        >
          moments · frozen in time
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 max-w-2xl font-serif text-4xl font-light leading-tight text-rose-50 sm:text-5xl lg:text-6xl"
        >
          Every glance, a <em className="text-shimmer font-medium">favorite memory.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-rose-100/60 sm:text-base"
        >
          They say a picture is worth a thousand words, but every time I see these, I only hear
          one thing — how lucky I am to know you.
        </motion.p>

        {/* Mobile View Toggle Buttons */}
        <div className="mt-8 flex items-center justify-center gap-2 md:hidden">
          {MEMORIES.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActivePhotoIndex(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                activePhotoIndex === idx
                  ? "bg-gradient-to-r from-rose-500 to-amber-400 text-[#2a0d16] shadow-[0_0_15px_rgba(251,113,133,0.5)]"
                  : "glass text-rose-200/70 hover:text-rose-100"
              }`}
            >
              Memory {idx + 1}
            </button>
          ))}
        </div>

        {/* Cinematic Dual Polaroid Cards Showcase */}
        <div className="mt-12 w-full">
          {/* Desktop Grid Layout: Both Photos side by side */}
          <div className="hidden grid-cols-1 gap-10 md:grid md:grid-cols-2 lg:gap-14">
            {MEMORIES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, delay: 0.2 + index * 0.2, ease: "easeOut" }}
                className="relative flex flex-col items-center"
              >
                {/* Metallic Washi Tape on Top */}
                <div
                  className={`absolute -top-4 left-1/2 z-20 h-7 w-28 -translate-x-1/2 rounded-sm shadow-md backdrop-blur-md ${
                    index === 0
                      ? "-rotate-2 bg-gradient-to-r from-rose-200/40 via-rose-100/60 to-rose-300/40"
                      : "rotate-2 bg-gradient-to-r from-amber-200/40 via-amber-100/60 to-rose-200/40"
                  }`}
                  aria-hidden="true"
                />

                {/* Floating Micro-sparkles */}
                {index === 0 ? (
                  <Heart
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-5 top-20 h-5 w-5 animate-float-slow fill-rose-400/40 text-rose-400/40"
                  />
                ) : (
                  <Sparkles
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 bottom-28 h-6 w-6 animate-twinkle text-amber-300/70"
                  />
                )}

                {/* Polaroid Frame */}
                <motion.div
                  style={{ rotate: item.rotate }}
                  whileHover={{ rotate: 0, scale: 1.025, y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="glass-cinematic group relative w-full max-w-sm overflow-hidden rounded-3xl p-5 pb-8 shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(251,113,133,0.18)]"
                >
                  {/* Photo Container */}
                  <div
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-[9/14] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#1c0c15] shadow-inner"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 90vw, 420px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Ambient subtle vignette */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160a10]/80 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30"
                      aria-hidden="true"
                    />

                    {/* Zoom Badge on Hover */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-100 backdrop-blur-md transition-all duration-300 group-hover:bg-rose-950/80 group-hover:scale-105">
                      <ZoomIn className="h-3 w-3 text-rose-300" />
                      <span>Tap to zoom</span>
                    </div>

                    <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-rose-200/80 backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Caption & Sentiment */}
                  <div className="mt-5 text-center">
                    <h3 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-serif text-base italic leading-snug text-rose-100/80">
                      &ldquo;{item.caption}&rdquo;
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-rose-300/50">
                      ✦ {item.date} ✦
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Display: Single Card with interactive controls */}
          <div className="flex flex-col items-center md:hidden">
            <AnimatePresence mode="wait">
              {(() => {
                const item = MEMORIES[activePhotoIndex];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-xs"
                  >
                    {/* Washi Tape */}
                    <div
                      className="absolute -top-3 left-1/2 z-20 h-6 w-24 -translate-x-1/2 -rotate-1 rounded-sm bg-gradient-to-r from-rose-200/40 via-amber-100/60 to-rose-300/40 shadow-sm backdrop-blur-md"
                      aria-hidden="true"
                    />

                    {/* Polaroid Card */}
                    <div className="glass-cinematic relative overflow-hidden rounded-3xl p-4 pb-7 shadow-2xl">
                      <div
                        onClick={() => setLightboxIndex(activePhotoIndex)}
                        className="relative aspect-[9/14] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#1c0c15]"
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
                        <p className="mt-2 text-[10px] uppercase tracking-widest text-rose-300/50">
                          ✦ {item.date} ✦
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Mobile Carousel Indicators */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length)
                }
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10 text-rose-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {MEMORIES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      activePhotoIndex === i ? "w-6 bg-rose-400" : "w-2 bg-rose-400/30"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoIndex((prev) => (prev + 1) % MEMORIES.length)}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10 text-rose-200"
              >
                <ChevronRight className="h-4 w-4" />
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
            aria-label="Enlarged photo preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[75] flex flex-col items-center justify-center bg-black/92 p-4 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-rose-500 hover:scale-110 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={prevLightbox}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-500 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextLightbox}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-500 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Modal Card */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-md flex-col items-center overflow-hidden rounded-3xl border border-rose-300/30 bg-[#160a10]/95 p-3 shadow-[0_0_80px_rgba(251,113,133,0.3)] sm:max-w-lg"
            >
              <div className="relative aspect-[9/14] h-[68vh] max-h-[700px] w-full overflow-hidden rounded-2xl bg-[#0e050a]">
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
                <p className="mt-1 font-serif text-sm italic text-rose-100/80 sm:text-base">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-rose-300/50">
                  Memory {(lightboxIndex ?? 0) + 1} of {MEMORIES.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
