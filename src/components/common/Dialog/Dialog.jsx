'use client';

import React, { useEffect, useRef } from 'react';
import './Dialog.scss';

const Dialog = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'medium', // small, medium, large, fullscreen
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  hideHeader = false,        // 新增：隐藏头部
  hideFooter = false,        // 新增：隐藏底部
  externalCloseButton = false, // 新增：外部关闭按钮
  screenCloseButton = false,   // 新增：屏幕右上角关闭按钮
  ...props
}) => {
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);

  // 处理ESC键关闭
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // 处理body滚动锁定
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('dialog-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('dialog-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('dialog-open');
    };
  }, [isOpen]);

  // 处理点击遮罩层关闭
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose?.();
    }
  };

  // 阻止对话框内容区域的点击事件冒泡
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  // 判断是否显示头部
  const shouldShowHeader = !hideHeader && (title || (showCloseButton && !externalCloseButton && !screenCloseButton));
  
  // 判断是否显示底部
  const shouldShowFooter = !hideFooter && footer;

  return (
    <div 
      className={`dialog-overlay ${className}`}
      ref={overlayRef}
      onClick={handleOverlayClick}
      {...props}
    >
      {/* 屏幕右上角关闭按钮 */}
      {screenCloseButton && showCloseButton && (
        <button
          className='dialog-close-screen'
          onClick={onClose}
          type='button'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M18 6L6 18M6 6L18 18'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      )}

      <div className='dialog-wrapper'>
        {/* 对话框右上角关闭按钮 */}
        {externalCloseButton && showCloseButton && !screenCloseButton && (
          <button
            className='dialog-close-external'
            onClick={onClose}
            aria-label='关闭对话框'
            type='button'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
              <path
                d='M18 6L6 18M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        )}

        <div 
          className={`dialog dialog-${size}`}
          ref={dialogRef}
          onClick={handleDialogClick}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'dialog-title' : undefined}
        >
          {/* 对话框头部 */}
          {shouldShowHeader && (
            <div className={`dialog-header ${headerClassName}`}>
              {title && (
                <h2 id='dialog-title' className='dialog-title'>
                  {title}
                </h2>
              )}
              {showCloseButton && !externalCloseButton && !screenCloseButton && (
                <button
                  className='dialog-close'
                  onClick={onClose}
                  aria-label='关闭对话框'
                  type='button'
                >
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M18 6L6 18M6 6L18 18'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* 对话框内容 */}
          <div className={`dialog-body ${bodyClassName} ${!shouldShowHeader ? 'no-header' : ''} ${!shouldShowFooter ? 'no-footer' : ''}`}>
            {children}
          </div>

          {/* 对话框底部 */}
          {shouldShowFooter && (
            <div className={`dialog-footer ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog; 