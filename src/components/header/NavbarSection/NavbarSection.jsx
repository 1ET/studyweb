'use client';

import React from 'react';
import Link from 'next/link';
import './NavbarSection.scss';
import Logo from '../../common/Logo/Logo';
import { navigationData } from './navbarData';
import { useNavbarState } from '@/hooks/useNavbarState';

const NavbarSection = () => {
  const {
    activeNavItem,
    mobileOpen,
    isMobile,
    isPCMenuOpen,
    handleNavItemHover,
    handleNavItemClick,
    closePCMenu,
    toggleMobileMenu,
    closeAllMenus,
    getNavbarClasses,
    getLogoColor,
  } = useNavbarState();

  // 渲染子菜单内容
  const renderSubmenu = (submenu) => {
    console.log(submenu);
    if (!submenu) return null;

    return (
      <div className='navbar-submenu'>
        <div className='navbar-submenu-container'>
          {/* 标题 */}
          {submenu.layoutType === 'grid' && submenu.title?.text && (
            <div className='navbar-submenu-title'>
              <Link href={submenu.title.href} className='navbar-submenu-title-link'>
                {submenu.title.text}
                {submenu.title.icon && (
                  <span className='navbar-submenu-title-icon'>{submenu.title.icon}</span>
                )}
              </Link>
            </div>
          )}

          {/* 内容 */}
          <div className={`navbar-submenu-content navbar-submenu-content--${submenu.layoutType}`}>
            {submenu.layoutType === 'grid' ? (
              // 网格布局
              submenu.categories.map((category, catIdx) => (
                <div className='navbar-submenu-category' key={catIdx}>
                  {category.title && (
                    <h3 className='navbar-submenu-category-title'>{category.title}</h3>
                  )}
                  <ul className='navbar-submenu-category-items'>
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className='navbar-submenu-category-link'
                          onClick={closeAllMenus}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              // 列表布局
              <div className='navbar-submenu-list-columns'>
                {submenu.categories.map((category, catIdx) => (
                  <div className='navbar-submenu-list-column' key={catIdx}>
                    {category.items.map((item, itemIdx) => (
                      <Link
                        href={item.href}
                        className='navbar-submenu-list-link'
                        key={itemIdx}
                        onClick={closeAllMenus}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 遮罩层 - 只在PC端菜单打开时显示 */}
      {isPCMenuOpen && (
        <div
          className='navbar-overlay'
          onClick={closePCMenu}
        />
      )}

      {/* 遮罩层 - 移动端菜单打开时显示 */}
      {isMobile && mobileOpen && (
        <div
          className='navbar-overlay'
          onClick={closeAllMenus}
        />
      )}

      {/* 导航栏 */}
      <nav className={getNavbarClasses()}>
        <div
          className={`navbar-container ${mobileOpen ? 'open' : ''}`}
          onMouseLeave={closePCMenu}
        >
          <Link href='/' className='navbar-logo'>
            <Logo color={mobileOpen ? 'black' : getLogoColor()} fontSize='1.5rem' />
          </Link>

          <div className='navbar-links-container'>
            <div className={`navbar-links ${mobileOpen ? 'navbar-links-mobile' : ''}`}>
              <div className='navbar-links-container-inner-wrapper'>
                <div className='navbar-links-container-inner'>
                  {/* 导航项 */}
                  {navigationData.map((navItem) => (
                    <div
                      className={`navbar-item${navItem.hasSubmenu ? ' navbar-item--has-submenu' : ''} ${activeNavItem?.id === navItem.id ? 'active' : ''}`}
                      key={navItem.id}
                    >
                      <div
                        className='navbar-link'
                        onMouseOver={!isMobile ? () => handleNavItemHover(navItem) : undefined}
                        onClick={isMobile ? () => handleNavItemClick(navItem) : undefined}
                      >
                        {navItem.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PC端导航菜单 */}
              {!isMobile && activeNavItem?.submenu && (
                renderSubmenu(activeNavItem.submenu)
              )}
              {/* 移动端导航菜单 */}
              {isMobile && mobileOpen && activeNavItem?.submenu && (
                renderSubmenu(activeNavItem.submenu)
              )}
            </div>

            <div className='navbar-actions'>
              <Link href='#' className='navbar-login'>Log in</Link>
              <Link href='#' className='navbar-signup'>Sign up</Link>
              <button
                className='navbar-toggle'
                onClick={toggleMobileMenu}
                aria-label='Toggle menu'
              >
                {mobileOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarSection; 