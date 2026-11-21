"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [["About", "#about"], ["Project", "#projects"], ["Tech Stack", "#skills"], ["Sertifikat", "#certificates"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex h-12 items-center justify-between rounded-2xl border border-black/10 bg-[var(--bg)]/70 px-3 shadow-lg backdrop-blur-xl dark:border-white/10 sm:px-4">
          <a href="#top" onClick={() => setOpen(false)} className="text-sm font-bold uppercase tracking-[.2em]">Gusmen</a>
          <nav className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="hidden rounded-lg px-3 py-1.5 opacity-60 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10 md:block">{l}</a>
            ))}
            <ThemeToggle />
            <a href="#contact" onClick={() => setOpen(false)} className="ml-1 rounded-lg border border-black/20 px-3 py-1.5 dark:border-white/25 sm:ml-2">Hire Me</a>
            <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10 md:hidden">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </nav>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="mt-2 grid rounded-2xl border border-black/10 bg-[var(--bg)]/90 p-2 shadow-lg backdrop-blur-xl dark:border-white/10 md:hidden"
            >
              {links.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-widest opacity-80 active:bg-black/5 dark:active:bg-white/10">{l}</a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
