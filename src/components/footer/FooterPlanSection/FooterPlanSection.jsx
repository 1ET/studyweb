'use client';

import React from 'react';
import './FooterPlanSection.scss';
import Button from '../../common/Button/Button';

const FooterPlanSection = () => {
  return (
    <section className='plans-section'>
      <div className='plans-section-container'>
        <h2 className='section-title'>Choose your plan</h2>

        <div className='plans-container'>
          <div className='plan-card'>
            <h3 className='plan-name'>Standard</h3>
            <p className='plan-price'>Free</p>
            <p className='plan-description'>
              Whether you&apos;re looking to save money spending abroad or sticking to your budget with our built-in budgeting, get more from your money with our Standard account
            </p>
            <div className='arrow-icon'>
              <span></span>
            </div>
          </div>

          <div className='plan-card'>
            <h3 className='plan-name'>Premium</h3>
            <p className='plan-price'>S$10.99/month</p>
            <p className='plan-description'>
                            Upgrade to a global lifestyle. Get the confidence to spend and save smarter across the globe
            </p>
            <div className='arrow-icon'>
              <span></span>
            </div>
          </div>

          <div className='plan-card'>
            <h3 className='plan-name'>Metal</h3>
            <p className='plan-price'>S$21.99/month</p>
            <p className='plan-description'>
                            Get ultimate power with the full package. Stand out with an exclusive contactless Metal card, earn up to 1.5% cashback, and much more
            </p>
            <div className='arrow-icon'>
              <span></span>
            </div>
          </div>
        </div>

        <div className='footer-cta'>
          <h3 className='cta-subheading'>What are you waiting for?</h3>
          <h2 className='cta-heading'>Change the way you money</h2>
          <Button>Learn more</Button>
        </div>
      </div>
    </section>
  );
};

export default FooterPlanSection;