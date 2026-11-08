import { Heart } from "lucide-react";

export default function PageFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-rose-400/10 bg-black/20 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
      <p className="flex flex-wrap items-center justify-center gap-2 px-4 text-center text-xs tracking-wide text-rose-100/50">
        <span>made with</span>
        <Heart
          className="h-3.5 w-3.5 animate-heartbeat fill-rose-500 text-rose-500"
          aria-hidden="true"
        />
        <span>· every pixel of this page beats for you</span>
      </p>
    </footer>
  );
}
