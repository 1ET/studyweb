// 数据类型定义
export interface HeroCard {
  id: string;
  background: string;
  alt: string;
}

export interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface AppFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  icon: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface AppStore {
  id: string;
  name: string;
  href: string;
  image: string;
}

export interface CountryCode {
  code: string;
  country: string;
  name: string;
} 