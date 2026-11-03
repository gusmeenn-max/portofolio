"use client";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { useState } from "react";
import { SKILLS_DATA, type Skill } from "@/data/skills";

const GROUPS: Skill["category"][] = ["Frontend", "Backend", "Database & Tools"];

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.25;
}

function Logo({ s }: { s: Skill }) {
  const [bad, setBad] = useState(false);
  if (s.iconName === "code" || bad) return <Code size={22} style={{ color: isDark(s.brandColor) ? undefined : s.brandColor }} />;
  const dark = isDark(s.brandColor);
  const color = dark ? "000000" : s.brandColor.slice(1);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://cdn.simpleicons.org/${s.iconName}/${color}`} alt="" width={22} height={22} onError={() => setBad(true)} className={dark ? "dark:invert" : ""} />
  );
}

export default function TechStack() {
  let i = 0;
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 font-mono text-xs tracking-[.3em] opacity-50">TECHNOLOGIES</p>
      <h2 className="mb-10 text-4xl font-bold tracking-tight">Tech Stack</h2>
      {GROUPS.map((g) => (
        <div key={g} className="mb-8">
          <h3 className="mb-4 text-sm font-semibold opacity-60">{g}</h3>
          <div className="flex flex-wrap gap-4">
            {SKILLS_DATA.filter((s) => s.category === g).map((s) => {
              const k = i++;
              const glow = isDark(s.brandColor) ? "#a1a1aa" : s.brandColor;
              return (
                <motion.div key={s.name} animate={{ y: [0, -7, 0], rotate: [0, 1.5, -1.5, 0] }} transition={{ duration: 4 + (k % 4) * 0.6, repeat: Infinity, ease: "easeInOut", delay: (k % 5) * 0.25 }}>
                  <motion.div
                    whileHover={{ scale: 1.14, rotate: k % 2 ? -8 : 8, boxShadow: `0 0 28px ${glow}99` }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[.03] px-4 py-3 dark:border-white/10 dark:bg-white/[.04]"
                  >
                    <Logo s={s} />
                    <span className="font-medium">{s.name}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
