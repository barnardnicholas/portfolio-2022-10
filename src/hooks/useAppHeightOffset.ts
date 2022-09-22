import { useEffect, useState } from 'react';

const useAppHeightOffset = () => {
  const [elementHeight, setElementHeight] = useState<number>(0);

  useEffect(() => {
    try {
      const app = document.getElementById('App');
      const { height } = app!.getBoundingClientRect();
      if (height > window.innerHeight) setElementHeight(Math.abs(height - window.innerHeight));
      else setElementHeight(0);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return elementHeight;
};

export default useAppHeightOffset;
