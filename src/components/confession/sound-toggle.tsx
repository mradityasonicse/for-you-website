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
      title={enabled ? "mute the music" : "play soft music"}
      className="glass fixed right-4 top-4 z-[80] flex h-11 w-11 items-center justify-center rounded-full text-rose-200/80 transition-all duration-300 hover:scale-105 hover:text-rose-100 sm:right-6 sm:top-6"
    >
      {enabled ? (
        <>
          <Volume2 className="h-5 w-5" aria-hidden="true" />
          <span
            className="absolute right-1 top-1 h-1.5 w-1.5 animate-ping rounded-full bg-rose-400"
            aria-hidden="true"
          />
        </>
      ) : (
        <VolumeX className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
