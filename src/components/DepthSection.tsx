"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const clamp = (v: number) => Math.max(0, Math.min(1, v));

// Efek depth-loop: section muncul dari "kosong" lalu maju ke posisinya mengikuti scroll.
// Di layar kecil (HP) efeknya dibuat lebih ringan dan tanpa blur agar scroll tetap mulus.
export default function DepthSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const light = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => { light.current = mq.matches; };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.65"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.5 });
  const k = () => (light.current ? 0.5 : 1);

  const opacity = useTransform(p, (v) => clamp(v / 0.75));
  const scale = useTransform(p, (v) => 1 - (1 - clamp(v / 0.9)) * 0.26 * k());
  const y = useTransform(p, (v) => (1 - clamp(v / 0.9)) * 140 * k());
  const rotateX = useTransform(p, (v) => (1 - clamp(v / 0.9)) * 18 * k());
  const filter = useTransform(p, (v) => {
    const b = light.current ? 0 : (1 - clamp(v / 0.8)) * 16;
    return b < 0.2 ? "none" : `blur(${b}px)`;
  });

  if (reduce) return <div ref={ref}>{children}</div>;
  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale, y, rotateX, filter, transformPerspective: 1200, transformOrigin: "50% 40%" }}>
        {children}
      </motion.div>
    </div>
  );
}
