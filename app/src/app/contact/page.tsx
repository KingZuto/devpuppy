"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      console.log('Sending request to API Gateway...');
      
      // 빌드 시 주입된 환경 변수 사용, 없으면 현재 배포된 URL 사용
      let apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
      
      if (!apiUrl) {
        // 환경 변수가 없으면 현재 배포된 API Gateway URL 사용
        apiUrl = 'https://8nvu3xobn1.execute-api.ap-northeast-2.amazonaws.com/dev';
        console.log('Using fallback API URL:', apiUrl);
      } else {
        console.log('Using environment API URL:', apiUrl);
      }
      
      const response = await fetch(`${apiUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Setting success status...');
        setStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        console.log('Status set to success');
      } else {
        console.log('Setting error status...');
        setStatus({ type: 'error', message: data.error || `Server error: ${response.status}` });
        console.log('Status set to error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus({ 
        type: 'error', 
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      {/* Home Button */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md text-gray-800 dark:text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:bg-white/30 dark:hover:bg-gray-800/30 border border-white/10 dark:border-gray-700/50"
        >
          ← Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl w-full backdrop-blur-md rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 border"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(240, 253, 244, 0.8)',
          borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(187, 247, 208, 0.5)'
        }}
      >
        <h1 
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-2"
          style={{
            color: isDark ? 'white' : 'rgb(17, 24, 39)'
          }}
        >
          Contact
        </h1>
        <p 
          className="text-lg text-center mb-4"
          style={{
            color: isDark ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)'
          }}
        >
          Let&apos;s work together!<br/>
          Send me a message and I&apos;ll get back to you soon.
        </p>
        
        <div className="flex gap-6 justify-center mb-4">
          <span className="text-3xl hover:text-pink-500 dark:hover:text-yellow-400 transition-colors cursor-pointer" title="Email">✉️</span>
          <span className="text-3xl hover:text-pink-500 dark:hover:text-yellow-400 transition-colors cursor-pointer" title="GitHub">🐙</span>
          <span className="text-3xl hover:text-pink-500 dark:hover:text-yellow-400 transition-colors cursor-pointer" title="LinkedIn">💼</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-300 border focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-yellow-400 transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(240, 253, 244, 0.9)',
              borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgba(187, 247, 208, 0.5)',
              color: isDark ? 'white' : 'black'
            }}
            placeholder="Your Name"
            required
          />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-300 border focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-yellow-400 transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(240, 253, 244, 0.9)',
              borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgba(187, 247, 208, 0.5)',
              color: isDark ? 'white' : 'black'
            }}
            placeholder="Your Email"
            required
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="rounded-lg px-4 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-300 border focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-yellow-400 transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(55, 65, 81, 0.8)' : 'rgba(240, 253, 244, 0.9)',
              borderColor: isDark ? 'rgb(75, 85, 99)' : 'rgba(187, 247, 208, 0.5)',
              color: isDark ? 'white' : 'black'
            }}
            placeholder="Your Message"
            rows={4}
            maxLength={1000}
            required
          />
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            {formData.message.length}/1000
          </div>
          
          {status && (
            <div className={`p-3 rounded-lg text-center ${
              status.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
            }`}>
              {status.message}
              {/* Debug info */}
              <div className="text-xs mt-1 opacity-70">
                Status: {status.type} | Message: {status.message.substring(0, 50)}...
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 rounded-lg bg-pink-400 hover:bg-pink-500 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 font-bold py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>

      <div className="text-center mt-8">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          🚀 Powered by AWS API Gateway + Lambda + SES
        </p>
      </div>
    </div>
  );
}
