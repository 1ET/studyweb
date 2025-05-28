'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TradingScenarioSection.scss';
import Button from '../../common/Button/Button';
import AnimatedButtonGroup from '@/components/common/AnimatedButtonGroup/AnimatedButtonGroup';

const TradingScenarioSection = () => {
  // 添加状态来跟踪当前激活的选项卡
  const [activeTab, setActiveTab] = useState('stocks'); // 默认显示商品选项卡

  // 添加计时器引用
  const timerRef = useRef(null);

  // 选项卡顺序数组，用于确定下一个要激活的选项卡
  const tabSequence = ['stocks', 'crypto', 'commodities'];

  // 选项卡内容配置
  const tradingData = [
    {
      id: 'stocks',
      title: 'Stocks',
      description: 'Buy and sell thousands of US and European stocks commission-free.',
      buttonText: 'Start investing',
      video: '/assets/videos/stocks.mp4',
      poster: '/assets/images/features/trading-stocks-poster.jpg',
    },
    {
      id: 'crypto',
      title: 'Crypto',
      description: 'Trade 80+ cryptocurrencies with competitive fees.',
      buttonText: 'Buy crypto',
      video: '/assets/videos/crypto.mp4',
      poster: '/assets/images/features/trading-crypto-poster.jpg',
    },
    {
      id: 'commodities',
      title: 'Commodities',
      description: 'Invest in gold, silver, and other precious metals.',
      buttonText: 'Explore commodities',
      video: '/assets/videos/commodities.mp4',
      poster: '/assets/images/features/trading-commodities-poster.jpg',
    },
  ];

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

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
  }, [activeTab, resetTimer]);

  return (
    <section className='trading-scenario-section'>
      <div className='trading-scenario-section-container'>
        <div className='investment-content'>
          {/* 为每个选项卡创建内容区块，根据activeTab显示或隐藏 */}
          {tradingData.map((data) => (
            <div
              key={data.id}
              className={`investment-block ${activeTab === data.id ? 'active' : ''}`}
            >
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <Button variant='dark' className='block-center'>{data.buttonText}</Button>
            </div>
          ))}
        </div>

        <div className='investment-video'>
          {/* 为每个选项卡创建图片，根据activeTab显示或隐藏 */}
          {tradingData.map((data) => (
            <div
              key={data.id}
              className={`video-container ${activeTab === data.id ? 'active' : ''}`}
            >
              <div className='investment-video-container'>
                <video
                  src={data.video}
                  autoPlay
                  muted
                  loop
                />
              </div>
            </div>
          ))}
        </div>

        <div className='investment-tabs'>
          <AnimatedButtonGroup
            items={[
              { label: 'Stocks', value: 'stocks' },
              { label: 'Crypto', value: 'crypto' },
              { label: 'Commodities', value: 'commodities' },
            ]}
            activeItem={activeTab}
            onItemChange={setActiveTab}
            variant='dark'
            animationDuration={10000}
            className='investment-tabs'
          />
        </div>
      </div>
    </section>
  );
};

export default TradingScenarioSection;
