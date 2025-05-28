'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import './AnimatedButtonGroup.scss';

const AnimatedButtonGroup = ({
  items = [],
  activeItem: externalActiveItem,
  onItemChange,
  variant = 'light',
  animationDuration = 10000,
  autoSwitch = false,
  className = '',
  buttonClassName = '',
}) => {
  // 添加计时器引用
  const timerRef = useRef(null);
  const normalizedItems = items.map((item, index) => {
    if (typeof item === 'string') {
      return {
        id: item.toLowerCase().replace(/\s+/g, '-'),
        label: item,
        value: item.toLowerCase(),
      };
    } else if (typeof item === 'object' && item !== null) {
      return {
        id: item.id || item.value || item.label?.toLowerCase().replace(/\s+/g, '-') || `item-${index}`,
        label: item.label || item.value || item,
        value: item.value || item.label?.toLowerCase() || item,
      };
    }
    return {
      id: `item-${index}`,
      label: String(item),
      value: String(item).toLowerCase(),
    };
  });
  // 自动切换到下一个选项卡的函数
  const switchToNextTab = () => {

    // 改变活跃选项卡
    setActiveTab(currentTab => {
      const currentIndex = tabSequence.indexOf(currentTab);
      const nextIndex = (currentIndex + 1) % tabSequence.length;
      return tabSequence[nextIndex];
    });
  };
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(switchToNextTab, 10 * 1000);
  }, []);

  const [internalActiveItem, setInternalActiveItem] = useState(
    normalizedItems[0]?.value || '',
  );
  const [resetAnimation, setResetAnimation] = useState(false);

  // 决定使用外部还是内部的 activeItem
  const activeItem = externalActiveItem !== undefined ? externalActiveItem : internalActiveItem;

  // 处理按钮点击
  const handleItemClick = useCallback((item) => {
    if (item !== activeItem) {
      onItemChange(item);
      resetTimer();
    }
  }, [activeItem, onItemChange, resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => clearTimer();
  }, [resetTimer]);

  // 自动切换逻辑
  useEffect(() => {
    if (autoSwitch && normalizedItems.length > 1) {
      const timer = setInterval(() => {
        const currentIndex = normalizedItems.findIndex(item => item.value === activeItem);
        const nextIndex = (currentIndex + 1) % normalizedItems.length;
        handleItemClick(normalizedItems[nextIndex].value);
      }, animationDuration);

      return () => clearInterval(timer);
    }
  }, [activeItem, normalizedItems, animationDuration, autoSwitch]);

  // 如果没有按钮项，返回空
  if (!normalizedItems.length) {
    return null;
  }

  return (
    <div className={`animated-button-group ${variant} ${className}`}>
      <div className='button-group-wrap'>
        {normalizedItems.map((item) => (
          <button
            key={item.id}
            className={`
              animated-btn 
              ${buttonClassName}
              ${activeItem === item.value ? 'active' : ''} 
              ${activeItem === item.value && resetAnimation ? 'reset-animation' : ''}
            `.trim()}
            onClick={() => handleItemClick(item.value)}
            style={{
              '--animation-duration': `${animationDuration}ms`,
            }}
          >
            <span className='btn-text'>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedButtonGroup; 