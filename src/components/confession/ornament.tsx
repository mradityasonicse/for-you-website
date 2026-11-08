import { Heart, Sparkles } from "lucide-react";

export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 text-rose-300/40 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-rose-300/25 to-rose-300/60" />
      <Sparkles className="h-3 w-3 text-amber-300/60 animate-twinkle" />
      <Heart className="h-3.5 w-3.5 fill-rose-500/60 text-rose-400/80 animate-pulse" />
      <Sparkles className="h-3 w-3 text-amber-300/60 animate-twinkle" />
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-rose-300/25 to-rose-300/60" />
    </div>
  );
}
