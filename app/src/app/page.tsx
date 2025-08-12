"use client";
import Link from 'next/link';
import AWSCharacters from '@/components/AWSCharacters';
import CodeToMusic from '@/components/CodeToMusic';

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
          
          {/* AWS DevOps 코드 애니메이션 섹션 */}
          <div className="mb-12 p-8 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl border border-white/30">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ⚡ DevOps in Action
            </h3>
            <div className="space-y-6">
              <CodeToMusic 
                code="terraform apply -auto-approve" 
                typingSpeed={120}
                transformDelay={1500}
                className="block"
              />
              <CodeToMusic 
                code="aws s3 sync ./build s3://devpuppy" 
                typingSpeed={100}
                transformDelay={2000}
                className="block"
              />
              <CodeToMusic 
                code="🚀 CodePipeline: Build Successful" 
                typingSpeed={150}
                transformDelay={1800}
                className="block"
              />
            </div>
          </div>
          
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
            🎵 Try Hyper mode for floating AWS characters!
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
