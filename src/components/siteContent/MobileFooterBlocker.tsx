import React, { useLayoutEffect, useState } from 'react';

function MobileFooterBlocker() {
  const [elementHeight, setElementHeight] = useState<number>(0);

  useLayoutEffect(() => {
    try {
      const app = document.getElementById('App');
      const { height } = app!.getBoundingClientRect();
      if (height > window.innerHeight) setElementHeight(Math.abs(height - window.innerHeight));
      else setElementHeight(0);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  if (elementHeight <= 0) return null;
  return <div style={{ minHeight: `${elementHeight}px` }} className="mob-foot-blocker" />;
}

export default MobileFooterBlocker;
