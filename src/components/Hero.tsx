"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { PROFILE } from "@/data/profile";

const NAME = "AGUS ABDURRAHMAN";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const textX = useTransform(sx, [-0.5, 0.5], [50, -50]);
  const textY = useTransform(sy, [-0.5, 0.5], [24, -24]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const imgX = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const [imgOk, setImgOk] = useState(true);
  const [cv, setCv] = useState(false);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      {/* Layer 1: grid + glow */}
      <div className="grid-bg absolute inset-0" />
      <div className="glow absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />

      {/* Layer 2: nama raksasa di belakang foto, bergerak pelan mengikuti kursor */}
      <motion.div
        style={{ x: textX, y: textY, rotateX: rotY, rotateY: rotX, transformPerspective: 900 }}
        className="absolute inset-x-0 top-[26%] z-0 overflow-hidden"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          className="flex w-max whitespace-nowrap text-[26vw] font-bold leading-none tracking-tighter sm:text-[20vw]"
        >
          {[0, 1].map((i) => (
            <span key={i} className="pr-[4vw]" style={{ WebkitTextStroke: "1.5px var(--fg)", color: "transparent" }}>{NAME}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Layer 3: foto cutout di tengah, menutupi sebagian teks */}
      <motion.div style={{ x: imgX, y: imgY }} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[82%] items-end justify-center">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/profile.png" alt={`Foto ${PROFILE.name}`} onError={() => setImgOk(false)} className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-2xl" />
        ) : (
          <div className="grid h-full w-[min(70vw,380px)] place-items-center rounded-t-[999px] border border-dashed border-black/20 bg-black/5 p-8 text-center text-sm opacity-70 dark:border-white/20 dark:bg-white/5">
            Taruh foto PNG cutout di public/profile.png
          </div>
        )}
      </motion.div>

      {/* Layer 4: tombol */}
      <div className="absolute inset-x-0 bottom-6 z-20 sm:bottom-8 mx-auto flex max-w-6xl justify-center px-6 sm:justify-end">
        <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} onClick={() => setCv(true)} className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/60 bg-indigo-500/15 px-5 py-2.5 backdrop-blur-md"><FileText size={15} /> CV</motion.button>
          <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} href="#contact" className="rounded-xl border border-black/15 bg-[var(--bg)]/60 px-5 py-2.5 backdrop-blur-md dark:border-white/15">Hubungi saya</motion.a>
        </div>
      </div>

      <Modal open={cv} onClose={() => setCv(false)} title="Curriculum Vitae" wide>
        <iframe src={PROFILE.cvUrl} title="CV" className="hidden h-[65vh] w-full rounded-lg border border-black/10 dark:border-white/10 md:block" />
        <p className="text-sm opacity-70 md:hidden">Pratinjau PDF sering tidak tampil di browser HP. Buka atau unduh CV lewat tombol di bawah.</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <a href={PROFILE.cvUrl} download="CV-Agus-Abdurrahman.pdf" className="inline-flex items-center gap-2 rounded-xl bg-[var(--fg)] px-4 py-2 text-[var(--bg)]"><Download size={15} /> Unduh CV</a>
          <a href={PROFILE.cvUrl} target="_blank" rel="noopener" className="rounded-xl border border-black/15 px-4 py-2 dark:border-white/15">Buka di tab baru</a>
        </div>
      </Modal>
    </section>
  );
}
