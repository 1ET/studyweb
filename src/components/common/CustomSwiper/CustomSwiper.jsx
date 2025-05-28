'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './CustomSwiper.scss';

const CustomSwiper = ({
  slides,
  activeIndex,
  onSlideChange,
  onSwiperInit,
  renderSlide,
  className = '',
  swiperProps = {},
}) => {
  // 默认Swiper配置
  const defaultProps = {
    slidesPerView: 3,
    spaceBetween: 10,
    allowTouchMove: true,
    simulateTouch: true,
    grabCursor: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
      el: '.swiper-pagination',
    },
    centeredSlides: true,
    loop: true,
    modules: [Pagination],
  };

  // 合并配置
  const finalSwiperProps = {
    ...defaultProps,
    ...swiperProps,
    modules: [
      ...(defaultProps.modules || []), 
      ...(swiperProps.modules || []),
    ].filter((module, index, arr) => arr.indexOf(module) === index),
    onSlideChange,
    onSwiper: onSwiperInit,
    className: `custom-swiper ${className}`,
  };

  return (
    <div className='swiper-container'>
      <Swiper {...finalSwiperProps}>
        {slides.map((slide, index) => (
          <SwiperSlide key={typeof slide.id !== 'undefined' ? slide.id : index} className='custom-slide'>
            {renderSlide(slide, index, index === activeIndex)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-pagination'></div>
    </div>
  );
};

export default CustomSwiper; 