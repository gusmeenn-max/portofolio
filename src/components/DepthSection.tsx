"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// Efek depth-loop: section muncul dari "kosong" (kecil, transparan, buram, miring ke belakang)
// lalu maju ke posisinya mengikuti scroll.
export default function DepthSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.65"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.5 });

  const opacity = useTransform(p, [0, 0.75], [0, 1]);
  const scale = useTransform(p, [0, 0.9], [0.74, 1]);
  const y = useTransform(p, [0, 0.9], [140, 0]);
  const rotateX = useTransform(p, [0, 0.9], [18, 0]);
  const blur = useTransform(p, [0, 0.8], [16, 0]);
  const filter = useTransform(blur, (b) => (b < 0.2 ? "none" : `blur(${b}px)`));

  if (reduce) return <div ref={ref}>{children}</div>;
  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, rotateX, filter, transformPerspective: 1200, transformOrigin: "50% 40%" }}>
        {children}
      </motion.div>
    </div>
  );
}
