"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";

// Three.js is large, so load it only in the browser and after the page shell.
const ErpCoreScene = dynamic(() => import("./ErpCoreScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

function ScenePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-brand-500/40 blur-2xl" />
    </div>
  );
}

/**
 * 3D animated hero graphic. Pauses rendering while off-screen and
 * renders a still frame for visitors who prefer reduced motion.
 */
export function HeroScene({ className, compact = false }: { className?: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <ErpCoreScene active={inView && !reduce} compact={compact} />
    </motion.div>
  );
}
