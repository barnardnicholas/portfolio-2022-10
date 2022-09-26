import { useRef, useMemo, useState, useEffect } from 'react';

interface UseWindow {
  width: number;
  height: number;
  vMin: number;
  vMax: number;
}

/**
 * Get window dimensions
 * @return dimensions
 */
function useWindow(): UseWindow {
  const windowRef = useRef<Window & typeof globalThis>(window);
  const [windowState, setWindowState] = useState<Window & typeof globalThis>(window);

  useEffect(() => {
    function update() {
      setWindowState(window);
    }

    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  const { innerWidth, innerHeight } = windowState;
  const vMin = innerWidth < innerHeight ? innerWidth : innerHeight;
  const vMax = innerWidth >= innerHeight ? innerWidth : innerHeight;

  return {
    width: innerWidth,
    height: innerHeight,
    vMin,
    vMax,
  };
}
export default useWindow;
