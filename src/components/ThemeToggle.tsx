"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      aria-label="Ganti tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:scale-110 dark:border-white/10"
    >
      {mounted && (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}
