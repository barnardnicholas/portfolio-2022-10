import React, { WheelEvent, KeyboardEvent, useContext, useRef } from 'react';
import useTouchEventToScroll from '../../hooks/useTouchEventToScroll';
import { clamp } from '../../utils/utils';
import { SlideshowContext } from '../context/SlideshowContext';
import Slide from './Slide';
import Home from './pages/Home';

const slidesLength = 4;

function SlideShow() {
  const { activeSlide, setActiveSlide } = useContext(SlideshowContext);
  const canScroll = useRef<boolean>(true);

  const nextSlide = () => {
    if (canScroll.current) {
      setActiveSlide(clamp(activeSlide + 1, 0, slidesLength - 1));
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 1000);
    }
  };
  const prevSlide = () => {
    if (canScroll.current) {
      setActiveSlide(clamp(activeSlide - 1, 0, slidesLength - 1));
      canScroll.current = false;
      setTimeout(() => {
        canScroll.current = true;
      }, 1000);
    }
  };

  const { handleTouchStart, handleTouchEnd } = useTouchEventToScroll({
    onDragUp: nextSlide,
    onDragDown: prevSlide,
  });

  const handleWheel = (e: WheelEvent) => {
    const { deltaY } = e; // + = down, - = up
    if (deltaY < 0 && canScroll.current) prevSlide();
    if (deltaY > 0 && canScroll.current) nextSlide();
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
        <div className="slide-content">
          <h1>Page 2</h1>
          <button className="button" type="button" onClick={prevSlide}>
            Prev
          </button>
          <button className="button" type="button" onClick={nextSlide}>
            Next
          </button>
          <footer>
            <h3 className="text-right no-margin-bottom">FOOTER</h3>
          </footer>
        </div>
      </Slide>
      <Slide index={2} activeSlide={activeSlide}>
        <div className="slide-content">
          <h1>Page 3</h1>
          <button className="button" type="button" onClick={prevSlide}>
            Prev
          </button>
          <button className="button" type="button" onClick={nextSlide}>
            Next
          </button>
          <footer>
            <h3 className="text-right no-margin-bottom">FOOTER</h3>
          </footer>
        </div>
      </Slide>
      <Slide index={3} activeSlide={activeSlide}>
        <div className="slide-content">
          <h1>Page 4</h1>
          <button className="button" type="button" onClick={prevSlide}>
            Prev
          </button>
          <button className="button" type="button" onClick={nextSlide}>
            Next
          </button>
          <footer>
            <h3 className="text-right no-margin-bottom">FOOTER</h3>
          </footer>
        </div>
      </Slide>
    </main>
  );
}
/* eslint-enable */

export default SlideShow;
