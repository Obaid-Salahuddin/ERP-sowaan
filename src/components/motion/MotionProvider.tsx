"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling (Lenis) + animation defaults (Motion).
 * Both switch off automatically for visitors who prefer reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 120, damping: 20 }}>
      {reduce ? children : <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>{children}</ReactLenis>}
    </MotionConfig>
  );
}
