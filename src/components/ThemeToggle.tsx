"use client";
import React, { useEffect, useState } from "react";

const THEME_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
    setTheme(saved);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed left-6 bottom-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 shadow-lg border border-neutral-200 dark:border-neutral-800 transition-colors hover:scale-105"
    >
      {theme === "dark" ? (
        <span className="text-yellow-300 text-2xl">☀️</span>
      ) : (
        <span className="text-neutral-800 text-2xl">🌙</span>
      )}
    </button>
  );
} 