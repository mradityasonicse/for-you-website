"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Moon, Sparkles, Sun, X, ZoomIn } from "lucide-react";
import Ornament from "./ornament";

export interface MemoryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  subtitle: string;
  badge: string;
  icon: "sun" | "moon";
  aspect: "portrait" | "landscape";
  hindiQuote?: string;
}

export const MEMORIES: MemoryItem[] = [
  {
    id: "memory-sun",
    src: "/memories/memory-2.jpg",
    title: "That Radiant Smile ✦",
    caption: "The one that can light up any room in a single fraction of a second.",
    subtitle: "A smile I fell for",
    badge: "Daylight · The Spark",
    icon: "sun",
    aspect: "portrait",
  },
  {
    id: "memory-moon",
    src: "/memories/memory-moon.jpg",
    title: "Under the Moonlit Sky 🌕",
    caption: "She is a selenophile, and he is the moon.",
    hindiQuote: "इश्क़ में चूर-चूर रहता हूँ, दूर ना जा",
    subtitle: "Constant, quiet, forever yours",
    badge: "Midnight · The Soul",
    icon: "moon",
    aspect: "landscape",
  },
];

export default function MemoriesGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [loves, setLoves] = useState<Record<string, number>>({
    "memory-sun": 48,
    "memory-moon": 52,
  });

  const addLove = (id: string) => {
    setLoves((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

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
      {/* Volumetric Romantic Glows */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/12 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[550px] w-[550px] translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.45em] text-rose-200/80 backdrop-blur-md"
        >
          <Moon className="h-3 w-3 text-amber-300 animate-pulse" />
          <span>Chapter Three · The Visual Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-rose-50 sm:text-5xl lg:text-6xl"
        >
          Sunlight in your smile.{" "}
          <em className="text-shimmer font-medium italic">Moonlight in your eyes.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-rose-100/65"
        >
          You love the moon — the way it glows quietly through the dark, asking for nothing.
          In the daylight, your smile warms my world; under the night sky, you are the selenophile,
          and I will always be your moon.
        </motion.p>

        {/* Asymmetrical Editorial Bento Grid */}
        <div className="mt-14 grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Card 1: The Portrait Smile (5 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center lg:col-span-5"
          >
            {/* Washi Tape Accent */}
            <div
              className="absolute -top-3.5 left-1/2 z-20 h-7 w-28 -translate-x-1/2 -rotate-2 rounded-sm bg-gradient-to-r from-rose-200/50 via-rose-100/70 to-rose-300/50 shadow-md backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Polaroid Container */}
            <motion.div
              whileHover={{ scale: 1.025, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass-cinematic group relative w-full max-w-sm overflow-hidden rounded-3xl p-5 pb-7 text-center shadow-2xl"
            >
              <div
                onClick={() => setLightboxIdx(0)}
                className="relative aspect-[9/13] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#14060e] shadow-inner"
              >
                <Image
                  src={MEMORIES[0].src}
                  alt={MEMORIES[0].title}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0408]/80 via-transparent to-transparent opacity-45 transition-opacity group-hover:opacity-25"
                  aria-hidden="true"
                />

                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-amber-200 backdrop-blur-md">
                  <Sun className="h-3 w-3 text-amber-300" />
                  <span>{MEMORIES[0].badge}</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addLove(MEMORIES[0].id);
                  }}
                  aria-label="Love this photo"
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-200 backdrop-blur-md transition hover:scale-108 hover:bg-rose-950/80 active:scale-90"
                >
                  <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-400" />
                  <span>{loves[MEMORIES[0].id]}</span>
                </button>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-100 backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-rose-950/80">
                  <ZoomIn className="h-3 w-3 text-rose-300" />
                  <span>Enlarge</span>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                  {MEMORIES[0].title}
                </h3>
                <p className="mt-2 font-serif text-base italic leading-snug text-rose-100/80">
                  &ldquo;{MEMORIES[0].caption}&rdquo;
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-rose-300/55">
                  ✦ {MEMORIES[0].subtitle} ✦
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: The Moonlit Widescreen Still (7 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center lg:col-span-7"
          >
            {/* Washi Tape Accent */}
            <div
              className="absolute -top-3.5 left-1/2 z-20 h-7 w-32 -translate-x-1/2 rotate-1 rounded-sm bg-gradient-to-r from-amber-200/50 via-amber-100/70 to-rose-200/50 shadow-md backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Widescreen Film Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass-cinematic group relative w-full overflow-hidden rounded-3xl p-5 pb-7 text-center shadow-2xl"
            >
              <div
                onClick={() => setLightboxIdx(1)}
                className="relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#0c0308] shadow-inner sm:aspect-[16/9]"
              >
                <Image
                  src={MEMORIES[1].src}
                  alt={MEMORIES[1].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 95vw, 680px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0307]/85 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-30"
                  aria-hidden="true"
                />

                <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-amber-200 backdrop-blur-md">
                  <Moon className="h-3 w-3 text-amber-300" />
                  <span>{MEMORIES[1].badge}</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addLove(MEMORIES[1].id);
                  }}
                  aria-label="Love this photo"
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-200 backdrop-blur-md transition hover:scale-108 hover:bg-rose-950/80 active:scale-90"
                >
                  <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-400" />
                  <span>{loves[MEMORIES[1].id]}</span>
                </button>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-rose-100 backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-rose-950/80">
                  <ZoomIn className="h-3 w-3 text-rose-300" />
                  <span>Enlarge</span>
                </div>
              </div>

              <div className="mt-5 px-2">
                <h3 className="font-script text-3xl text-rose-200 drop-shadow-[0_2px_12px_rgba(251,113,133,0.4)] sm:text-4xl">
                  {MEMORIES[1].title}
                </h3>
                <p className="mt-2 font-serif text-lg text-amber-100/90 sm:text-xl">
                  &ldquo;{MEMORIES[1].hindiQuote}&rdquo;
                </p>
                <p className="mt-1 font-serif text-sm italic text-rose-100/70 sm:text-base">
                  {MEMORIES[1].caption}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-rose-300/55">
                  ✦ {MEMORIES[1].subtitle} ✦
                </p>
              </div>
            </motion.div>
          </motion.div>
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
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-black/94 p-4 backdrop-blur-2xl"
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
              className={`relative flex max-h-[92vh] flex-col items-center overflow-hidden rounded-3xl border border-rose-300/30 bg-[#12050c]/95 p-4 shadow-[0_0_100px_rgba(251,113,133,0.35)] ${
                selectedPhoto.aspect === "landscape" ? "w-full max-w-3xl" : "w-full max-w-md sm:max-w-lg"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl bg-[#090206] ${
                  selectedPhoto.aspect === "landscape"
                    ? "aspect-[16/9] h-[55vh] max-h-[580px]"
                    : "aspect-[9/14] h-[68vh] max-h-[720px]"
                }`}
              >
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
                {selectedPhoto.hindiQuote && (
                  <p className="mt-1 font-serif text-lg text-amber-200">
                    &ldquo;{selectedPhoto.hindiQuote}&rdquo;
                  </p>
                )}
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
