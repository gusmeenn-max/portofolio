import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import DepthSection from "@/components/DepthSection";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import ThemeToggle from "@/components/ThemeToggle";
import { getProjects } from "@/lib/getProjects";

const links = [["About", "#about"], ["Project", "#projects"], ["Tech Stack", "#skills"], ["Sertifikat", "#certificates"]];

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex h-12 max-w-4xl items-center justify-between rounded-2xl border border-black/10 bg-[var(--bg)]/70 px-4 shadow-lg backdrop-blur-xl dark:border-white/10">
          <a href="#top" className="text-sm font-bold uppercase tracking-[.2em]">Gusmen</a>
          <nav className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="hidden rounded-lg px-3 py-1.5 opacity-60 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10 md:block">{l}</a>
            ))}
            <ThemeToggle />
            <a href="#contact" className="ml-2 rounded-lg border border-black/20 px-3 py-1.5 dark:border-white/25">Hire Me</a>
          </nav>
        </div>
      </header>
      <main id="top" className="overflow-x-clip">
        <Hero />
        <DepthSection><About /></DepthSection>
        <DepthSection><Projects projects={projects} /></DepthSection>
        <DepthSection><TechStack /></DepthSection>
        <DepthSection><Certificates /></DepthSection>
        <DepthSection><Contact /></DepthSection>
      </main>
    </>
  );
}
