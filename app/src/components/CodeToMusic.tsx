"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeToMusicProps {
  code: string;
  typingSpeed?: number;
  transformDelay?: number;
  className?: string;
}

const CodeToMusic: React.FC<CodeToMusicProps> = ({ 
  code, 
  typingSpeed = 100, 
  transformDelay = 2000,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 글자 → 이모지 매핑 (DevOps 테마)
  const charToEmoji: { [key: string]: string } = {
    'a': '⚡', 'b': '🔧', 'c': '☁️', 'd': '🚀', 'e': '💻', 'f': '🔥', 'g': '⚙️', 'h': '🛠️',
    'i': '📦', 'j': '🔗', 'k': '🔑', 'l': '📊', 'm': '🌐', 'n': '🔔', 'o': '💡', 'p': '📈',
    'q': '❓', 'r': '🔄', 's': '💾', 't': '⏰', 'u': '🔓', 'v': '✅', 'w': '⚠️', 'x': '❌',
    'y': '✨', 'z': '🎯',
    'A': '🏗️', 'B': '🔨', 'C': '☁️', 'D': '📊', 'E': '⚡', 'F': '🔥', 'G': '⚙️', 'H': '🏠',
    'I': '📋', 'J': '🔗', 'K': '🔑', 'L': '📝', 'M': '📱', 'N': '🌐', 'O': '🔍', 'P': '📦',
    'Q': '❓', 'R': '🔄', 'S': '💾', 'T': '🛠️', 'U': '🔓', 'V': '✅', 'W': '⚠️', 'X': '❌',
    'Y': '✨', 'Z': '🎯',
    '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣',
    '8': '8️⃣', '9': '9️⃣',
    ' ': '💨', '.': '🔸', ',': '🔹', '!': '❗', '?': '❓', ':': '🔸', ';': '🔹', 
    '(': '📂', ')': '📁', '[': '📋', ']': '📄', '{': '🗂️', '}': '📊',
    '+': '➕', '-': '➖', '*': '✖️', '/': '➗', '=': '🟰', '<': '◀️', '>': '▶️',
    '@': '📧', '#': '🏷️', '$': '💰', '%': '📊', '^': '⬆️', '&': '🔗',
    '🐶': '🐕', '🚀': '🛸', '💻': '⌨️', '☁️': '⛅'
  };

  // 타이핑 애니메이션
  useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedText(code.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else if (currentIndex === code.length && !isComplete) {
      setIsComplete(true);
      // 타이핑 완료 후 변환 시작
      const transformTimer = setTimeout(() => {
        setShowNotes(true);
      }, transformDelay);
      
      return () => clearTimeout(transformTimer);
    }
  }, [currentIndex, code, code.length, typingSpeed, transformDelay, isComplete]);

  // 리셋 함수 (다시 시작하고 싶을 때)
  const reset = () => {
    setDisplayedText("");
    setCurrentIndex(0);
    setShowNotes(false);
    setIsComplete(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 타이핑 중인 코드 */}
      <AnimatePresence>
        {!showNotes && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-lg relative"
          >
            {displayedText.split('').map((char, index) => (
              <motion.span
                key={`char-${index}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.2,
                  delay: index * (typingSpeed / 1000)
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            
            {/* 커서 깜빡임 */}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1 bg-current w-0.5 h-5"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이모지 애니메이션 */}
      <AnimatePresence>
        {showNotes && (
          <div className="absolute inset-0 overflow-visible">
            {code.split('').map((char, index) => (
              <motion.span
                key={`emoji-${index}`}
                initial={{ 
                  opacity: 0, 
                  y: 0, 
                  scale: 0.5,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0.8, 0],
                  y: [0, -20, -60, -100, -140],
                  x: [0, (Math.random() - 0.5) * 40],
                  scale: [0.5, 1, 1.2, 1, 0.8],
                  rotate: [0, (Math.random() - 0.5) * 360]
                }}
                transition={{ 
                  duration: 4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-2xl pointer-events-none"
                style={{ 
                  left: `${index * 0.6}em`,
                  filter: `hue-rotate(${(index * 30) % 360}deg)`
                }}
              >
                {charToEmoji[char] || '⚡'}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 다시 시작 버튼 (완료 후) */}
      {showNotes && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          onClick={reset}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                     px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 
                     text-white rounded-lg text-sm hover:scale-105 transition-transform
                     shadow-lg"
        >
          ⚡ Run Again
        </motion.button>
      )}
    </div>
  );
};

export default CodeToMusic;
