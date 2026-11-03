"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { CERTIFICATES_DATA, type Certificate } from "@/data/certificates";

function Thumb({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setOk(false)} className="h-full w-full object-contain" />
  ) : (
    <div className="grid h-full min-h-[200px] w-full place-items-center bg-gradient-to-br from-amber-400/30 to-indigo-500/30"><Award size={36} /></div>
  );
}

function Detail({ c }: { c: Certificate }) {
  const [tab, setTab] = useState<"cert" | "materi">("cert");
  const src = tab === "cert" ? c.image : c.imageDetail ?? c.image;
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_1fr]">
      <div>
        {c.imageDetail && (
          <div className="mb-3 flex gap-2 text-sm">
            {([["cert", "Sertifikat"], ["materi", "Materi"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} aria-pressed={tab === k}
                className={`rounded-full border px-4 py-1 transition ${tab === k ? "border-indigo-400 bg-indigo-500/15" : "border-black/10 opacity-70 dark:border-white/10"}`}>{l}</button>
            ))}
          </div>
        )}
        <div className="overflow-hidden rounded-xl bg-black/5 dark:bg-white/5"><Thumb key={src} src={src} alt={c.title} /></div>
      </div>
      <div>
        <p className="text-sm text-indigo-500 dark:text-indigo-300">{c.titleEn}</p>
        <p className="mt-1 text-sm opacity-60">{c.issuer} · {c.date}</p>
        <p className="mt-4 leading-relaxed opacity-90">{c.description}</p>
        <p className="mb-2 mt-5 font-mono text-[10px] tracking-[.25em] opacity-50">MATERI YANG DIPELAJARI</p>
        <ul className="list-disc space-y-1 pl-5 text-sm opacity-80">{c.topics.map((t) => <li key={t}>{t}</li>)}</ul>
        {c.credentialUrl && (
          <a href={c.credentialUrl} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:underline dark:text-indigo-300"><ExternalLink size={14} /> Verifikasi kredensial</a>
        )}
      </div>
    </div>
  );
}

export default function Certificates() {
  const [sel, setSel] = useState<Certificate | null>(null);
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 font-mono text-xs tracking-[.3em] opacity-50">CERTIFICATIONS</p>
      <h2 className="text-4xl font-bold tracking-tight">Sertifikasi</h2>
      <p className="mb-10 mt-2 opacity-70">{CERTIFICATES_DATA.length} sertifikat pelatihan dari {CERTIFICATES_DATA[0]?.issuer}. Klik kartu untuk melihat sertifikat dan penjelasannya.</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES_DATA.map((c, i) => (
          <motion.button
            key={c.id} onClick={() => setSel(c)}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }}
            whileHover={{ y: -6, rotate: i % 2 ? 0.8 : -0.8 }}
            className="overflow-hidden rounded-2xl border border-black/10 bg-black/[.03] text-left dark:border-white/10 dark:bg-white/[.04]"
          >
            <div className="aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5"><Thumb src={c.image} alt={c.title} /></div>
            <div className="p-4">
              <h3 className="font-bold leading-snug tracking-tight">{c.title}</h3>
              <p className="mt-1 text-sm opacity-60">{c.date}</p>
              <p className="mt-2 line-clamp-2 text-sm opacity-70">{c.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.title} wide>
        {sel && <Detail key={sel.id} c={sel} />}
      </Modal>
    </section>
  );
}
