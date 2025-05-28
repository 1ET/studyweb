'use client';

import React from 'react';
import Link from 'next/link';
import './FooterInfoSection.scss';
import Logo from '../../common/Logo/Logo';
import CountryIcon from '../../common/CountryIcon/CountryIcon';

// 社交媒体链接
const socialLinks = [
  { name: 'Facebook', icon: '/assets/images/icons/svg/social/facebook.svg', url: 'https://facebook.com/revolut' },
  { name: 'Instagram', icon: '/assets/images/icons/svg/social/instagram.svg', url: 'https://instagram.com/revolut' },
  { name: 'Twitter', icon: '/assets/images/icons/svg/social/twitter.svg', url: 'https://twitter.com/revolut' },
  { name: 'LinkedIn', icon: '/assets/images/icons/svg/social/linkedin.svg', url: 'https://www.linkedin.com/company/revolut' },
  { name: 'TikTok', icon: '/assets/images/icons/svg/social/tiktok.svg', url: 'https://www.tiktok.com/@revolutapp' },
];

// 法律链接
const legalLinks = [
  { name: 'Website Terms', url: '#' },
  { name: 'Legal Agreements', url: '#' },
  { name: 'Privacy', url: '#' },
  { name: 'Complaints', url: '#' },
  { name: 'Customer Vulnerability', url: '#' },
];

// 国际汇款链接
const transferLinks = [
  { name: 'Send money to Malaysia', url: '/send-money/malaysia' },
  { name: 'Send money to Indonesia', url: '/send-money/indonesia' },
  { name: 'Send money to the UK', url: '/send-money/uk' },
  { name: 'Send money to the USA', url: '/send-money/usa' },
  { name: 'Send money to Thailand', url: '/send-money/thailand' },
  { name: 'Send money to India', url: '/send-money/india' },
  { name: 'Send money to Vietnam', url: '/send-money/vietnam' },
  { name: 'Send money to Singapore from the USA', url: '/send-money/usa-to-singapore' },
];

const FooterInfoSection = () => {

  return (
    <section className='navulli-section'>
      <div className='navulli-section-container'>
        {/* 顶部区域：Logo和社交媒体链接 */}
        <div className='navulli-top'>
          <Link href='/'>
            <Logo fontSize='1rem' color='white' />
          </Link>

          <div className='social-links'>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
                className='social-link'
                aria-label={social.name}
              >
                <span
                  style={{
                    'mask-image': `url(${social.icon})`,
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* 国家选择和法律链接 */}
        <div className='navulli-legal-menu'>
          <div className='country-selector'>
            <CountryIcon countryCode='SG' size='16px' />
            <span className='country-name'>Singapore</span>
          </div>

          <div className='legal-links'>
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className='legal-link'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 版权和公司信息 */}
        <div className='navulli-company-info'>
          <p className='copyright'>© Revolut Ltd 2025</p>
          <div className='legal-disclosure'>
            <p>
              Revolut Technologies Singapore Pte. Ltd. (&quot;RTSPL&quot;) is registered in Singapore with Unique Entity Number 201721013G. RTSPL&apos;s registered address is 36 Robinson Road, #20-01, City House, Singapore 068877. RTSPL is regulated as a Major Payment Institution (licence no. PS20200326) by the Monetary Authority of Singapore (&quot;MAS&quot;). For more details, you can refer to the MAS website <a href='https://www.mas.gov.sg' className='inline-link'>here</a>. RTSPL provides insurance-related products as a registered Corporate Agent with the Agents&apos; Registration Board (C005604-000). The travel insurance policy is underwritten by Tokio Marine Insurance Singapore Ltd. with assistance services provided by AWP Services Singapore Pte. Ltd. Consumer advisory: Consumers (users) are advised to read the terms and conditions carefully.
            </p>
            <p>
              Revolut Securities Singapore Pte. Ltd. (&quot;RSSPL&quot;) is registered in Singapore with Unique Entity Number 202102782K. RSSPL&apos;s registered address is 36 Robinson Road, #20-01, City House, Singapore 068877. RSSPL is regulated as a Capital Markets Services licensee by the Monetary Authority of Singapore (&quot;MAS&quot;). For more details, you can refer to the MAS website <a href='https://www.mas.gov.sg' className='inline-link'>here</a>.
            </p>
          </div>
        </div>

        {/* 联系方式 */}
        <div className='navulli-contact'>
          <p>
            If you wish to discuss data protection matters, please contact our Data Protection Officer at dpo@revolut.com. If you wish to provide feedback on our service, please email us at formalcomplaints@revolut.com
          </p>
        </div>

        {/* 国际汇款链接 */}
        <div className='navulli-transfers'>
          <div className='transfer-links'>
            <Link href='#' className='transfer-title'>
              Money-Transfer:
            </Link>
            {transferLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link href={link.url} className='transfer-link'>
                  {link.name}
                </Link>
                {index < transferLinks.length - 1 && <span className='separator'>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterInfoSection; 