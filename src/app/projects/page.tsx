import React from "react";

const projects = [
  {
    name: "Surbee",
    date: "June, 2024",
  },
  {
    name: "fastpick",
    date: "May, 2024",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex w-full min-h-screen py-16 px-4 bg-white dark:bg-black transition-colors">
      {/* 오른쪽 정렬: 데스크탑에서는 오른쪽, 모바일에서는 중앙 */}
      <div className="flex flex-1 justify-center md:justify-end items-center">
        <div className="w-full max-w-xl flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 backdrop-blur-md shadow-none p-6 transition-all hover:scale-[1.025] hover:shadow-lg cursor-pointer group text-right border border-transparent dark:border-neutral-800"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[64px] font-extralight text-neutral-900 dark:text-white group-hover:text-yellow-300 transition-colors leading-tight">{project.name}</span>
                <span className="text-neutral-500 dark:text-neutral-300 text-base mt-1">{project.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 