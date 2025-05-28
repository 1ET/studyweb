// 通用数据配置
export const siteConfig = {
  name: 'Revolut',
  description: 'The app for spending, saving, and everything in between',
  url: 'https://revolut.com',
  logo: '/assets/images/logo/revolut-logo.svg',
  favicon: '/favicon.ico',
};

export const animations = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easings: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

export const breakpoints = {
  phone: 768,
  pad: 1024,
  pc: 1024,
};

export const colors = {
  primary: '#0666eb',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}; 