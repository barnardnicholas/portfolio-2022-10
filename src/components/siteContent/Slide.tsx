import React, { ReactNode, useState, useEffect } from 'react';
import useAppHeightOffset from '../../hooks/useAppHeightOffset';
import usePrevious from '../../hooks/usePrevious';

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
  const [height, setHeight] = useState<number>(window.innerHeight);
  const prevProps = usePrevious({ activeSlide });
  const appHeightOffset = useAppHeightOffset();

  const [extraStyles, setExtraStyles] = useState<CSSStyleSheet | Record<string, unknown>>({});

  useEffect(() => {
    if (prevProps.activeSlide !== activeSlide) {
      if (index !== activeSlide) setTimeout(() => setExtraStyles(offscreenStyles), 500);
      else setExtraStyles(normalStyles);
    }
  }, [activeSlide, index, prevProps.activeSlide]);

  useEffect(() => {
    const update = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, []);

  let translateY = 0;
  if (index < activeSlide) translateY = -height - 100;
  if (index > activeSlide) translateY = height + 100;

  console.log(translateY);

  const sectionStyle = {
    height: `calc(100vh - ${appHeightOffset}px)`,
    top: `${translateY}px`,
    ...extraStyles,
  };
  return (
    <section className="section" style={sectionStyle}>
      {children}
    </section>
  );
}

export default Slide;
