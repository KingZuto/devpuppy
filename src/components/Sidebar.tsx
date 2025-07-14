import React from "react";

const Sidebar = () => (
  <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-8 px-4 min-h-screen">
    {/* Logo */}
    <a href="/" className="mb-12 flex flex-col items-center group" aria-label="홈으로 이동">
      <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-neutral-800 group-hover:scale-105 transition-transform">
        🐶
      </div>
      <span className="mt-2 text-xl font-bold tracking-tight text-white group-hover:text-yellow-300 transition-colors">DevPuppy</span>
    </a>
    {/* Navigation */}
    <nav className="flex flex-col gap-6 w-full">
      <a href="/" className="text-neutral-200 font-medium hover:text-yellow-300 transition-colors">Home</a>
      <a href="/projects" className="text-neutral-200 font-medium hover:text-yellow-300 transition-colors">Projects</a>
      <a href="/info" className="text-neutral-200 font-medium hover:text-yellow-300 transition-colors">Info</a>
      <a href="/contact" className="text-neutral-200 font-medium hover:text-yellow-300 transition-colors">Contact</a>
    </nav>
  </aside>
);

export default Sidebar; 