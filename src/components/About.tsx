"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ABOUT } from "@/data/about";
import { CERTIFICATES_DATA } from "@/data/certificates";
import { PROFILE } from "@/data/profile";
import { PROJECTS_DATA } from "@/data/projects";

export default function About() {
  const stats = [
    ["PROJECTS", String(PROJECTS_DATA.length)],
    ["CERTIFICATES", String(CERTIFICATES_DATA.length)],
    ["EDUCATION", ABOUT.education],
  ];
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 font-mono text-xs tracking-[.3em] opacity-50">ABOUT ME</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{ABOUT.heading}</h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mt-10 max-w-3xl"
      >
        <h3 className="text-xl font-bold uppercase tracking-tight">{PROFILE.name}</h3>
        <p className="mt-1 text-sm text-indigo-500 dark:text-indigo-300">{ABOUT.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-8">
          {stats.map(([k, v]) => (
            <div key={k}>
              <p className="font-mono text-[10px] tracking-[.25em] opacity-50">{k}</p>
              <p className="text-lg font-bold">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4 leading-relaxed opacity-80">
          {ABOUT.paragraphs.map((t) => <p key={t}>{t}</p>)}
        </div>

        <p className="mt-6 text-sm opacity-80">
          Mau tahu lebih jauh?{" "}
          <a href={PROFILE.cvUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
            <FileText size={14} /> Lihat CV saya
          </a>
        </p>
      </motion.div>

      <div className="mt-14">
        <p className="mb-4 font-mono text-[10px] tracking-[.25em] opacity-50">BIDANG KEAHLIAN</p>
        <div className="grid gap-4 md:grid-cols-2">
          {ABOUT.expertise.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-black/10 bg-black/[.03] p-5 dark:border-white/10 dark:bg-white/[.04]"
            >
              <h4 className="font-bold tracking-tight">{e.title}</h4>
              <p className="mt-1 text-sm opacity-70">{e.text}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span key={t} className="rounded-md bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
