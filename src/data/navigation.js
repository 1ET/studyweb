// 导航相关数据
export const mainNavigation = [
  {
    id: 'personal',
    label: 'Personal',
    href: '/personal',
    children: [
      { id: 'accounts', label: 'Accounts', href: '/personal/accounts' },
      { id: 'cards', label: 'Cards', href: '/personal/cards' },
      { id: 'payments', label: 'Payments', href: '/personal/payments' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    href: '/business',
    children: [
      { id: 'business-accounts', label: 'Business Accounts', href: '/business/accounts' },
      { id: 'business-cards', label: 'Business Cards', href: '/business/cards' },
    ],
  },
  {
    id: 'revolut-x',
    label: 'Revolut X',
    href: '/revolut-x',
  },
  {
    id: 'help',
    label: 'Help',
    href: '/help',
  },
];

export const mobileNavigation = [
  { id: 'home', label: 'Home', href: '/', icon: 'home' },
  { id: 'accounts', label: 'Accounts', href: '/accounts', icon: 'wallet' },
  { id: 'cards', label: 'Cards', href: '/cards', icon: 'credit-card' },
  { id: 'payments', label: 'Payments', href: '/payments', icon: 'send' },
  { id: 'more', label: 'More', href: '/more', icon: 'menu' },
]; 