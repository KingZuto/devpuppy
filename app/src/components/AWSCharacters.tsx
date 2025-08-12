"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  SiAwslambda, 
  SiAmazons3, 
  SiAmazonapigateway,
  SiAmazondynamodb
} from "react-icons/si";
import { 
  FaCloud
} from "react-icons/fa";

// Lambda 댄서 - 서버리스 춤꾼
const LambdaDancer = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ 
        rotate: [0, 10, -10, 0],
        y: [0, -15, 0, -8, 0] 
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl text-orange-400 drop-shadow-lg"
      >
        <SiAwslambda />
      </motion.div>
      <motion.div 
        className="text-sm font-bold mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🕺 Lambda Dancer
        <div className="text-xs opacity-70">Serverless Moves</div>
      </motion.div>
    </motion.div>
  );
};

// S3 운반자 - 스토리지 배달부
const S3Carrier = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ 
        x: [0, 30, 0, -30, 0],
        rotate: [0, 3, 0, -3, 0] 
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -5, 0, -3, 0],
          scale: [1, 0.95, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl text-green-400 drop-shadow-lg relative"
      >
        <SiAmazons3 />
        {/* 운반 중인 박스들 */}
        <motion.div
          className="absolute -top-2 -right-2 text-xs"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          📦
        </motion.div>
        <motion.div
          className="absolute -top-1 -left-2 text-xs"
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          📦
        </motion.div>
      </motion.div>
      <motion.div 
        className="text-sm font-bold mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        📦 S3 Carrier
        <div className="text-xs opacity-70">Storage Delivery</div>
      </motion.div>
    </motion.div>
  );
};

// API Gateway 지휘자 - 요청 오케스트라
const APIGatewayConductor = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ 
        scale: [1, 1.05, 1],
        y: [0, -5, 0]
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 15, -15, 0, 10, -10, 0],
          scale: [1, 1.1, 1, 1.05, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl text-blue-400 drop-shadow-lg relative"
      >
        <SiAmazonapigateway />
        {/* 지휘봉 효과 */}
        <motion.div
          className="absolute -top-3 -right-1 text-lg"
          animate={{ 
            rotate: [0, 45, -45, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎼
        </motion.div>
        {/* 음표들 */}
        <motion.div
          className="absolute -top-2 -left-3 text-sm"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          ♪
        </motion.div>
        <motion.div
          className="absolute -top-1 right-2 text-sm"
          animate={{ 
            y: [0, -8, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          ♫
        </motion.div>
      </motion.div>
      <motion.div 
        className="text-sm font-bold mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        🎼 API Conductor
        <div className="text-xs opacity-70">Request Orchestra</div>
      </motion.div>
    </motion.div>
  );
};

// CloudFront 배달자 - 글로벌 스피드
const CloudFrontDelivery = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ 
        x: [0, 50, 0, -50, 0],
        scale: [1, 0.9, 1, 0.9, 1]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-6xl text-purple-400 drop-shadow-lg relative"
      >
        <FaCloud />
        {/* 스피드 라인들 */}
        <motion.div
          className="absolute -left-8 top-1/2 text-sm"
          animate={{ 
            x: [0, -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💨
        </motion.div>
        <motion.div
          className="absolute -left-6 top-1/3 text-xs"
          animate={{ 
            x: [0, -15, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        >
          💨
        </motion.div>
      </motion.div>
      <motion.div 
        className="text-sm font-bold mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🚚 CloudFront Express
        <div className="text-xs opacity-70">Global Delivery</div>
      </motion.div>
    </motion.div>
  );
};

// DynamoDB 저글러 - 데이터 곡예사
const DynamoDBJuggler = () => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ 
        y: [0, -10, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl text-red-400 drop-shadow-lg relative"
      >
        <SiAmazondynamodb />
        {/* 저글링 아이템들 */}
        <motion.div
          className="absolute -top-8 -left-2 text-lg"
          animate={{ 
            y: [0, -20, 0],
            x: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔵
        </motion.div>
        <motion.div
          className="absolute -top-6 right-1 text-lg"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
        >
          🟡
        </motion.div>
        <motion.div
          className="absolute -top-10 left-1/2 text-lg"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        >
          🟢
        </motion.div>
      </motion.div>
      <motion.div 
        className="text-sm font-bold mt-2 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        🤹 DynamoDB Juggler
        <div className="text-xs opacity-70">Data Acrobat</div>
      </motion.div>
    </motion.div>
  );
};

// 메인 AWS 캐릭터 컴포넌트
const AWSCharacters = () => {
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

  // Zutomayo 모드에서는 정적 섹션 숨기기 (떠다니는 캐릭터가 있으니까!)
  if (theme === 'zutomayo') {
    return null;
  }
  return (
    <div className="w-full py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 zutomayo-title">
          ☁️ AWS Character Circus
        </h2>
        <p className="text-lg opacity-80 zutomayo-subtitle">
          Meet the cloud services that power DevPuppy! 🎪
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="zutomayo-card p-6 hover:scale-105 transition-transform"
        >
          <LambdaDancer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="zutomayo-card p-6 hover:scale-105 transition-transform"
        >
          <S3Carrier />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="zutomayo-card p-6 hover:scale-105 transition-transform"
        >
          <APIGatewayConductor />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="zutomayo-card p-6 hover:scale-105 transition-transform"
        >
          <CloudFrontDelivery />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="zutomayo-card p-6 hover:scale-105 transition-transform"
        >
          <DynamoDBJuggler />
        </motion.div>
      </div>

      {/* 하단 설명 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-sm opacity-70">
          🎭 Each AWS service has its own personality and role in the DevPuppy ecosystem!
        </p>
      </motion.div>
    </div>
  );
};

export default AWSCharacters;
