"use client";
import { motion } from "framer-motion";

export default function InfoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 border border-white/10"
      >
        <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-5xl shadow-lg border-4 border-yellow-300 mb-2">
          🐶
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-center mb-2">About Me</h1>
        <div className="text-lg text-neutral-200 text-center mb-4 flex flex-col gap-2">
          <span>Hello!</span>
          <span>
            I’m <span className="font-bold text-yellow-300">DevPuppy</span>, an aspiring developer passionate about DevOps and cloud technologies.
          </span>
          <span className="mt-2 font-semibold text-yellow-300">Key Interests</span>
          <span>AWS, DevOps, Cloud Infrastructure, Automation, Web Frontend</span>
          <span className="mt-2 font-semibold text-yellow-300">Hands-on Experience</span>
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