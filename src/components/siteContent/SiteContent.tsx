import React, { ReactNode, WheelEvent, KeyboardEvent, useContext } from 'react';
import useTouchEventToScroll from '../../hooks/useTouchEventToScroll';
import useWindow from '../../hooks/useWindow';
import { clamp, throttle } from '../../utils/utils';
import { SlideshowContext } from '../context/SlideshowContext';
import Home from './pages/Home';

interface SlideProps {
  index: number;
  activeSlide: number;
  children: ReactNode;
}

function Slide({ index, activeSlide, children }: SlideProps) {
  const { height } = useWindow();

  let translateY = 0;
  if (index < activeSlide) translateY = -height;
  if (index > activeSlide) translateY = height;

  const sectionStyle = {
    transform: `translateY(${translateY}px)`,
  };
  return <section style={sectionStyle}>{children}</section>;
}

const slidesLength = 4;

function SlideShow() {
  const { activeSlide, setActiveSlide } = useContext(SlideshowContext);

  const nextSlide = () =>
    throttle(() => setActiveSlide(clamp(activeSlide + 1, 0, slidesLength - 1)), 750);
  const prevSlide = () =>
    throttle(() => setActiveSlide(clamp(activeSlide - 1, 0, slidesLength - 1)), 750);

  const { handleTouchStart, handleTouchEnd } = useTouchEventToScroll({
    onDragUp: nextSlide,
    onDragDown: prevSlide,
  });

  const handleWheel = (e: WheelEvent) => {
    const { deltaY } = e; // + = down, - = up
    if (deltaY < 0) prevSlide();
    if (deltaY > 0) nextSlide();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { code } = e.nativeEvent;
    if (code === 'ArrowUp') prevSlide();
    if (code === 'ArrowDown') nextSlide();
  };

  /* eslint-disable */
  return (
    <main
      role="button"
      tabIndex={0}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="content-slideshow"
    >
      <Slide index={0} activeSlide={activeSlide}>
        <Home />
      </Slide>
      <Slide index={1} activeSlide={activeSlide}>
        <h1>Page 2</h1>
        <button className="button" type="button" onClick={prevSlide}>
          Prev
        </button>
        <button className="button" type="button" onClick={nextSlide}>
          Next
        </button>
      </Slide>
      <Slide index={2} activeSlide={activeSlide}>
        <h1>Page 3</h1>
        <button className="button" type="button" onClick={prevSlide}>
          Prev
        </button>
        <button className="button" type="button" onClick={nextSlide}>
          Next
        </button>
      </Slide>
      <Slide index={3} activeSlide={activeSlide}>
        <h1>Page 4</h1>
        <button className="button" type="button" onClick={prevSlide}>
          Prev
        </button>
        <button className="button" type="button" onClick={nextSlide}>
          Next
        </button>
      </Slide>
    </main>
  );
}
/* eslint-enable */

export default SlideShow;
