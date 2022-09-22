import { useEffect } from 'react';

const useCustomVH = () => {
  useEffect(() => {
    const update = () => {
      console.log('updated');
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);
};

export default useCustomVH;
