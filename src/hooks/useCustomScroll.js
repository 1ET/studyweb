'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useResponsive } from './useResponsive';

export const useCustomScroll = (config = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [isCustomScrollEnabled, setIsCustomScrollEnabled] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);

  // 使用响应式Hook检测设备类型
  const { isNotPc } = useResponsive();
  const isMobile = isNotPc; // isNotPc 包括手机和平板

  const scrollConfig = useRef({
    snapPoints: [0, 40, 100],
    snapThreshold: 20,
    scrollSpeed: 0.5,
    lockDuration: 1000,
    enableSnap: true,
    smoothScroll: true,
    ...config,
  });

  const customScrollManager = useRef({
    isLocked: false,
    pendingScroll: 0,
    lastWheelTime: 0,

    setConfig: (newConfig) => {
      scrollConfig.current = { ...scrollConfig.current, ...newConfig };
    },

    scrollTo: (targetY, smooth = true) => {
      const behavior = smooth && scrollConfig.current.smoothScroll ? 'smooth' : 'instant';
      window.scrollTo({ top: targetY, behavior });
      setCurrentScrollY(targetY);

      // 更新滚动状态逻辑
      if (targetY >= 100) {
        setIsScrolled(true);
        setIsCustomScrollEnabled(false);
        setIsInitialState(false);
      } else if (targetY >= 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    },

    findNearestSnapPoint: (scrollY) => {
      const { snapPoints, snapThreshold } = scrollConfig.current;
      let nearest = scrollY;
      let minDistance = Infinity;

      for (const point of snapPoints) {
        const distance = Math.abs(scrollY - point);
        if (distance < minDistance && distance <= snapThreshold) {
          minDistance = distance;
          nearest = point;
        }
      }

      return nearest;
    },

    handleCustomScroll: (deltaY) => {
      if (customScrollManager.current.isLocked) return;

      const { scrollSpeed, enableSnap } = scrollConfig.current;
      const currentY = window.scrollY;
      let targetY = currentY + (deltaY * scrollSpeed);

      targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));

      if (currentY === 0 && deltaY > 0) {
        targetY = 100;
        customScrollManager.current.scrollTo(targetY);

        if (isInitialState) {
          customScrollManager.current.lockScroll(1000);
          setTimeout(() => {
            setIsCustomScrollEnabled(false);
            setIsInitialState(false);
          }, 1000);
        } else {
          customScrollManager.current.lockScroll(1000);
          setTimeout(() => {
            setIsCustomScrollEnabled(false);
          }, 1000);
        }
        return;
      } else if (enableSnap) {
        targetY = customScrollManager.current.findNearestSnapPoint(targetY);
      }

      customScrollManager.current.scrollTo(targetY);
      
      // 检查滚动位置，当超过100px时更新状态
      if (targetY >= 100) {
        setIsCustomScrollEnabled(false);
        setIsInitialState(false);
        setIsScrolled(true);
      }
    },

    lockScroll: (duration = 1000) => {
      // 设置白色滚动条
      document.body.style.overflow = 'overlay';
      document.documentElement.style.overflow = 'overlay';
      document.body.style.scrollbarColor = 'white white'; // Firefox
      document.documentElement.style.scrollbarColor = 'white white'; // Firefox
      
      // 添加自定义样式类
      document.body.classList.add('white-scrollbar');
      document.documentElement.classList.add('white-scrollbar');
      
      customScrollManager.current.isLocked = true;

      setTimeout(() => {
        // 恢复默认滚动条
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.scrollbarColor = '';
        document.documentElement.style.scrollbarColor = '';
        
        // 移除自定义样式类
        document.body.classList.remove('white-scrollbar');
        document.documentElement.classList.remove('white-scrollbar');
        
        customScrollManager.current.isLocked = false;
      }, duration);
    },
  });

  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;

    return (...args) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // 阻止所有默认滚动行为 - 只在PC端生效
  useEffect(() => {
    // 如果是移动设备，禁用自定义滚动
    if (isMobile) {
      setIsCustomScrollEnabled(false);
      return;
    }

    if (!isCustomScrollEnabled) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const deltaY = e.deltaY > 0 ? 50 : -50;
      customScrollManager.current.handleCustomScroll(deltaY);
    };

    const handleKeydown = (e) => {
      const keyActions = {
        38: -50,  // 上箭头
        40: 50,   // 下箭头
        33: -200, // Page Up
        34: 200,  // Page Down
        36: -window.scrollY, // Home
        35: document.documentElement.scrollHeight, // End
        32: 200,   // 空格键
      };

      if (keyActions[e.keyCode] !== undefined) {
        e.preventDefault();
        customScrollManager.current.handleCustomScroll(keyActions[e.keyCode]);
      }
    };

    const handleTouchStart = (e) => {
      customScrollManager.current.touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = customScrollManager.current.touchStartY - touchY;
      customScrollManager.current.handleCustomScroll(deltaY);
      customScrollManager.current.touchStartY = touchY;
    };

    const throttledWheel = throttle(handleWheel, 50);
    const throttledKeydown = throttle(handleKeydown, 50);
    const throttledTouchMove = throttle(handleTouchMove, 50);

    window.addEventListener('wheel', throttledWheel, { passive: false });
    window.addEventListener('keydown', throttledKeydown, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', throttledTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', throttledWheel);
      window.removeEventListener('keydown', throttledKeydown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', throttledTouchMove);

      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isCustomScrollEnabled, throttle, isInitialState, isMobile]);

  // 监听浏览器默认滚动
  useEffect(() => {
    // 移动端始终使用默认滚动
    if (isMobile || isCustomScrollEnabled) return;

    let lastScrollY = window.scrollY;

    const handleBrowserScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      
      // 更新当前滚动位置
      setCurrentScrollY(currentScrollY);
      
      // 更新滚动状态
      if (currentScrollY >= 100) {
        setIsScrolled(true);
        setIsCustomScrollEnabled(false);
        setIsInitialState(false);
      } else if (currentScrollY >= 40) {
        setIsScrolled(true);
        // 当在40-100px之间时，不改变isCustomScrollEnabled和isInitialState
      } else {
        setIsScrolled(false);
      }

      // 只在PC端才重新启用自定义滚动
      if (!isMobile && isScrollingUp && currentScrollY <= 40) {
        setIsCustomScrollEnabled(true);
        setIsInitialState(true);
        
        customScrollManager.current.lockScroll(1000);
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentScrollY(0);
          setIsScrolled(false);
        }, 100);
      }

      lastScrollY = currentScrollY;
    };

    const throttledBrowserScroll = throttle(handleBrowserScroll, 50);

    window.addEventListener('scroll', throttledBrowserScroll);

    return () => {
      window.removeEventListener('scroll', throttledBrowserScroll);
    };
  }, [isCustomScrollEnabled, throttle, isMobile]);

  // 初始化滚动状态 - 根据设备类型设置
  useEffect(() => {
    const initialScrollY = window.scrollY;
    setCurrentScrollY(initialScrollY);
    
    // 移动端禁用自定义滚动
    if (isMobile) {
      setIsCustomScrollEnabled(false);
      setIsScrolled(initialScrollY > 40);
      setIsInitialState(initialScrollY <= 10);
      return;
    }
    
    // PC端根据初始滚动位置设置状态
    if (initialScrollY >= 100) {
      setIsScrolled(true);
      setIsCustomScrollEnabled(false);
      setIsInitialState(false);
    } else if (initialScrollY >= 40) {
      setIsScrolled(true);
      setIsCustomScrollEnabled(true);
      setIsInitialState(true);
    } else {
      setIsScrolled(false);
      setIsCustomScrollEnabled(true);
      setIsInitialState(true);
    }
  }, [isMobile]);

  // 设备类型切换时的处理
  useEffect(() => {
    if (isMobile) {
      // 切换到移动端时禁用自定义滚动
      setIsCustomScrollEnabled(false);
    } else {
      // 切换到PC端时，根据当前滚动位置决定是否启用自定义滚动
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsCustomScrollEnabled(true);
      }
    }
  }, [isMobile]);

  // 移动端基础滚动处理
  useEffect(() => {
    if (!isMobile) return;

    const handleMobileScroll = () => {
      const currentScrollY = window.scrollY;
      setCurrentScrollY(currentScrollY);
      
      // 移动端简单的滚动状态管理
      if (currentScrollY <= 10) {
        setIsInitialState(true);
        setIsScrolled(false);
      } else if (currentScrollY > 40) {
        setIsInitialState(false);
        setIsScrolled(true);
      } else {
        setIsInitialState(false);
        setIsScrolled(false);
      }
    };

    const throttledMobileScroll = throttle(handleMobileScroll, 50);
    window.addEventListener('scroll', throttledMobileScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledMobileScroll);
    };
  }, [isMobile, throttle]);

  // 公开的API
  const scrollAPI = {
    enableCustomScroll: (enabled) => {
      customScrollManager.current.lockScroll(1000);
      setIsCustomScrollEnabled(enabled);
    },

    updateConfig: (config) => {
      customScrollManager.current.setConfig(config);
    },

    scrollTo: (y, smooth = true) => {
      customScrollManager.current.scrollTo(y, smooth);
    },

    lock: (duration) => {
      customScrollManager.current.lockScroll(duration);
    },

    getConfig: () => scrollConfig.current,

    getState: () => ({
      currentScrollY,
      isScrolled,
      isLocked: customScrollManager.current.isLocked,
      isCustomScrollEnabled,
      isInitialState,
    }),
  };

  // 将API暴露到window对象
  useEffect(() => {
    window.customScrollAPI = scrollAPI;
    return () => {
      delete window.customScrollAPI;
    };
  }, [currentScrollY, isScrolled, isCustomScrollEnabled, isInitialState]);

  return {
    isScrolled,
    currentScrollY,
    isCustomScrollEnabled,
    isInitialState,
    scrollAPI,
    setIsCustomScrollEnabled,
    scrollTo: customScrollManager.current.scrollTo,
    setConfig: customScrollManager.current.setConfig,
    lockScroll: customScrollManager.current.lockScroll,
  };
};

export default useCustomScroll; 