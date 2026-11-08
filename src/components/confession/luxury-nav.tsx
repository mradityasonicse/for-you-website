"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

const SECTIONS = [
  { id: "top", label: "Prelude" },
  { id: "chapter-1", label: "01 · Beginning" },
  { id: "chapter-2", label: "02 · Little Things" },
  { id: "memories", label: "03 · Chronicle" },
  { id: "reasons", label: "04 · Notes" },
  { id: "symptoms", label: "05 · Telemetry" },
  { id: "envelope", label: "06 · Letter" },
  { id: "finale", label: "Finale" },
];

export default function LuxuryNav() {
  const { enabled, toggle } = useAmbientAudio();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("Prelude");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 60);

      // Simple section detection
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].label);
          break;
        }
      }
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 transition-all duration-300"
    >
      {/* Brand & Monogram Logo */}
      <a
        href="#top"
        className="group flex items-center gap-3 rounded-full border border-rose-300/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-xl transition hover:border-amber-300/40 hover:bg-black/60"
      >
        <div className="relative h-7 w-7 overflow-hidden transition-transform duration-500 group-hover:rotate-12">
          <Image src="/logo.svg" alt="Monogram" fill className="object-contain" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif text-[11px] tracking-[0.25em] text-rose-100 uppercase">
            Selenophile
          </span>
          <span className="text-[8px] uppercase tracking-[0.35em] text-amber-300/70">
            & Her Moon
          </span>
        </div>
      </a>

      {/* Center Subtle Chapter Tracker (Desktop) */}
      <div className="hidden items-center gap-2 rounded-full border border-rose-300/15 bg-black/40 px-4 py-1.5 backdrop-blur-xl md:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
        <span className="font-serif text-xs italic tracking-wider text-rose-200/90">
          {activeSection}
        </span>
      </div>

      {/* Right: Audio Waveform Controller */}
      <button
        type="button"
        onClick={toggle}
        aria-label={enabled ? "Mute music" : "Play music"}
        className="group flex items-center gap-2.5 rounded-full border border-rose-300/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-xl transition hover:border-rose-300/40 hover:bg-black/60 active:scale-95"
      >
        {enabled ? (
          <>
            {/* Animated Audio Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-4" aria-hidden="true">
              <span className="w-0.5 rounded-full bg-rose-400 animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 rounded-full bg-amber-300 animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-2/3" />
              <span className="w-0.5 rounded-full bg-rose-400 animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-4/5" />
              <span className="w-0.5 rounded-full bg-amber-300 animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-1/2" />
            </div>
            <span className="hidden text-[11px] font-medium tracking-wider text-rose-100 sm:inline">
              Soundtrack
            </span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4 text-rose-200/50 transition group-hover:text-rose-100" />
            <span className="hidden text-[11px] font-medium tracking-wider text-rose-200/70 sm:inline">
              Play Sound ♫
            </span>
          </>
        )}
      </button>
    </motion.header>
  );
}
