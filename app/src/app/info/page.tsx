"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InfoPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 다크모드 상태 확인
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // 초기 확인
    checkDarkMode();

    // MutationObserver로 다크모드 변경 감지
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 border"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(239, 246, 255, 0.8)',
          borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(191, 219, 254, 0.5)'
        }}
      >
        <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-5xl shadow-lg border-4 border-yellow-300 dark:border-yellow-500 mb-2">
          🐶
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight text-center mb-2">About Me</h1>
        <div className="text-lg text-neutral-800 dark:text-gray-200 text-center mb-4 flex flex-col gap-2">
          <span>Hello!</span>
          <span>
            I&apos;m <span className="font-bold text-yellow-500 dark:text-yellow-400">DevPuppy</span>, an aspiring developer passionate about DevOps and cloud technologies.
          </span>
          <span className="mt-2 font-semibold text-yellow-500 dark:text-yellow-400">Key Interests</span>
          <span>AWS, DevOps, Cloud Infrastructure, Automation, Web Frontend</span>
          <span className="mt-2 font-semibold text-yellow-500 dark:text-yellow-400">Hands-on Experience</span>
          <span>
            Planning, developing, and deploying my own portfolio site, learning real-world DevOps with real-time cost monitoring, CI/CD, and infrastructure automation.
          </span>
        </div>
        <div className="flex gap-6 justify-center">
          <span className="text-3xl" title="React">⚛️</span>
          <span className="text-3xl" title="AWS">☁️</span>
          <span className="text-3xl" title="Next.js">⏭️</span>
          <span className="text-3xl" title="TypeScript">🟦</span>
        </div>
      </motion.div>
    </div>
  );
}
