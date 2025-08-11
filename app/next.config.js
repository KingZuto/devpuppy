/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // /contact → /contact/ → /contact/index.html
  // 정적 내보내기를 위한 설정
  images: {
    unoptimized: true, // 정적 내보내기를 위해 이미지 최적화 비활성화
  },
  // 정적 빌드에서도 클라이언트 JavaScript 활성화
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
