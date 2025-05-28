'use client';

import React, { useState, useEffect } from 'react';
import './AppFeaturesSection.scss';
import { appFeatures, featuresContent } from '@/data';

const AppFeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // 使用数据文件中的数据
  const features = appFeatures;
  const content = featuresContent;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className='app-features-section'>
      <div className='app-features-section-container'>
        <div className='features-content'>
          <div className='features-text'>
            <h2>{content.title}</h2>
            <div className='features-list'>
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-item ${index === activeFeature ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className='feature-header'>
                    <div 
                      className='feature-indicator'
                      style={{ backgroundColor: feature.color }}
                    />
                    <h3>{feature.title}</h3>
                  </div>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className='features-visual'>
            <div className='phone-mockup'>
              <img 
                src={features[activeFeature].image} 
                alt={features[activeFeature].title}
                className='feature-image'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection; 