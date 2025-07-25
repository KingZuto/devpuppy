/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 정적 내보내기를 위한 설정
  images: {
    unoptimized: true, // 정적 내보내기를 위해 이미지 최적화 비활성화
  },
}

module.exports = nextConfig
