'use client';

import React from 'react';
import Link from 'next/link';
import './FooterNavSection.scss';

// 定义底部导航结构
const footerNavigation = [
  [
    {
      title: 'Accounts',
      links: [
        { name: 'Joint Account', href: '#' },
        { name: 'Revolut for Under 18s', href: '#' },
      ],
    },
    {
      title: 'Daily Finances',
      links: [
        { name: 'Cards', href: '#' },
        { name: 'International Transfers', href: '#' },
        { name: 'Send & Receive', href: '#' },
        { name: 'Money Management', href: '#' },
      ],
    },
  ],
  [
    {
      title: 'Portfolio',
      links: [
        { name: 'Crypto', href: '#' },
        { name: 'Stocks', href: '#' },
        { name: 'Commodities', href: '#' },
      ],
    },
    {
      title: 'Lifestyle',
      links: [
        { name: 'Shops', href: '#' },
        { name: 'Donations', href: '#' },
        { name: 'eSIM Data Plans', href: '#' },
      ],
    },

  ],
  [

    {
      title: 'Security & Protection',
      links: [
        { name: 'How We Protect Your Money', href: '#' },
        { name: 'Learn About Fraud & Scams', href: '#' },
        { name: 'Security Bugs', href: '#' },
        { name: 'Report Lost Device', href: '#' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Help Centre', href: '#' },
        { name: 'System Status', href: '#' },
      ],
    },
  ],
  [

    {
      title: 'Plans',
      links: [
        { name: 'Standard', href: '#' },
        { name: 'Premium', href: '#' },
        { name: 'Metal', href: '#' },
        { name: 'Compare Plans', href: '#' },
      ],
    },
  ],
  [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Culture', href: '#' },
        { name: 'Diversity & Inclusion', href: '#' },
        { name: 'Code of Conduct', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Working at Revolut', href: '#' },
        { name: 'Relocation with Revolut', href: '#' },
        { name: 'Talent Programmes', href: '#' },
        { name: 'News & Media', href: '#' },
        { name: 'Annual Report 2024', href: '#' },
        { name: 'Reports and results', href: '#' },
        { name: 'Affiliates', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
  ],
];
const FooterNavSection = () => {
  return (
    <section className='footer-navigation'>
      <div className='footer-navigation-container'>
        <div className='footer-links-grid'>
          {footerNavigation.map((columnGroup, groupIndex) => (
            <div className='footer-column-group' key={groupIndex}>
              {columnGroup.map((category) => (
                <div className='footer-links-column' key={category.title}>
                  <h4 className='footer-category'>{category.title}</h4>
                  <ul className='footer-links-list'>
                    {category.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className='footer-link'>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterNavSection;