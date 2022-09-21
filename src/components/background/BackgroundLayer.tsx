import React, { ReactNode, useEffect, useState } from 'react';
import { clamp } from '../../utils/utils';

interface BackgroundLayerProps {
  children: ReactNode;
  translateZ: number;
  animDelay: number;
}
function BackgroundLayer({ children, translateZ, animDelay }: BackgroundLayerProps) {
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => setScale(100), animDelay);
  }, [animDelay]);

  return (
    <div
      className="layer"
      style={{
        transform: `scale(${scale}%) translateZ(${translateZ}px)`,
        opacity: clamp(scale, 30, 100),
      }}
    >
      {children}
    </div>
  );
}

export default BackgroundLayer;
