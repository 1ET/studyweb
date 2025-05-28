'use client';

import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import HeroSection from './home/HeroSection/HeroSection';
import FeaturesSection from './home/ExchangeRatesSection/ExchangeRatesSection';
import CardsSection from './home/CardSelectionSection/CardSelectionSection';
import MoneyTransferSection from './home/UseCaseSection/UseCaseSection';
import InvestmentsSection from './home/MoneyTransferSection/MoneyTransferSection';
import AppFeaturesSection from './home/SecuritySection/SecuritySection';
import PricingSection from './home/TradingScenarioSection/TradingScenarioSection';
import GetRevolut from './home/JoinSection/JoinSection';

const MainContent = ({ isScrolled }) => {
  const { isPc } = useResponsive();

  return (
    <main>
      <HeroSection isScrolled={isScrolled} />
      {/* 只在PC端显示白色间隔和CardsSection */}
      {isPc && (
        <>
          <div style={{ height: '100px', width: '100%', background: '#fff'}} />
        </>
      )}
      <CardsSection />
      <FeaturesSection />
      <MoneyTransferSection />
      <InvestmentsSection />
      <AppFeaturesSection />
      <PricingSection />
      <GetRevolut />
    </main>
  );
};

export default MainContent;
