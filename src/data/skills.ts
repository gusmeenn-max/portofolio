export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database & Tools";
  iconName: string; // slug di simpleicons.org (atau "code" untuk ikon Lucide)
  brandColor: string; // warna glow saat hover
}

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "Next.js", category: "Frontend", iconName: "nextdotjs", brandColor: "#000000" },
  { name: "TypeScript", category: "Frontend", iconName: "typescript", brandColor: "#3178C6" },
  { name: "React", category: "Frontend", iconName: "react", brandColor: "#61DAFB" },
  { name: "Tailwind CSS", category: "Frontend", iconName: "tailwindcss", brandColor: "#06B6D4" },
  { name: "Framer Motion", category: "Frontend", iconName: "framer", brandColor: "#0055FF" },
  // Backend
  { name: "Go (Golang)", category: "Backend", iconName: "go", brandColor: "#00ADD8" },
  { name: "Node.js", category: "Backend", iconName: "nodedotjs", brandColor: "#339933" },
  { name: "RESTful API", category: "Backend", iconName: "code", brandColor: "#F05032" },
  // Database & Tools
  { name: "Supabase", category: "Database & Tools", iconName: "supabase", brandColor: "#3ECF8E" },
  { name: "MySQL", category: "Database & Tools", iconName: "mysql", brandColor: "#4479A1" },
  { name: "PostgreSQL", category: "Database & Tools", iconName: "postgresql", brandColor: "#4169E1" },
  { name: "Git & GitHub", category: "Database & Tools", iconName: "github", brandColor: "#181717" },
];
