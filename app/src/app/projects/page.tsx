"use client";
import React, { useEffect, useState } from "react";

const projects = [
  {
    name: "Surbee",
    date: "May, 2025",
  },
  {
    name: "mapzip",
    date: "August, 2025",
  },
];

export default function ProjectsPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="flex flex-1 justify-center md:justify-end items-center w-full">
        <div className="w-full max-w-xl flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl border shadow-lg p-6 transition-transform transition-shadow duration-200 hover:scale-[1.025] hover:shadow-2xl cursor-pointer group text-right backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(253, 242, 248, 0.8)',
                borderColor: isDark ? 'rgba(55, 65, 81, 0.4)' : 'rgba(251, 207, 232, 0.5)'
              }}
            >
              <div className="flex flex-col gap-1 items-end">
                <span 
                  className="text-[64px] font-extralight group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight"
                  style={{
                    color: isDark ? 'white' : 'rgb(17, 24, 39)'
                  }}
                >
                  {project.name}
                </span>
                <span 
                  className="text-base mt-1"
                  style={{
                    color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)'
                  }}
                >
                  {project.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 