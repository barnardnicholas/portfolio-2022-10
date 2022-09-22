import { useEffect, useLayoutEffect } from 'react';

const useCustomVH = () => {
  const update = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  useLayoutEffect(() => {
    update();
  }, []);
};

export default useCustomVH;
