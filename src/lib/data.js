// 数据获取和处理工具函数
import { 
  heroCardData, 
  heroContent, 
  securityFeatures, 
  securityContent,
  appFeatures,
  featuresContent,
  mainNavigation,
  footerLinks,
  footerContent,
} from '@/data';

/**
 * 获取Hero Section数据
 */
export function getHeroData() {
  return {
    cards: heroCardData,
    content: heroContent,
  };
}

/**
 * 获取Security Section数据
 */
export function getSecurityData() {
  return {
    features: securityFeatures,
    content: securityContent,
  };
}

/**
 * 获取App Features数据
 */
export function getFeaturesData() {
  return {
    features: appFeatures,
    content: featuresContent,
  };
}

/**
 * 获取导航数据
 */
export function getNavigationData() {
  return mainNavigation;
}

/**
 * 获取Footer数据
 */
export function getFooterData() {
  return {
    links: footerLinks,
    content: footerContent,
  };
}

/**
 * 根据ID获取特定的功能特性
 */
export function getFeatureById(id) {
  return appFeatures.find(feature => feature.id === id);
}

/**
 * 根据类别获取Footer链接
 */
export function getFooterLinksByCategory(category) {
  return footerLinks[category] || null;
}

/**
 * 获取所有安全特性的标题列表
 */
export function getSecurityFeatureTitles() {
  return securityFeatures.map(feature => feature.title);
} 