'use client';

import React from 'react';
import './CountryIcon.scss';

// 国家代码到文件名的映射
const getCountryFileName = (code) => {
  const countryMap = {
    'DK': 'denmark',
    'EE': 'estonia', 
    'FR': 'france',
    'SG': 'singapore',
  };
  return (countryMap[code] || 'singapore') + '.webp';
};

/**
 * 国家图标组件
 * @param {Object} props - 组件属性
 * @param {string} props.countryCode - 国家代码 (例如: 'SG', 'FR', 'DK', 'EE')
 * @param {string} [props.size='18px'] - 图标大小
 * @param {string} [props.className] - 额外的CSS类名
 * @param {React.ReactNode} [props.children] - 子元素，通常是国家名称
 * @param {Object} [props.style] - 额外的内联样式
 */
const CountryIcon = ({ 
  countryCode, 
  size = '18px', 
  className = '', 
  children,
  style = {},
  ...props 
}) => {
  // 确保国家代码转为大写
  const code = countryCode?.toUpperCase() || 'SG';
  const fileName = getCountryFileName(code);
  
  return (
    <div className={`country-icon-container ${className}`} style={style} {...props}>
      <span 
        className='country-flag' 
        style={{ 
          width: size, 
          height: size,
          ...style,
        }}
      >
        <img 
          src={`/assets/images/countries/webp/${fileName}`} 
          alt={`${code} flag`} 
          onError={(e) => {
            // 图片加载失败时使用默认图片
            e.target.src = '/assets/images/countries/webp/singapore.webp';
          }}
        />
      </span>
      {children && <span className='country-name'>{children}</span>}
    </div>
  );
};

export default CountryIcon;