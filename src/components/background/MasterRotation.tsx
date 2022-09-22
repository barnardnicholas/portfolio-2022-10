import React, { ReactNode, useContext, useEffect, useState } from 'react';
import usePrevious from '../../hooks/usePrevious';
import { XY } from '../../types/generic';
import { randomRange } from '../../utils/utils';
import { SlideshowContext } from '../context/SlideshowContext';

interface MasterRotationProps {
  children: ReactNode;
}
function MasterRotation({ children }: MasterRotationProps) {
  const { activeSlide } = useContext(SlideshowContext);
  const [rotation, setRotation] = useState<XY>({ x: 0, y: 0 });
  const prevActiveSlide = usePrevious(activeSlide);

  useEffect(() => {
    if (activeSlide !== prevActiveSlide)
      setRotation({ x: randomRange(-30, 30), y: randomRange(-30, -30) });
  }, [activeSlide, prevActiveSlide]);

  const styles = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
  };
  return (
    <div className="master-rotation" style={styles}>
      {children}
    </div>
  );
}

export default MasterRotation;
