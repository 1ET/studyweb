'use client';

import { useState, useEffect, useRef } from 'react';
import { useResponsive } from './useResponsive';

/**
 * 导航栏效果管理Hook
 * 处理滚动隐藏、状态切换、响应式行为等
 */
export const useNavbarEffects = () => {
  const { isPhone, isPad, isPc } = useResponsive();
  
  // 导航栏状态
  const [isInitialState, setIsInitialState] = useState(true);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  
  // 滚动相关状态
  const [lastScrollY, setLastScrollY] = useState(0);
  const [accumulatedScroll, setAccumulatedScroll] = useState(0);
  const directionRef = useRef('up');

  // 防抖函数
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 滚动处理逻辑
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollY = window.scrollY;

      // 检查是否为初始状态
      if (currentScrollY > 50 && isInitialState) {
        setIsInitialState(false);
      } else if (currentScrollY <= 50 && !isInitialState) {
        setIsInitialState(true);
        setIsNavbarHidden(false);
        setAccumulatedScroll(0);
      }

      // 滚动隐藏逻辑（仅在非初始状态下生效）
      if (!isInitialState && currentScrollY > 100) {
        const scrollDiff = currentScrollY - lastScrollY;
        const currentDirection = scrollDiff > 0 ? 'down' : 'up';

        if (directionRef.current !== currentDirection) {
          setAccumulatedScroll(Math.abs(scrollDiff));
          directionRef.current = currentDirection;
        } else {
          setAccumulatedScroll(prev => prev + Math.abs(scrollDiff));
        }

        if (accumulatedScroll >= 100) {
          if (currentDirection === 'down' && !isNavbarHidden) {
            setIsNavbarHidden(true);
          } else if (currentDirection === 'up' && isNavbarHidden) {
            setIsNavbarHidden(false);
          }
          setAccumulatedScroll(0);
        }
      }

      setLastScrollY(currentScrollY);
    }, 16); // 约60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, accumulatedScroll, isNavbarHidden, isInitialState]);

  // 响应式处理：在桌面端自动关闭移动菜单
  useEffect(() => {
    if (isPc && mobileOpen) {
      setMobileOpen(false);
      setOpenIndex(-1);
    }
  }, [isPc, mobileOpen]);

  // 手风琴切换
  const handleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  // 移动端菜单切换
  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpenIndex(-1);
  };

  // 关闭所有菜单
  const closeAllMenus = () => {
    setOpenIndex(-1);
    setMobileOpen(false);
  };

  // 计算导航栏类名
  const getNavbarClasses = () => {
    let classes = 'navbar';

    if (isNavbarHidden) {
      classes += ' navbar-hidden';
    }

    const isAccordionOpen = openIndex !== -1;
    
    if (isAccordionOpen || mobileOpen) {
      classes += ' navbar-expanded';
    } else if (!isInitialState) {
      classes += ' navbar-scrolled';
    }

    // 添加设备类型类名
    if (isPhone) classes += ' navbar--phone';
    if (isPad) classes += ' navbar--pad';
    if (isPc) classes += ' navbar--pc';

    return classes;
  };

  // 计算Logo颜色
  const getLogoColor = () => {
    const isAccordionOpen = openIndex !== -1;
    if (isAccordionOpen || mobileOpen || !isInitialState) {
      return 'black';
    }
    return 'white';
  };

  // 判断是否应该显示桌面导航
  const shouldShowDesktopNav = isPc;
  
  // 判断是否应该显示移动导航
  const shouldShowMobileNav = isPhone || isPad;

  return {
    // 状态
    isInitialState,
    isNavbarHidden,
    mobileOpen,
    openIndex,
    
    // 设备类型
    isPhone,
    isPad,
    isPc,
    
    // 方法
    handleAccordion,
    handleMobileToggle,
    closeAllMenus,
    
    // 计算属性
    getNavbarClasses,
    getLogoColor,
    shouldShowDesktopNav,
    shouldShowMobileNav,
    
    // 便捷状态
    isAccordionOpen: openIndex !== -1,
    hasOverlay: openIndex !== -1 || mobileOpen,
  };
};

export default useNavbarEffects; 