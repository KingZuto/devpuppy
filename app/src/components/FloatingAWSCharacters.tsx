"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  SiAwslambda, 
  SiAmazons3, 
  SiAmazonapigateway,
  SiAmazondynamodb
} from "react-icons/si";
import { FaCloud } from "react-icons/fa";

interface FloatingCharacterProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  name: string;
  speed?: number;
  size?: number;
}

// 개별 떠다니는 캐릭터 컴포넌트
const FloatingCharacter: React.FC<FloatingCharacterProps> = ({ 
  icon: Icon, 
  color, 
  name, 
  speed = 1, 
  size = 60
}) => {
  const [position, setPosition] = useState({ 
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 800), 
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 100 : 600) 
  });
  const [velocity, setVelocity] = useState({ 
    x: (Math.random() - 0.5) * speed * 2, 
    y: (Math.random() - 0.5) * speed * 2 
  });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  // 윈도우 크기 감지
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // 애니메이션 루프
  useEffect(() => {
    if (windowSize.width === 0) return;

    const animate = () => {
      setPosition(prevPosition => {
        let newX = prevPosition.x + velocity.x;
        let newY = prevPosition.y + velocity.y;
        let newVelocityX = velocity.x;
        let newVelocityY = velocity.y;

        // 벽 충돌 감지 및 바운스
        if (newX <= 0 || newX >= windowSize.width - size) {
          newVelocityX = -newVelocityX;
          newX = newX <= 0 ? 0 : windowSize.width - size;
        }
        if (newY <= 0 || newY >= windowSize.height - size) {
          newVelocityY = -newVelocityY;
          newY = newY <= 0 ? 0 : windowSize.height - size;
        }

        // 속도 업데이트
        if (newVelocityX !== velocity.x || newVelocityY !== velocity.y) {
          setVelocity({ x: newVelocityX, y: newVelocityY });
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, windowSize, size]);

  if (windowSize.width === 0) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 10,
        pointerEvents: 'none'
      }}
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
      className="drop-shadow-lg"
    >
      <div 
        className={`${color} relative`}
        style={{ fontSize: `${size}px` }}
      >
        <Icon />
        
        {/* 캐릭터별 특수 효과 */}
        {name === "Lambda" && (
          <motion.div
            className="absolute -top-2 -right-2 text-xs"
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⚡
          </motion.div>
        )}
        
        {name === "S3" && (
          <motion.div
            className="absolute -top-1 -left-1 text-xs"
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            📦
          </motion.div>
        )}
        
        {name === "API" && (
          <motion.div
            className="absolute -top-2 left-1/2 text-xs"
            animate={{ 
              y: [0, -8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ♪
          </motion.div>
        )}
        
        {name === "CloudFront" && (
          <motion.div
            className="absolute -left-4 top-1/2 text-xs"
            animate={{ 
              x: [0, -10, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            💨
          </motion.div>
        )}
        
        {name === "DynamoDB" && (
          <>
            <motion.div
              className="absolute -top-4 -left-1 text-xs"
              animate={{ 
                rotate: [0, 360],
                y: [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔵
            </motion.div>
            <motion.div
              className="absolute -top-3 right-0 text-xs"
              animate={{ 
                rotate: [0, -360],
                y: [0, -8, 0]
              }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            >
              🟡
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// 메인 떠다니는 캐릭터들 컴포넌트
const FloatingAWSCharacters = () => {
  const [theme, setTheme] = useState<string>("");

  // 현재 테마 감지
  useEffect(() => {
    const updateTheme = () => {
      if (document.documentElement.classList.contains('zutomayo')) {
        setTheme('zutomayo');
      } else if (document.documentElement.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    updateTheme();
    
    // 테마 변경 감지를 위한 MutationObserver
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Zutomayo 모드가 아니면 렌더링하지 않음
  if (theme !== 'zutomayo') {
    return null;
  }
  const characters = [
    {
      icon: SiAwslambda,
      color: "text-orange-400",
      name: "Lambda",
      speed: 1.5,
      size: 50
    },
    {
      icon: SiAmazons3,
      color: "text-green-400", 
      name: "S3",
      speed: 1,
      size: 55
    },
    {
      icon: SiAmazonapigateway,
      color: "text-blue-400",
      name: "API",
      speed: 2,
      size: 45
    },
    {
      icon: FaCloud,
      color: "text-purple-400",
      name: "CloudFront", 
      speed: 2.5,
      size: 60
    },
    {
      icon: SiAmazondynamodb,
      color: "text-red-400",
      name: "DynamoDB",
      speed: 1.2,
      size: 48
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {characters.map((char, index) => (
        <FloatingCharacter
          key={`${char.name}-${index}`}
          icon={char.icon}
          color={char.color}
          name={char.name}
          speed={char.speed}
          size={char.size}
        />
      ))}
    </div>
  );
};

export default FloatingAWSCharacters;
