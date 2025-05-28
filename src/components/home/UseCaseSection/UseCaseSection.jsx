'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './UseCaseSection.scss';
import Button from '../../common/Button/Button';
import AnimatedButtonGroup from '@/components/common/AnimatedButtonGroup/AnimatedButtonGroup';

const dataList = [
  {
    title: 'Simply hit send',
    description: 'Send money to friends and family around the world in a few taps.',
    buttonText: 'Send money',
    imageUrl: '/assets/images/features/simply-hit-send.png',
  },
  {
    title: 'Split that bill',
    description: 'Split bills with friends and get paid back instantly.',
    buttonText: 'Split bills',
    imageUrl: '/assets/images/features/split-that-bill.png',
  },
  {
    title: 'Be the best gift-er',
    description: 'Send gift cards and money to loved ones instantly.',
    buttonText: 'Send gifts',
    imageUrl: '/assets/images/features/be-the-best-gift-er.png',
  },
];

const UseCaseSection = () => {
  // 添加状态来跟踪当前激活的按钮/图片
  const [activeButton, setActiveButton] = useState('send');

  // 添加计时器引用
  const timerRef = useRef(null);

  // 按钮顺序数组，用于确定下一个要激活的按钮
  const buttonSequence = ['send', 'split', 'gift'];

  // 自动切换到下一个按钮的函数
  const switchToNextButton = () => {

    // 改变活跃按钮
    setActiveButton(currentButton => {
      const currentIndex = buttonSequence.indexOf(currentButton);
      const nextIndex = (currentIndex + 1) % buttonSequence.length;
      return buttonSequence[nextIndex];
    });
  };

  // 重置计时器的函数
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(switchToNextButton, 10 * 1000);
  }, []);

  // 组件挂载时设置自动切换
  useEffect(() => {
    resetTimer();

    // 组件卸载时清除计时器
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  // 当activeButton变化时，重置计时器
  useEffect(() => {
    resetTimer();
  }, [activeButton, resetTimer]);

  return (
    <section className='use-case-section'>
      {/* 三个背景图片层，绝对定位重叠 */}
      <div
        className={`background-image send-image ${activeButton === 'send' ? 'active' : ''}`}
      >
        <img src='/assets/images/features/send-money.png' alt='Send money' />
      </div>
      <div
        className={`background-image split-image ${activeButton === 'split' ? 'active' : ''}`}
      >
        <img src='/assets/images/features/split-bills.png' alt='Split bill' />
      </div>
      <div
        className={`background-image gift-image ${activeButton === 'gift' ? 'active' : ''}`}
      >
        <img src='/assets/images/features/gift-cards.png' alt='Gift money' />
      </div>

      <div className='use-case-content'>
        <div className='use-case-text'>
          {/* <div className='use-case-text-wrap'> */}
          {dataList.map((item, index) => (
            <span key={index} className={`use-case-text-item ${activeButton === buttonSequence[index] ? 'active' : ''}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Button className='block-center'>{item.buttonText}</Button>
            </span>
          ))}
          {/* </div> */}
        </div>

        <div className='use-case-notification'>
          <div className='use-case-notification-warp'>
            {dataList.map((item, index) => (
              <div key={index} className={`use-case-notification-contain ${activeButton === buttonSequence[index] ? 'active' : ''}`}>
                <picture>
                  <img src={item.imageUrl} alt='' />
                </picture>
              </div>
            ))}

          </div>
        </div>

        <AnimatedButtonGroup
          items={['Send', 'Split', 'Gift']}
          activeItem={activeButton}
          onItemChange={setActiveButton}
          variant='light'
          animationDuration={10000}
          className='action-buttons'
        />
      </div>
    </section>
  );
};

export default UseCaseSection;
