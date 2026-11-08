import { Sparkles } from "lucide-react";

export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-rose-300/40 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300/40" />
      <Sparkles className="h-4 w-4 animate-twinkle" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300/40" />
    </div>
  );
}
