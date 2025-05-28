// Footer 相关数据
export const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { id: 'personal', label: 'Personal', href: '/personal' },
      { id: 'business', label: 'Business', href: '/business' },
      { id: 'revolut-x', label: 'Revolut X', href: '/revolut-x' },
      { id: 'revolut-pro', label: 'Revolut Pro', href: '/pro' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { id: 'about', label: 'About', href: '/about' },
      { id: 'careers', label: 'Careers', href: '/careers' },
      { id: 'news', label: 'News', href: '/news' },
      { id: 'investors', label: 'Investors', href: '/investors' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { id: 'help', label: 'Help Centre', href: '/help' },
      { id: 'community', label: 'Community', href: '/community' },
      { id: 'contact', label: 'Contact', href: '/contact' },
      { id: 'status', label: 'System Status', href: '/status' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { id: 'terms', label: 'Terms & Conditions', href: '/legal/terms' },
      { id: 'privacy', label: 'Privacy Policy', href: '/legal/privacy' },
      { id: 'cookies', label: 'Cookie Policy', href: '/legal/cookies' },
      { id: 'fees', label: 'Fees', href: '/legal/fees' },
    ],
  },
};

export const footerSocial = [
  { id: 'twitter', label: 'Twitter', href: 'https://twitter.com/revolut', icon: 'twitter' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/revolut', icon: 'facebook' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/revolut', icon: 'instagram' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/revolut', icon: 'linkedin' },
];

export const footerContent = {
  copyright: '© 2024 Revolut Ltd. All rights reserved.',
  description: 'Revolut Ltd is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (Firm Reference 900562) for the issuing of electronic money and payment instruments.',
  appStores: [
    {
      id: 'app-store',
      name: 'App Store',
      href: 'https://apps.apple.com/app/revolut/id932493382',
      image: '/assets/images/app-stores/app-store.png',
    },
    {
      id: 'google-play',
      name: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.revolut.revolut',
      image: '/assets/images/app-stores/google-play.png',
    },
  ],
}; 