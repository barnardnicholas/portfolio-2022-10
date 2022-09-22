import { TouchEvent, useState } from 'react';

interface XY {
  x: number;
  y: number;
}

interface UseTouchEventToScrollProps {
  onDragUp: () => void;
  onDragDown: () => void;
}

/* eslint-disable */
const initialProps: UseTouchEventToScrollProps = {
  onDragUp: () => {},
  onDragDown: () => {},
};
/* eslint-enable */

const useTouchEventToScroll = (props = {}) => {
  const compedProps: UseTouchEventToScrollProps = { ...initialProps, ...props };
  const { onDragUp, onDragDown } = compedProps;

  const [startXY, setStartXY] = useState<XY>({ x: 0, y: 0 });

  const handleTouchStart = (e: TouchEvent) => {
    const { clientX, clientY } = e.changedTouches[0];
    setStartXY({ x: clientX, y: clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const { clientY } = e.changedTouches[0];
    const { y } = startXY;
    const dY = clientY - y;
    if (Math.abs(dY) < 15) return;
    if (dY < 0) onDragUp();
    else if (dY > 0) onDragDown();
  };

  return { handleTouchStart, handleTouchEnd };
};

export default useTouchEventToScroll;
