import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import DepthSection from "@/components/DepthSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import { getProjects } from "@/lib/getProjects";

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <Navbar />
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
