"use client";
import React, { useEffect, useState } from "react";

const THEME_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 초기 테마 설정
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
    setTheme(saved);
    
    // 즉시 DOM에 적용
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // 테마 변경 시 DOM에 적용
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
    
    // 강제로 리렌더링 트리거
    document.body.style.transition = "background-color 0.3s ease";
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 정적 빌드에서 hydration 문제 방지
  if (!isMounted) {
    return (
      <button
        className="fixed left-6 bottom-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 shadow-lg border border-neutral-200 transition-colors hover:scale-105"
        disabled
      >
        <span className="text-neutral-800 text-2xl">🌙</span>
      </button>
    );
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