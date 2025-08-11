"use client";
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="flex flex-1 justify-center md:justify-end items-center w-full">
        <div className="w-full max-w-xl flex flex-col gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/40 shadow-lg p-6 transition-transform transition-shadow duration-200 hover:scale-[1.025] hover:shadow-2xl cursor-pointer group text-right backdrop-blur-md"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[64px] font-extralight text-neutral-900 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-tight">{project.name}</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-base mt-1">{project.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 