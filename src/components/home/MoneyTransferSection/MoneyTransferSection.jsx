'use client';

import React, { useEffect, useRef } from 'react';
import './MoneyTransferSection.scss';
import Button from '../../common/Button/Button';
import { useResponsive } from '@/hooks/useResponsive';

const MoneyTransferSection = () => {
  const { isPc } = useResponsive();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('自动播放被阻止:', error);
      });
    }
  }, []);

  return (
    <section className='money-transfer-section'>
      <div className='money-transfer-section-container'>
        <div className='money-transfer-content'>
          <div className='money-transfer-text'>
            <h2>AND SEND ACROSS THE GLOBE TOO</h2>
            <p>
              Whether it&apos;s Malaysia or the UK, you can transfer there —
              really, really fast. The rates are as good as you&apos;ve heard.
            </p>
            <Button variant='dark' className={isPc ? '' : 'block-center'}>See how to send it far</Button>
          </div>

          <div className='money-transfer-image'>
            <div className='money-transfer-image-wrapper'>
              <div className='money-transfer-image-wrapper-aspect'>
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  className='money-transfer-video'
                >
                  <source src='/assets/videos/send-to-global.mp4' type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyTransferSection;
