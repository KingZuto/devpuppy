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
    <div className="flex w-full min-h-screen py-16 px-4 bg-black/80">
      {/* 오른쪽 정렬: 데스크탑에서는 오른쪽, 모바일에서는 중앙 */}
      <div className="flex flex-1 justify-center md:justify-end items-center">
        <div className="w-full max-w-xl flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl bg-white/10 backdrop-blur-md shadow-none p-6 transition-transform transition-shadow duration-200 hover:scale-[1.025] hover:shadow-lg cursor-pointer group text-right"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[64px] font-extralight text-white group-hover:text-yellow-300 transition-colors leading-tight">{project.name}</span>
                <span className="text-neutral-400 text-base mt-1">{project.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 