"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAmbientAudio } from "@/hooks/use-ambient-audio";

export default function SoundToggle() {
  const { enabled, toggle } = useAmbientAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn ambient music off" : "Turn ambient music on"}
      title={enabled ? "Mute the romantic ambient music" : "Play romantic ambient music"}
      className="glass-cinematic fixed right-4 top-4 z-[80] flex items-center gap-2 rounded-full px-3.5 py-2 text-rose-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-rose-300/40 active:scale-95 sm:right-6 sm:top-6"
    >
      {enabled ? (
        <>
          <Volume2 className="h-4 w-4 text-rose-300 animate-pulse" aria-hidden="true" />
          <span className="hidden text-xs font-medium text-rose-100 sm:inline">Soundtrack On</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4 text-rose-200/60" aria-hidden="true" />
          <span className="hidden text-xs font-medium text-rose-200/80 sm:inline">Play Music ♫</span>
        </>
      )}
    </button>
  );
}
