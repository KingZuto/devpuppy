"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen w-full bg-transparent px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 border border-white/10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight text-center mb-2">Contact</h1>
        <p className="text-lg text-neutral-800 text-center mb-4">
          Let’s work together!<br/>
          (이메일, SNS, 연락처 등 실제 내용을 나중에 넣으세요)
        </p>
        <div className="flex gap-6 justify-center mb-4">
          <span className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="Email">✉️</span>
          <span className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="GitHub">🐙</span>
          <span className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="LinkedIn">💼</span>
        </div>
        <form className="w-full flex flex-col gap-4">
          <input className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" placeholder="Your Name" disabled />
          <input className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" placeholder="Your Email" disabled />
          <textarea className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" placeholder="Your Message" rows={4} disabled />
          <button type="button" className="mt-2 rounded-lg bg-yellow-400 text-neutral-900 font-bold py-2 transition-all hover:bg-yellow-300 cursor-not-allowed" disabled>
            Send (Demo)
          </button>
        </form>
      </motion.div>
    </div>
  );
} 