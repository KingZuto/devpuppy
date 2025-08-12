"use client";
import Link from 'next/link';
import AWSCharacters from '@/components/AWSCharacters';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-black dark:text-white mb-8">
            🐶 DevPuppy
          </h1>
          <p className="text-xl text-gray-900 dark:text-gray-300 mb-12">
            Welcome to my portfolio website
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              📧 Contact Me
            </Link>
            
            <Link 
              href="/projects" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🚀 Projects
            </Link>
            
            <Link 
              href="/info" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              ℹ️ About
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            🚀 Powered by Next.js + AWS + Terraform
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            🎵 Try Zutomayo mode for floating AWS characters!
          </p>
        </div>
      </div>

      {/* AWS Characters Section */}
      <div className="w-full">
        <AWSCharacters />
      </div>
    </div>
  );
}
