import React from "react";
import Link from "next/link";

const Sidebar = () => (
  <aside className="w-64 bg-gradient-to-b from-pink-50 to-purple-50 dark:bg-neutral-900 border-r border-pink-200/30 dark:border-neutral-800 flex flex-col items-center py-8 px-4 min-h-screen transition-colors duration-300">
    {/* Logo */}
    <Link href="/" className="mb-12 flex flex-col items-center group" aria-label="홈으로 이동">
      <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white/50 dark:border-neutral-800 group-hover:scale-105 transition-transform">
        🐶
      </div>
      <span className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-yellow-300 transition-colors">DevPuppy</span>
    </Link>
    {/* Navigation */}
    <nav className="flex flex-col gap-6 w-full">
      <Link href="/" className="text-gray-900 dark:text-gray-100 font-medium hover:text-pink-600 dark:hover:text-yellow-300 transition-colors">Home</Link>
      <Link href="/projects" className="text-gray-900 dark:text-gray-100 font-medium hover:text-pink-600 dark:hover:text-yellow-300 transition-colors">Projects</Link>
      <Link href="/info" className="text-gray-900 dark:text-gray-100 font-medium hover:text-pink-600 dark:hover:text-yellow-300 transition-colors">Info</Link>
      <Link href="/contact" className="text-gray-900 dark:text-gray-100 font-medium hover:text-pink-600 dark:hover:text-yellow-300 transition-colors">Contact</Link>
    </nav>
  </aside>
);

export default Sidebar; 