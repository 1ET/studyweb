'use client';

import React from 'react';
import './Button.scss';

const Button = ({ 
  className, 
  variant = 'primary',
  fontSize = '1em',
  children, 
  ...props 
}) => {
  // 使用BEM命名规范
  const btnVariant = `btn-${variant}`;
  
  return (
    <a 
      className={`btn ${btnVariant} ${className || ''}`} 
      style={{ fontSize }}
      {...props}
    >
      <span className='btn__layer'></span>
      <span className='btn__text'>
        {children}
      </span>
    </a>
  );
};

export default Button;