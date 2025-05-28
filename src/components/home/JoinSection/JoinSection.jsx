'use client';

import React from 'react';
import './JoinSection.scss';
import Button from '@/components/common/Button/Button';

const JoinSection = () => {
  return (
    <section className='join-section'>
      <div className='join-section-container'>
        <h2 className='join-section-title'>
          JOIN THE 55+ MILLION USING REVOLUT
        </h2>
        
        <p className='join-section-description'>
          Voted &apos;Best Travel Wallet&apos; at the annual TripZilla Excellence Awards 2024, honouring the most 
          outstanding brands in travel.
        </p>
        
        <div className='join-section-action'>
          <Button variant='dark' className='block-center'>Get Revolut</Button>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;