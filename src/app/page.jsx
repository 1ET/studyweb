'use client';
import styles from './page.module.css';
import { Header, Footer } from '@/components/layout';
import Main from '@/components/MainContent';
import useCustomScroll from '@/hooks/useCustomScroll';
import { useEffect } from 'react';

export default function Home() {
  const {
    isScrolled,
    currentScrollY,
    isCustomScrollEnabled,
    isInitialState,
    setIsCustomScrollEnabled,
  } = useCustomScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      {/* 控制面板 */}
      {false && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 9999,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
          }}
        >
          <div>自定义滚动: {isCustomScrollEnabled ? '启用' : '禁用'}</div>
          <div>当前位置: {currentScrollY}px</div>
          <div>状态: {isScrolled ? '已滚动' : '顶部'}</div>
          <div>初始状态: {isInitialState ? '是' : '否'}</div>
          <button
            onClick={() => setIsCustomScrollEnabled(!isCustomScrollEnabled)}
            style={{ marginTop: '5px', padding: '2px 6px' }}
          >
          切换滚动模式
          </button>
        </div>
      )}

      <Header />
      <Main isScrolled={isScrolled} />
      <Footer />
    </div>
  );
}
