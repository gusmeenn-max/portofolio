"use client";
import { motion } from "framer-motion";
import { Compass, FileText, GraduationCap, Hammer } from "lucide-react";
import { useState } from "react";
import { PROFILE } from "@/data/profile";
import { PROJECTS_DATA } from "@/data/projects";
import { CERTIFICATES_DATA } from "@/data/certificates";

const icons = [Hammer, Compass, GraduationCap];

export default function About() {
  const [ok, setOk] = useState(true);
  const stats = [
    ["PROJECTS", String(PROJECTS_DATA.length)],
    ["CERTIFICATES", String(CERTIFICATES_DATA.length)],
    ["UNIVERSITY", "Gunadarma"],
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 font-mono text-xs tracking-[.3em] opacity-50">ABOUT ME</p>
      <h2 className="text-4xl font-bold tracking-tight">Junior Web Programmer. Full-stack Builder.</h2>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-10 flex flex-col gap-8 sm:flex-row">
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
          {ok ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/profile.png" alt={PROFILE.name} onError={() => setOk(false)} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="grid h-full w-full place-items-center text-3xl font-bold">AA</div>
          )}
        </div>
        <div className="max-w-3xl">
          <h3 className="text-xl font-bold uppercase tracking-tight">{PROFILE.name}</h3>
          <div className="mt-3 flex flex-wrap gap-8">
            {stats.map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[10px] tracking-[.25em] opacity-50">{k}</p>
                <p className="text-lg font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-4 leading-relaxed opacity-80">
            {PROFILE.about.map((t) => <p key={t}>{t}</p>)}
          </div>
          <p className="mt-5 text-sm opacity-80">
            Mau tahu lebih jauh?{" "}
            <a href={PROFILE.cvUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold underline underline-offset-4"><FileText size={14} /> Lihat CV saya</a>
          </p>
        </div>
      </motion.div>
      <div className="mt-12">
        <p className="mb-4 font-mono text-[10px] tracking-[.25em] opacity-50">CURRENTLY</p>
        <div className="flex flex-wrap gap-8">
          {PROFILE.currently.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={c.label} className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10"><Icon size={16} /></span>
                <div><p className="text-sm font-semibold">{c.label}</p><p className="text-xs opacity-60">{c.text}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
