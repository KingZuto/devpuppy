"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('https://yquxen9m2g.execute-api.ap-northeast-2.amazonaws.com/dev/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully! I&apos;ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ Error: ${result.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('❌ Network error: Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 border border-white/10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight text-center mb-2">Contact</h1>
        <p className="text-lg text-neutral-800 text-center mb-4">
          Let&apos;s work together!<br/>
          Send me a message and I&apos;ll get back to you soon.
        </p>
        <div className="flex gap-6 justify-center mb-4">
          <a href="mailto:devpuppy.contact@gmail.com" className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="Email">✉️</a>
          <a href="https://github.com/KingZuto" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="GitHub">🐙</a>
          <span className="text-3xl hover:text-yellow-500 transition-colors cursor-pointer" title="LinkedIn">💼</span>
        </div>
        
        {status && (
          <div className={`w-full p-4 rounded-lg text-center ${
            status.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" 
            placeholder="Your Name"
            required
            disabled={isLoading}
          />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" 
            placeholder="Your Email"
            required
            disabled={isLoading}
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 bg-white/80 text-neutral-900 placeholder:text-neutral-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all" 
            placeholder="Your Message"
            rows={4}
            required
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`mt-2 rounded-lg font-bold py-2 transition-all ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-yellow-400 hover:bg-yellow-300 text-neutral-900'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
