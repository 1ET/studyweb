'use client';

import React, { useState } from 'react';
import Dialog from '../Dialog/Dialog';
import './AppDownloadDialog.scss';

const AppDownloadDialog = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+65');

  const handleSendSMS = () => {
    if (phoneNumber.trim()) {
      console.log(`Sending SMS to ${countryCode}${phoneNumber}`);
      // 这里可以添加发送短信的逻辑
      alert(`下载链接已发送到 ${countryCode}${phoneNumber}`);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size='medium'
      className='app-download-dialog'
      showCloseButton={true}
      closeOnOverlayClick={true}
    >
      <div className='app-download-content'>
        {/* 标题 */}
        <div className='app-download-header'>
          <h1 className='app-download-title'>GET THE REVOLUT APP</h1>
          <p className='app-download-subtitle'>Scan the QR code to download the app</p>
        </div>

        {/* QR 码区域 */}
        <div className='qr-code-section'>
          <div className='qr-code-placeholder'>
            {/* 这里可以放置真实的 QR 码 */}
            <div className='qr-code-mock'>
              <div className='qr-pattern'>
                {/* 模拟 QR 码图案 */}
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i} className={`qr-dot ${Math.random() > 0.5 ? 'filled' : ''}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 分隔线和文字 */}
        <div className='divider-section'>
          <div className='divider-line'></div>
          <span className='divider-text'>or get a download link via SMS</span>
          <div className='divider-line'></div>
        </div>

        {/* 手机号码输入区域 */}
        <div className='phone-input-section'>
          <div className='phone-input-container'>
            <div className='country-code-selector'>
              <div className='flag-icon'>🇸🇬</div>
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className='country-code-select'
              >
                <option value='+65'>+65</option>
                <option value='+86'>+86</option>
                <option value='+1'>+1</option>
                <option value='+44'>+44</option>
                <option value='+81'>+81</option>
              </select>
            </div>
            
            <input
              type='tel'
              placeholder='Mobile number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='phone-number-input'
            />
            
            <button 
              onClick={handleSendSMS}
              className='send-sms-button'
              disabled={!phoneNumber.trim()}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 应用商店链接 */}
        <div className='app-store-links'>
          <a href='#' className='app-store-link'>
            <img src='/api/placeholder/120/40' alt='Download on App Store' />
          </a>
          <a href='#' className='app-store-link'>
            <img src='/api/placeholder/120/40' alt='Get it on Google Play' />
          </a>
        </div>
      </div>
    </Dialog>
  );
};

export default AppDownloadDialog; 