'use client';

import React from 'react';
import './ExchangeRatesSection.scss';
import Button from '../../common/Button/Button';
import { useResponsive } from '@/hooks/useResponsive';

const ExchangeRatesSection = () => {
  const { isPc } = useResponsive();

  return (
    <section className='exchange-rates-section'>
      <div className='exchange-rates-section-container'>
        <div className='exchange-rates-content'>
          <div className='exchange-rates-text'>
            <h2>GREAT EXCHANGE RATES</h2>
            <p>
              Spend in 150+ countries and stash in 33+ currencies. Join
              50+ million others using Revolut to convert money and
              spend internationally.
            </p>
            <Button variant='dark' className={isPc ? '' : 'block-center'}>Try it out</Button>
          </div>

          <div className='exchange-rates-image'>
            <div className='exchange-rates-image-wrapper'>
              <div className='exchange-rates-image-wrapper-aspect'>
                <img src='/assets/images/ui/exchange-rates.png' alt='Currency Exchange' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangeRatesSection;
