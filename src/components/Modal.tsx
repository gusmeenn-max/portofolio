"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Di HP tampil sebagai "bottom sheet" (naik dari bawah, header tetap, isi bisa di-scroll).
// Di laptop tampil sebagai kotak di tengah layar.
export default function Modal({ open, onClose, title, wide, children }: {
  open: boolean; onClose: () => void; title?: string; wide?: boolean; children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={title}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 48 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-black/10 bg-[var(--bg)] text-[var(--fg)] dark:border-white/10 sm:max-h-[90dvh] sm:rounded-2xl ${wide ? "sm:max-w-4xl" : "sm:max-w-2xl"}`}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-4 py-3 dark:border-white/10 sm:px-5">
              <h3 className="min-w-0 text-lg font-bold leading-tight tracking-tight">{title}</h3>
              <button aria-label="Tutup" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
