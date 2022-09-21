import React, { ReactNode, WheelEvent, KeyboardEvent, useContext } from 'react';
import useWindow from '../../hooks/useWindow';
import { wrap } from '../../utils/utils';
import { SlideshowContext } from '../context/SlideshowContext';

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

  const handleWheel = (e: WheelEvent) => {
    const { deltaY } = e.nativeEvent; // + = down, - = up
    if (deltaY < 0) setActiveSlide(wrap(activeSlide - 1, 0, slidesLength));
    if (deltaY > 0) setActiveSlide(wrap(activeSlide + 1, 0, slidesLength));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(e);
  };

  return (
    <main
      role="button"
      tabIndex={0}
      className="content-slideshow"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
    >
      <Slide index={0} activeSlide={activeSlide}>
        <h1>Page 1</h1>
        <button className="button" type="button" onClick={() => setActiveSlide(1)}>
          Next
        </button>
      </Slide>
      <Slide index={1} activeSlide={activeSlide}>
        <h1>Page 2</h1>
        <button className="button" type="button" onClick={() => setActiveSlide(0)}>
          Prev
        </button>
        <button className="button" type="button" onClick={() => setActiveSlide(2)}>
          Next
        </button>
      </Slide>
      <Slide index={2} activeSlide={activeSlide}>
        <h1>Page 3</h1>
        <button className="button" type="button" onClick={() => setActiveSlide(1)}>
          Prev
        </button>
        <button className="button" type="button" onClick={() => setActiveSlide(3)}>
          Next
        </button>
      </Slide>
      <Slide index={3} activeSlide={activeSlide}>
        <h1>Page 4</h1>
        <button className="button" type="button" onClick={() => setActiveSlide(2)}>
          Prev
        </button>
        <button className="button" type="button" onClick={() => setActiveSlide(0)}>
          Next
        </button>
      </Slide>
    </main>
  );
}

export default SlideShow;
