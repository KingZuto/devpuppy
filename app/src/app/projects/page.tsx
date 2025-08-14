"use client";
import React, { useEffect, useState } from "react";

const projects = [
  {
    name: "Surbee",
    date: "May, 2025",
    githubUrl: "https://github.com/CLD-3rd/infra-team5",
    description: "Survey management platform"
  },
  {
    name: "Mapzip",
    date: "August, 2025", 
    githubUrl: "https://github.com/CLD3rd-Team4/App",
    description: "Location-based service application"
  },
  {
    name: "DevPuppy",
    date: "August, 2025",
    githubUrl: "https://github.com/KingZuto/devpuppy",
    description: "AWS-based portfolio website"
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
              onClick={() => window.open(project.githubUrl, '_blank')}
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
                <span 
                  className="text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    color: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)'
                  }}
                >
                  {project.description}
                </span>
                <div className="flex items-center gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">View on GitHub</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 