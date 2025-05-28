// 统一的导航数据结构 - 将导航项和菜单内容关联在一起
export const navigationData = [
  {
    id: 'personal',
    label: 'Personal',
    href: '#personal',
    hasSubmenu: true,
    submenu: {
      layoutType: 'grid',
      title: {
        text: 'Discover Revolut',
        icon: '→',
        href: '#discover',
      },
      categories: [
        {
          title: 'Accounts',
          items: [
            { label: 'Joint Account', href: '#joint-account' },
            { label: 'Revolut for Under 18s', href: '#under-18s' },
          ],
        },
        {
          title: 'Daily Finances',
          items: [
            { label: 'Cards', href: '#cards' },
            { label: 'International Transfers', href: '#transfers' },
            { label: 'Send & Receive', href: '#send-receive' },
            { label: 'Money Management', href: '#money-management' },
          ],
        },
        {
          title: 'Portfolio',
          items: [
            { label: 'Crypto', href: '#crypto' },
            { label: 'Stocks', href: '#stocks' },
            { label: 'Commodities', href: '#commodities' },
          ],
        },
        {
          title: 'Lifestyle',
          items: [
            { label: 'Shops', href: '#shops' },
            { label: 'Donations', href: '#donations' },
            { label: 'eSIM Data Plans', href: '#esim' },
          ],
        },
        {
          title: 'Security & Protection',
          items: [
            { label: 'How We Protect Your Money', href: '#protect-money' },
            { label: 'Learn About Fraud & Scams', href: '#fraud' },
            { label: 'Report Lost Device', href: '#lost-device' },
          ],
        },
        {
          title: 'Help',
          items: [
            { label: 'Help Centre', href: '#help-centre' },
            { label: 'System Status', href: '#system-status' },
          ],
        },
        {
          title: 'Plans',
          items: [
            { label: 'Standard', href: '#standard' },
            { label: 'Premium', href: '#premium' },
            { label: 'Metal', href: '#metal' },
            { label: 'Compare Plans', href: '#compare-plans' },
          ],
        },
      ],
    },
  },
  {
    id: 'business',
    label: 'Business',
    href: '#business',
    hasSubmenu: true,
    submenu: {
      layoutType: 'grid',
      title: {
        text: 'Discover Revolut Business',
        icon: '→',
        href: '#business',
      },
      categories: [
        {
          title: 'Essentials',
          items: [
            { label: 'Multi-Currency Account', href: '#multi-currency' },
            { label: 'Expense Management', href: '#expense' },
            { label: 'Corporate Cards', href: '#corporate-cards' },
            { label: 'Money Transfers', href: '#transfers' },
          ],
        },
        {
          title: 'Treasury',
          items: [
            { label: 'Currency Exchange', href: '#currency-exchange' },
          ],
        },
        {
          title: 'Platform',
          items: [
            { label: 'Analytics', href: '#analytics' },
            { label: 'Integrations', href: '#integrations' },
            { label: 'Rewards', href: '#rewards' },
          ],
        },
        {
          title: 'Help & Resources',
          items: [
            { label: 'Customer Help', href: '#customer-help' },
            { label: 'Business Resources', href: '#business-resources' },
            { label: 'How we protect your money', href: '#business-protection' },
            { label: 'System Status', href: '#business-status' },
          ],
        },
        {
          title: 'Plans',
          items: [
            { label: 'Business Account Pricing', href: '#business-pricing' },
          ],
        },
      ],
    },
  },
  {
    id: 'revolut-18',
    label: 'Revolut <18',
    href: '#revolut-18',
    hasSubmenu: true,
    submenu: {
      layoutType: 'list',
      title: {
        text: '',
        icon: '',
        href: '',
      },
      categories: [
        {
          title: null,
          items: [
            { label: 'Discover Revolut <18', href: '#discover-18' },
          ],
        },
        {
          title: null,
          items: [
            { label: 'Revolut for Under 18s', href: '#under-18s' },
          ],
        },
        {
          title: null,
          items: [
            { label: 'Help Centre <18', href: '#help-18' },
          ],
        },
      ],
    },
  },
  {
    id: 'company',
    label: 'Company',
    href: '#company',
    hasSubmenu: true,
    submenu: {
      layoutType: 'list',
      title: {
        text: 'Company',
        icon: '→',
        href: '#company',
      },
      categories: [
        {
          title: null,
          items: [
            { label: 'About Us', href: '#about-us' },
            { label: 'Culture', href: '#culture' },
            { label: 'Diversity & Inclusion', href: '#diversity' },
            { label: 'Code of Conduct', href: '#code-of-conduct' },
          ],
        },
        {
          title: null,
          items: [

            { label: 'Sustainability', href: '#sustainability' },
            { label: 'Careers', href: '#careers' },
            { label: 'Working at Revolut', href: '#working' },
            { label: 'Relocation with Revolut', href: '#relocation' },
          ],
        },
        {
          title: null,
          items: [
            { label: 'Talent Programmes', href: '#talent' },
            { label: 'News & Media', href: '#news' },
            { label: 'Annual Report 2024', href: '#annual-report' },
            { label: 'Reports and results', href: '#reports' },
          ],
        },
        {
          title: null,
          items: [
            { label: 'Affiliates', href: '#affiliates' },
            { label: 'Contact Us', href: '#contact' },
          ],
        },
      ],
    },
  },
];