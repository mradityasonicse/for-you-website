"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-rose-500 via-rose-300 to-amber-300"
      style={{ scaleX }}
    />
  );
}
