import React, { ReactNode, useState, useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';
import useWindow from '../../hooks/useWindow';
import MobileFooterBlocker from './MobileFooterBlocker';
// import Home from './pages/Home';

interface SlideProps {
  index: number;
  activeSlide: number;
  children: ReactNode;
}

const offscreenStyles: Record<string, unknown> = {
  opacity: 0,
  pointerEvents: 'none',
  zIndex: '-10',
};
const normalStyles: Record<string, unknown> = {
  opacity: 1,
  pointerEvents: 'all',
  zIndex: '1',
};

function Slide({ index, activeSlide, children }: SlideProps) {
  const { height } = useWindow();
  const prevProps = usePrevious({ activeSlide });

  const [extraStyles, setExtraStyles] = useState<CSSStyleSheet | Record<string, unknown>>({});

  useEffect(() => {
    if (prevProps.activeSlide !== activeSlide) {
      if (index !== activeSlide) setTimeout(() => setExtraStyles(offscreenStyles), 500);
      else setExtraStyles(normalStyles);
    }
  }, [activeSlide, index, prevProps.activeSlide]);

  let translateY = 0;
  if (index < activeSlide) translateY = -height - 100;
  if (index > activeSlide) translateY = height + 100;

  const sectionStyle = {
    transform: `translateY(${translateY}px)`,
    ...extraStyles,
  };
  return (
    <section className="section" style={sectionStyle}>
      {children}
      <MobileFooterBlocker />
    </section>
  );
}

export default Slide;
