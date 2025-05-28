/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在开发过程中启用ESLint检查
    ignoreDuringBuilds: false,
    // 在开发服务器运行时启用ESLint
    dirs: ['src'],
  },
  
  // SCSS配置
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@import "@/styles/breakpoints.scss";`,
  },
  
  // 性能优化
  experimental: {
    optimizeCss: true,
  },
  
  // 图片优化
  images: {
    domains: ['assets.revolut.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  
  // 压缩配置
  compress: true,
  
  // 开发环境配置
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
  }),
  
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
