import { useState, useEffect, useRef } from 'react';
import { useResponsive } from './useResponsive';

export const useNavbarState = () => {
  // 基础状态
  const [isInitialState, setIsInitialState] = useState(true);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [accumulatedScroll, setAccumulatedScroll] = useState(0);
  
  // PC端状态
  const [activeNavItem, setActiveNavItem] = useState(null);
  
  // 移动端状态
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // 使用响应式Hook
  const { isNotPc } = useResponsive();
  const isMobile = isNotPc; // isNotPc 包括手机和平板

  const directionRef = useRef('up');

  // 检测屏幕尺寸变化时的处理
  useEffect(() => {
    // 当切换到移动端时，关闭PC端菜单
    if (isMobile) {
      setActiveNavItem(null);
    }
    // 当切换到PC端时，关闭移动端菜单
    else {
      setMobileOpen(false);
    }
  }, [isMobile]);

  // 滚动处理 - 只在PC端处理
  useEffect(() => {
    const handleScroll = () => {
      // 只在PC端处理滚动逻辑
      if (isMobile) {
        // 移动端保持简单状态
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 10) {
          setIsInitialState(true);
          setIsNavbarHidden(false);
        } else {
          setIsInitialState(false);
          setIsNavbarHidden(false); // 移动端不隐藏导航栏
        }
        return;
      }

      // PC端滚动逻辑
      const currentScrollY = window.scrollY;

      // 更新初始状态
      if (isInitialState && currentScrollY > 10) {
        setIsInitialState(false);
      } else if (!isInitialState && currentScrollY <= 10) {
        setIsInitialState(true);
      }

      // 滚动隐藏/显示逻辑
      if (currentScrollY <= 10) {
        setIsNavbarHidden(false);
        setAccumulatedScroll(0);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > 10 && currentScrollY < 150) {
        setIsNavbarHidden(true);
        setAccumulatedScroll(0);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY >= 150) {
        const scrollDiff = currentScrollY - lastScrollY;
        const currentDirection = scrollDiff > 0 ? 'down' : 'up';

        if (currentDirection !== directionRef.current) {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, accumulatedScroll, isNavbarHidden, isInitialState, isMobile]);

  // 计算状态
  const isPCMenuOpen = !isMobile && activeNavItem !== null;
  const isMobileMenuOpen = isMobile && mobileOpen;
  const isAnyMenuOpen = isPCMenuOpen || isMobileMenuOpen;

  // 操作方法
  const handleNavItemHover = (navItem) => {
    if (!isMobile && navItem.hasSubmenu) {
      setActiveNavItem(navItem);
    }
  };

  // 新增：移动端点击处理方法
  const handleNavItemClick = (navItem) => {
    if (isMobile && navItem.hasSubmenu) {
      // 如果当前项已经激活，则关闭；否则激活
      if (activeNavItem?.id === navItem.id) {
        setActiveNavItem(null);
      } else {
        setActiveNavItem(navItem);
      }
    }
  };

  const closePCMenu = () => {
    if (!isMobile) {
      setActiveNavItem(null);
    }
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    // 确保PC端菜单关闭
    if (!isMobile) {
      setActiveNavItem(null);
    }
  };

  const closeAllMenus = () => {
    setActiveNavItem(null);
    setMobileOpen(false);
  };

  // 样式计算
  const getNavbarClasses = () => {
    let classes = 'navbar';

    // 移动端样式逻辑
    if (isMobile) {
      if (!isInitialState) {
        classes += ' navbar-scrolled';
      }
      // 移动端不添加 navbar-hidden 类
    } else {
      // PC端样式逻辑
      if (isNavbarHidden) {
        classes += ' navbar-hidden';
      }

      if (isPCMenuOpen) {
        classes += ' navbar-expanded';
      } else if (!isInitialState) {
        classes += ' navbar-scrolled';
      }
    }

    return classes;
  };

  const getLogoColor = () => {
    // 移动端逻辑
    if (isMobile) {
      return !isInitialState ? 'black' : 'white';
    }
    
    // PC端逻辑
    if (isPCMenuOpen || !isInitialState) {
      return 'black';
    }
    return 'white';
  };

  return {
    // 状态
    isInitialState,
    isNavbarHidden,
    activeNavItem,
    mobileOpen,
    isMobile,
    isPCMenuOpen,
    isMobileMenuOpen,
    isAnyMenuOpen,
    
    // 方法
    handleNavItemHover,
    handleNavItemClick,
    closePCMenu,
    toggleMobileMenu,
    closeAllMenus,
    getNavbarClasses,
    getLogoColor,
  };
}; 