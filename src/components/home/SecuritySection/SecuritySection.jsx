'use client';

import React, { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SecuritySection.scss';
import CustomSwiper from '@/components/common/CustomSwiper/CustomSwiper';
import { useResponsive } from '@/hooks/useResponsive';
import { securityFeatures, securityContent } from '@/data';

const SecuritySection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const { isPc } = useResponsive();

  // 使用数据文件中的数据
  const features = securityFeatures;
  const content = securityContent;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const renderSecurityFeature = (feature, index) => {
    const isActive = index === currentSlide;

    return (
      <article
        className={`security-feature ${index === 1 ? 'security-feature--highlighted' : ''} ${isActive ? 'active-card' : ''}`}
        aria-labelledby={`security-feature-title-${feature.id}`}
      >
        <header className='security-feature__content'>
          <h3
            id={`security-feature-title-${feature.id}`}
            className='security-feature__title'
          >
            {feature.title}
          </h3>
          {feature.description && (
            <p className='security-feature__description'>
              {feature.description}
            </p>
          )}
        </header>

        <figure className='security-feature__media'>
          <img
            src={feature.image}
            alt={feature.alt}
            loading='lazy'
            className='security-feature__image'
          />
        </figure>
      </article>
    );
  };

  return (
    <section
      className='security-section'
      aria-labelledby='security-section-title'
      role='region'
    >
      <div className='security-section__container'>
        <header className='security-section__header'>
          <h2
            id='security-section-title'
            className='security-section__title'
          >
            {content.title}
          </h2>
          <p className='security-section__description'>
            {content.description}
          </p>
        </header>

        {isMounted && (
          <div
            className={`security-section__features ${isPc ? 'security-section__features--grid' : 'security-section__features--carousel'}`}
            role='group'
            aria-label='Security features'
          >
            <CustomSwiper
              slides={features}
              renderSlide={(feature, index) => renderSecurityFeature(feature, index)}
              onSlideChange={handleSlideChange}
              className='security-section__swiper'
              swiperProps={{
                modules: [Autoplay, Pagination],
                spaceBetween: 10,
                pagination: {
                  clickable: true,
                  dynamicBullets: true,
                },
              }}
            />

            {isPc && (
              <div className='security-section__controls'>
                <div
                  className='security-section__pagination'
                  role='tablist'
                  aria-label='Security features navigation'
                >
                </div>

                <div className='security-section__navigation'>
                  <button
                    className='security-section__nav-prev'
                    aria-label='Previous security feature'
                    type='button'
                  >
                  </button>
                  <button
                    className='security-section__nav-next'
                    aria-label='Next security feature'
                    type='button'
                  >
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SecuritySection;
