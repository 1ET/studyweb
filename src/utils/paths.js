// 获取基础路径
export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/your-repo-name' : '';
};

// 获取完整的资源路径
export const getAssetPath = (path) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
}; 