'use client';

import React, { useEffect, useRef } from 'react';
import './CardSelectionSection.scss';
import Button from '../../common/Button/Button';

const CardSelectionSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('自动播放被阻止:', error);
      });
    }
  }, []);

  return (
    <section className='card-selection-section'>
      <div className='card-selection-section-container'>
        <div className='card-selection-content'>
          <h2>CHECK OUT THAT CARD</h2>
          <p>Get the one that matches your vibe. Fees may apply.</p>

          <Button variant='primary' className='block-center'>Choose your card</Button>
        </div>

        <div className='card-selection-video-container'>
          <div className='card-selection-video-wrapper'>
            <div className='card-selection-video-inner'>
              <div className='card-selection-video-aspect'>
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  className='cards-video'
                >
                  <source src='/assets/videos/choose-card.mp4' type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSelectionSection;
