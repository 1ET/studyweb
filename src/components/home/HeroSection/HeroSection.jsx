'use client';

import React, { useState } from 'react';
import { useCustomScroll } from '@/hooks/useCustomScroll';
import { useResponsive } from '@/hooks/useResponsive';
import Button from '../../common/Button/Button';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSection.scss';
import CustomSwiper from '@/components/common/CustomSwiper/CustomSwiper';
import Dialog from '@/components/common/Dialog/Dialog';
import useDialog from '@/hooks/useDialog';
import CountryIcon from '@/components/common/CountryIcon/CountryIcon';
import { heroCardData, heroContent, appDownloadDialog } from '@/data';

const HeroSection = () => {
  const { isScrolled } = useCustomScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(appDownloadDialog.countryCodes[0].code);
  const { isPc } = useResponsive();

  // 使用数据文件中的数据
  const cardData = heroCardData;
  const content = heroContent;
  const dialogData = appDownloadDialog;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleCardClick = (index) => {
    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  const renderCard = (card, index, isActive) => (
    <div
      className={`spending-card card-${card.id} ${isActive ? 'active-card' : ''}`}
      onClick={() => handleCardClick(index)}
      style={{ cursor: 'pointer' }}
    >
      <div className='card-background'>
        <img
          src={card.background}
          alt={card.alt}
          draggable='false'
          style={{
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
        <span className='card-overlay'></span>
      </div>
    </div>
  );

  return (
    <>
      <section className='hero-section'>
        <div className={`hero-section-container-first ${isPc ? isScrolled  ? 'fade-out' : 'fade-in' : ''}`}>
          <div className='hero-bg'>
            <picture>
              <img src='/assets/images/ui/background.png' alt='Revolut' />
            </picture>
            <picture>
              <img className='hero-human' src='/assets/images/ui/human-avatar.png' alt='Revolut' />
            </picture>
          </div>
          <div className='hero-content'>
            <h1>
              <span className='hero-title-line'>{content.firstSection.title}</span>
            </h1>
            <p>{content.firstSection.description}</p>
            <div className='hero-actions'>
              <Button variant='dark' onClick={openDialog}>
                {content.firstSection.cta}
              </Button>
            </div>
          </div>
        </div>

        <div className={`hero-section-container-second ${isPc ? isScrolled  ? 'fade-in' : 'fade-out' : 'fade-in'}`}>
          <div className='hero-content'>
            <h1>{content.secondSection.title}</h1>
            <p>{content.secondSection.description}</p>
            <Button variant='dark' onClick={openDialog} className='block-center'>
              {content.secondSection.cta}
            </Button>

            {/* Swiper 轮播图 */}
            <div className='spending-cards-swiper'>
              <CustomSwiper
                slides={cardData}
                activeIndex={activeIndex}
                onSlideChange={handleSlideChange}
                onSwiperInit={setSwiper}
                renderSlide={renderCard}
                className='spending-swiper'
                swiperProps={{
                  spaceBetween: 10,
                  pagination: {
                    clickable: true,
                    dynamicBullets: true,
                  },
                  modules: [Pagination],
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* App 下载对话框 */}
      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        size='medium'
        hideHeader={true}
        hideFooter={true}
        screenCloseButton={true}
        className='app-download-dialog'
      >
        <div className='app-download-content'>
          {/* 标题 */}
          <div className='app-download-header'>
            <h2 className='app-download-title'>{dialogData.title}</h2>
            <p className='app-download-subtitle'>{dialogData.subtitle}</p>
          </div>

          {/* QR 码区域 */}
          <div className='qr-code-section'>
            <div className='qr-code-container'>
              <img src={dialogData.qrCode} alt='QR Code' className='qr-code-image' />
            </div>
          </div>

          {/* 分隔线和文字 */}
          <div className='divider-section'>
            <span className='divider-text'>{dialogData.dividerText}</span>
          </div>

          {/* 手机号码输入区域 */}
          <div className='phone-input-section'>
            <div className='phone-input-container'>
              <div className='country-code-selector'>
                <CountryIcon countryCode={countryCode} />
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className='country-code-select'
                >
                  {dialogData.countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type='tel'
                placeholder={dialogData.phoneInputPlaceholder}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='phone-number-input'
              />

              <button className='send-sms-button' type='button'>
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default HeroSection;
