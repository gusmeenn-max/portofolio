"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import type { Project } from "@/data/projects";

function Shot({ src, alt, initial, natural, onRatio }: {
  src: string; alt: string; initial: string; natural?: boolean; onRatio?: (r: number) => void;
}) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const im = ref.current;
    if (im && im.complete && im.naturalWidth && onRatio) onRatio(im.naturalWidth / im.naturalHeight);
  }, [onRatio]);
  return ok ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref} src={src} alt={alt} draggable={false}
      onLoad={(e) => onRatio?.(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
      onError={() => setOk(false)}
      className={natural ? "max-h-[62vh] w-auto max-w-full" : "h-full w-full object-contain"}
    />
  ) : (
    <div className={`grid place-items-center bg-gradient-to-br from-indigo-500/40 to-emerald-400/30 text-5xl font-bold ${natural ? "aspect-video w-full" : "h-full w-full"}`}>{initial}</div>
  );
}

function Gallery({ p }: { p: Project }) {
  const [i, setI] = useState(0);
  const n = p.gallery.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <div>
      <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }} className="flex w-full justify-center">
            <Shot natural src={p.gallery[i].src} alt={p.gallery[i].caption} initial={p.title[0]} />
          </motion.div>
        </AnimatePresence>
        {n > 1 && (
          <>
            <button aria-label="Sebelumnya" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"><ChevronLeft size={18} /></button>
            <button aria-label="Berikutnya" onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"><ChevronRight size={18} /></button>
          </>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold">{p.gallery[i].caption} {n > 1 && <span className="font-normal opacity-50">({i + 1}/{n})</span>}</p>
      {n > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {p.gallery.map((g, k) => (
            <button key={g.src} onClick={() => setI(k)} aria-label={`Foto ${k + 1}`} className={`h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-black/5 transition dark:bg-white/5 ${k === i ? "border-indigo-400" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <Shot src={g.src} alt="" initial={String(k + 1)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Chips({ items, center }: { items: string[]; center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${center ? "justify-center" : ""}`}>
      {items.map((t) => <span key={t} className="rounded-md bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">{t}</span>)}
    </div>
  );
}

// Satu kartu di carousel. Ukurannya mengikuti rasio asli gambar.
function Slide({ q, o, step, onSelect }: { q: Project; o: number; step: number; onSelect: () => void }) {
  const [ratio, setRatio] = useState(16 / 10);
  const a = Math.abs(o);
  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center" style={{ zIndex: Math.max(0, 10 - a) }}>
      <motion.div
        animate={{ x: o * step, scale: 1 - a * 0.16, rotateY: -o * 26, opacity: a > 2 ? 0 : 1 - a * 0.22 }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
        style={{ transformPerspective: 1100, aspectRatio: ratio }}
        onTap={onSelect}
        className={`relative h-full max-w-[82%] overflow-hidden rounded-2xl border border-black/10 shadow-2xl dark:border-white/10 ${a > 2 ? "pointer-events-none" : "pointer-events-auto"}`}
      >
        <Shot src={q.gallery[0].src} alt={q.title} initial={q.title[0]} onRatio={setRatio} />
        <motion.div animate={{ opacity: o === 0 ? 0 : 0.5 }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(900);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  if (!n) return null;

  const go = (d: number) => setActive((a) => (a + d + n) % n);
  const p = projects[active];
  const step = w * (w < 640 ? 0.42 : 0.3);
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 font-mono text-xs tracking-[.3em] opacity-50">SELECTED WORK</p>
      <h2 className="text-4xl font-bold tracking-tight">Project</h2>
      <p className="mt-2 max-w-xl opacity-70">Kumpulan sistem dan proyek yang pernah saya bangun. Geser atau klik kartu untuk memilih proyek.</p>

      <div
        tabIndex={0} aria-roledescription="carousel" aria-label="Daftar proyek"
        onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}
        className="relative mt-12 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <motion.div
          ref={stageRef}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 || info.velocity.x < -400) go(1);
            else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
          }}
          className="relative h-[230px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[300px] md:h-[360px]"
        >
          {projects.map((q, i) => {
            const o = offsetOf(i);
            return <Slide key={q.id} q={q} o={o} step={step} onSelect={() => (o === 0 ? setOpen(true) : Math.abs(o) <= 2 && setActive(i))} />;
          })}
        </motion.div>
        {n > 1 && (
          <>
            <button aria-label="Proyek sebelumnya" onClick={() => go(-1)} className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-[var(--bg)]/80 backdrop-blur hover:scale-110 dark:border-white/10 sm:grid"><ChevronLeft size={18} /></button>
            <button aria-label="Proyek berikutnya" onClick={() => go(1)} className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-[var(--bg)]/80 backdrop-blur hover:scale-110 dark:border-white/10 sm:grid"><ChevronRight size={18} /></button>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mx-auto mt-10 max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{p.title}</h3>
          {p.tagline && <p className="mt-1 text-sm text-indigo-500 dark:text-indigo-300">{p.tagline}</p>}
          {p.description && <p className="mt-4 opacity-80">{p.description}</p>}
          {p.purpose && (
            <div className="mt-5 rounded-xl border border-black/10 bg-black/[.03] p-4 dark:border-white/10 dark:bg-white/[.04]">
              <p className="mb-1 font-mono text-[10px] tracking-[.25em] opacity-50">TUJUAN PROJECT</p>
              <p className="text-sm opacity-90">{p.purpose}</p>
            </div>
          )}
          {p.techStack.length > 0 && <div className="mt-4"><Chips items={p.techStack} center /></div>}
          <button onClick={() => setOpen(true)} className="mt-6 text-sm font-semibold underline underline-offset-4 transition hover:opacity-70">Lihat detail dan foto →</button>
        </motion.div>
      </AnimatePresence>

      <Modal open={open} onClose={() => setOpen(false)} title={p.title} wide>
        <div className="grid gap-6">
          <Gallery key={p.id} p={p} />
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              {(p.tagline || p.description || p.details.length > 0) && <p className="mb-2 font-mono text-[10px] tracking-[.25em] opacity-50">TENTANG PROJECT</p>}
              {p.tagline && <p className="text-sm text-indigo-500 dark:text-indigo-300">{p.tagline}</p>}
              {p.description && <p className="mt-2 text-sm leading-relaxed opacity-90">{p.description}</p>}
              {p.details.map((d) => <p key={d} className="mt-3 text-sm leading-relaxed opacity-80">{d}</p>)}
              {p.purpose && (<><p className="mb-2 mt-5 font-mono text-[10px] tracking-[.25em] opacity-50">TUJUAN</p><p className="text-sm leading-relaxed opacity-90">{p.purpose}</p></>)}
            </div>
            <div>
              {p.highlights.length > 0 && (<><p className="mb-2 font-mono text-[10px] tracking-[.25em] opacity-50">FITUR UTAMA</p><ul className="list-disc pl-5 text-sm opacity-80">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul></>)}
              {p.techStack.length > 0 && (<><p className="mb-2 mt-5 font-mono text-[10px] tracking-[.25em] opacity-50">TECH STACK</p><Chips items={p.techStack} /></>)}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
