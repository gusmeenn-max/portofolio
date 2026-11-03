import fs from "fs";
import path from "path";
import { PROJECTS_DATA, type Project, type ProjectMeta, type Shot } from "@/data/projects";

// Dijalankan di server (saat dev, tiap request; saat build, sekali). Membaca SEMUA gambar di public/projects/.
const IMG = /\.(png|jpe?g|webp|gif|avif)$/i;
const ROOT = path.join(process.cwd(), "public", "projects");
const natural = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function pretty(name: string) {
  const s = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return s ? s[0].toUpperCase() + s.slice(1) : name;
}

function toShots(urlBase: string, files: string[], captions?: string[]): Shot[] {
  const sorted = [...files].sort(natural);
  const c = sorted.findIndex((f) => /^cover\./i.test(f)); // file "cover.*" jadi gambar sampul
  if (c > 0) sorted.unshift(sorted.splice(c, 1)[0]);
  return sorted.map((f, i) => ({
    src: `${urlBase}/${encodeURIComponent(f)}`,
    caption: captions?.[i] ?? (/^\d+\./.test(f) ? `Tampilan ${i + 1}` : pretty(f)),
  }));
}

function blankMeta(id: string, folder: string): ProjectMeta {
  return { id, folder, title: pretty(folder), tagline: "", description: "", purpose: "", details: [], category: "Full-stack", featured: false, techStack: [], highlights: [] };
}

export function getProjects(): Project[] {
  const folders = new Map<string, string[]>();
  const loose: string[] = [];
  try {
    for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
      if (e.isDirectory()) folders.set(e.name, fs.readdirSync(path.join(ROOT, e.name)).filter((f) => IMG.test(f)));
      else if (IMG.test(e.name)) loose.push(e.name);
    }
  } catch {
    /* folder belum ada */
  }

  const usedFolders = new Set<string>();
  const usedLoose = new Set<string>();

  const withData: Project[] = PROJECTS_DATA.map((meta) => {
    const files = folders.get(meta.folder);
    let gallery: Shot[];
    if (files && files.length) {
      usedFolders.add(meta.folder);
      gallery = toShots(`/projects/${encodeURIComponent(meta.folder)}`, files, meta.captions);
    } else {
      const one = loose.find((f) => [meta.folder, meta.id].includes(f.replace(/\.[^.]+$/, "")));
      if (one) {
        usedLoose.add(one);
        gallery = toShots("/projects", [one], meta.captions);
      } else {
        gallery = [{ src: `/projects/${meta.folder}/1.png`, caption: meta.title }]; // placeholder
      }
    }
    return { ...meta, gallery };
  });

  const extras: Project[] = [];
  [...folders.keys()].sort(natural).forEach((name) => {
    const files = folders.get(name)!;
    if (usedFolders.has(name) || !files.length) return;
    extras.push({ ...blankMeta(name, name), gallery: toShots(`/projects/${encodeURIComponent(name)}`, files) });
  });
  loose.sort(natural).forEach((f) => {
    if (usedLoose.has(f)) return;
    const id = f.replace(/\.[^.]+$/, "");
    extras.push({ ...blankMeta(id, id), gallery: toShots("/projects", [f]) });
  });

  return [...withData, ...extras];
}
