'use client';

import { useState, useEffect } from 'react';

/**
 * 设备断点配置
 */
export const DEVICE_BREAKPOINTS = {
  PHONE: 768,   // <= 768px
  PAD: 1024,    // <= 1024px  
  PC: 1024,      // > 1024px
};

/**
 * 响应式断点检测 Hook
 * @param {Object} options - 配置选项
 * @param {number} options.debounceMs - 防抖延迟时间，默认 100ms
 * @returns {Object} 响应式状态对象
 */
export const useResponsive = (options = {}) => {
  const { debounceMs = 100 } = options;
  
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [devices, setDevices] = useState({
    isPhone: false,
    isPad: false,
    isPc: false,
  });

  useEffect(() => {
    // 初始化窗口尺寸和设备类型
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      
      // 设备类型判断
      const isPhone = width <= DEVICE_BREAKPOINTS.PHONE;
      const isPad = width > DEVICE_BREAKPOINTS.PHONE && width <= DEVICE_BREAKPOINTS.PAD;
      const isPc = width > DEVICE_BREAKPOINTS.PC;
      
      setDevices({
        isPhone,
        isPad,
        isPc,
      });
    };

    // 防抖处理
    let timeoutId;
    const debouncedUpdateSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, debounceMs);
    };

    // 初始化
    updateSize();

    // 监听窗口变化
    window.addEventListener('resize', debouncedUpdateSize);

    return () => {
      window.removeEventListener('resize', debouncedUpdateSize);
      clearTimeout(timeoutId);
    };
  }, [debounceMs]);

  return {
    // 窗口尺寸
    windowSize,
    
    // 设备类型
    ...devices,
    
    // 便捷方法
    isSmallScreen: devices.isPhone,
    isMediumScreen: devices.isPad,
    isLargeScreen: devices.isPc,
    
    // 自定义断点检测
    isAbove: (breakpoint) => windowSize.width > breakpoint,
    isBelow: (breakpoint) => windowSize.width <= breakpoint,
    isBetween: (min, max) => windowSize.width > min && windowSize.width <= max,
    
    // 常用组合
    isMobile: devices.isPhone,
    isTablet: devices.isPad,
    isDesktop: devices.isPc,
    
    // 组合判断
    isPhoneOrPad: devices.isPhone || devices.isPad,
    isPadOrPc: devices.isPad || devices.isPc,
    isNotPc: devices.isPhone || devices.isPad,
    isNotPhone: devices.isPad || devices.isPc,
  };
};

/**
 * 简化版响应式 Hook - 只检测是否为桌面端
 * @param {number} breakpoint - 桌面端断点，默认 1024px
 * @returns {boolean} 是否为桌面端
 */
export const useIsDesktop = (breakpoint = 1024) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > breakpoint);
    };

    // 初始化
    checkIsDesktop();

    // 监听窗口变化
    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, [breakpoint]);

  return isDesktop;
};

/**
 * 获取当前设备类型
 * @returns {string} 'phone' | 'pad' | 'pc'
 */
export const useDeviceType = () => {
  const { isPhone, isPad, isPc } = useResponsive();
  
  if (isPhone) return 'phone';
  if (isPad) return 'pad';
  if (isPc) return 'pc';
  
  return 'unknown';
};

export default useResponsive; 