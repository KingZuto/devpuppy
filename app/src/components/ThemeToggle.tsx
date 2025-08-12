"use client";
import React, { useEffect, useState } from "react";

const THEME_KEY = "theme";
type Theme = "light" | "dark" | "zutomayo";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 초기 테마 설정
    const saved = (localStorage.getItem(THEME_KEY) as Theme) || "light";
    setTheme(saved);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // 모든 테마 클래스 제거
    document.documentElement.classList.remove("dark", "zutomayo");
    
    // 선택된 테마 적용
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "zutomayo") {
      document.documentElement.classList.add("zutomayo");
    }
    
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, isMounted]);

  const cycleTheme = () => {
    setTheme((prev) => {
      switch (prev) {
        case "light": return "dark";
        case "dark": return "zutomayo";
        case "zutomayo": return "light";
        default: return "light";
      }
    });
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light": return "☀️";
      case "dark": return "🌙";
      case "zutomayo": return "🎵";
      default: return "☀️";
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light": return "Light Mode";
      case "dark": return "Dark Mode";
      case "zutomayo": return "Zutomayo Mode";
      default: return "Light Mode";
    }
  };

  const getButtonStyle = () => {
    switch (theme) {
      case "light": 
        return "bg-white/80 border-neutral-200 hover:bg-white/90";
      case "dark": 
        return "bg-neutral-900/80 border-neutral-800 hover:bg-neutral-900/90";
      case "zutomayo": 
        return "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 border-transparent hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 shadow-lg";
      default: 
        return "bg-white/80 border-neutral-200";
    }
  };

  return (
    <div className="fixed left-6 bottom-6 z-50 flex flex-col items-center gap-2">
      {/* 테마 라벨 */}
      {isMounted && (
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
          ${theme === "zutomayo" 
            ? "bg-gradient-to-r from-pink-400 to-cyan-400 text-white shadow-lg" 
            : theme === "dark"
              ? "bg-neutral-800/90 text-white border border-neutral-700"
              : "bg-white/90 text-neutral-800 border border-neutral-200"
          }
        `}>
          {getThemeLabel()}
        </div>
      )}
      
      {/* 테마 토글 버튼 */}
      <button
        onClick={cycleTheme}
        aria-label={`Switch to next theme (current: ${theme})`}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center 
          shadow-lg border transition-all duration-300 hover:scale-105
          ${getButtonStyle()}
          ${theme === "zutomayo" ? "animate-pulse" : ""}
        `}
      >
        <span className={`
          text-3xl transition-all duration-300
          ${theme === "zutomayo" ? "animate-bounce" : ""}
        `}>
          {isMounted ? getThemeIcon() : "☀️"}
        </span>
      </button>
      
      {/* Zutomayo 모드일 때 추가 효과 */}
      {isMounted && theme === "zutomayo" && (
        <div className="absolute inset-0 rounded-full animate-ping bg-gradient-to-r from-pink-400 to-cyan-400 opacity-20 -z-10"></div>
      )}
    </div>
  );
}
