import React, { useContext, createContext, ReactNode, useMemo, useCallback, useState } from 'react';

export interface SlideshowProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

/* eslint-disable */
const initialState: SlideshowProps = {
  activeSlide: 0,
  setActiveSlide: () => {},
};
/* eslint-enable */

export const SlideshowContext = createContext<SlideshowProps>(initialState);

interface SlideshowContextProviderProps {
  children: ReactNode;
}

function SlideshowContextProvider({ children }: SlideshowContextProviderProps) {
  const [activeSlide, setActiveSlideState] = useState<number>(initialState.activeSlide);

  const setActiveSlide = useCallback(
    (index: number) => {
      setActiveSlideState(index);
    },
    [setActiveSlideState],
  );

  const returnValue = useMemo(
    () => ({
      activeSlide,
      setActiveSlide,
    }),
    [activeSlide, setActiveSlide],
  );

  return <SlideshowContext.Provider value={returnValue}>{children}</SlideshowContext.Provider>;
}

export const useSlideshowState = () => {
  const slideshowContext = useContext(SlideshowContext);
  return slideshowContext;
};

export default SlideshowContextProvider;
