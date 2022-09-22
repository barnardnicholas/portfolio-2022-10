import { TouchEvent, useState } from 'react';
import { XY } from '../types/generic';

interface UseTouchEventToScrollProps {
  onDragUp: () => void;
  onDragDown: () => void;
  onDragLeft: () => void;
  onDragRight: () => void;
}

/* eslint-disable */
const initialProps: UseTouchEventToScrollProps = {
  onDragUp: () => {},
  onDragDown: () => {},
  onDragLeft: () => {},
  onDragRight: () => {},
};
/* eslint-enable */

const useTouchEventToScroll = (props = {}) => {
  const compedProps: UseTouchEventToScrollProps = { ...initialProps, ...props };
  const { onDragUp, onDragDown, onDragLeft, onDragRight } = compedProps;

  const [startXY, setStartXY] = useState<XY>({ x: 0, y: 0 });

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e.changedTouches[0];
    setStartXY({ x: clientX, y: clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e.changedTouches[0];
    const { x, y } = startXY;
    const dX = clientX - x;
    const dY = clientY - y;
    const adX = Math.abs(dX);
    const adY = Math.abs(dY);
    if (dX < 0 && adX > 15) onDragLeft();
    else if (dX > 0 && adX > 15) onDragRight();
    if (dY < 0 && adY > 15) onDragUp();
    else if (dY > 0 && adY > 15) onDragDown();
  };

  return { handleTouchStart, handleTouchEnd };
};

export default useTouchEventToScroll;
