"use client";
import { motion } from "framer-motion";
import { Briefcase, Check, Copy, Download, ExternalLink, GitBranch, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { PROFILE } from "@/data/profile";

const C = PROFILE.contact;
const CARDS = [
  { key: "email", label: "Email", value: C.email, href: `mailto:${C.email}`, copy: C.email, Icon: Mail },
  { key: "github", label: "GitHub", value: C.githubLabel, href: C.github, copy: C.github, Icon: GitBranch },
  { key: "linkedin", label: "LinkedIn", value: C.linkedinLabel, href: C.linkedin, copy: C.linkedin, Icon: Briefcase },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch { /* clipboard tidak tersedia */ }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="mb-3 font-mono text-xs tracking-[.3em] opacity-50">HIRE ME</p>
          <h2 className="text-5xl font-bold leading-[.95] tracking-tighter sm:text-7xl">LET&apos;S WORK TOGETHER</h2>
          <p className="mt-6 max-w-md opacity-70">Saya sedang mencari kesempatan magang sebagai full-stack developer. Punya proyek atau lowongan? Kirim pesan, saya balas secepatnya.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} href={PROFILE.cvUrl} download="CV-Agus-Abdurrahman.pdf" className="inline-flex items-center gap-2 rounded-xl bg-[var(--fg)] px-5 py-3 text-[var(--bg)]"><Download size={15} /> Download CV</motion.a>
            <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} href={C.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-5 py-3 dark:border-white/15"><MessageCircle size={15} /> Send Me a Message</motion.a>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4">
          {CARDS.map(({ key, label, value, href, copy: text, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 120, damping: 18 }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-black/10 bg-black/[.03] p-4 sm:gap-4 sm:p-5 dark:border-white/10 dark:bg-white/[.04]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 border border-black/10 dark:border-white/10"><Icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-[.25em] opacity-50">{label.toUpperCase()}</p>
                <p className="break-all font-semibold leading-snug">{value}</p>
              </div>
              <button aria-label={`Salin ${label}`} onClick={() => copy(key, text)} className="grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
                {copied === key ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              </button>
              <a aria-label={`Buka ${label}`} href={href} target={key === "email" ? undefined : "_blank"} rel="noopener" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"><ExternalLink size={15} /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
