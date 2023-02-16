import { useEffect, useState } from 'react';
import { lerp, randomRange } from '../utils/utils';

interface Rotation {
  x: number;
  y: number;
  offset: number;
}

const rotations: Rotation[] = Array(9)
  .fill(null)
  .map((_, i: number) => ({
    x: randomRange(-10, 10),
    y: randomRange(-10, 10),
    offset: i * window.innerHeight,
  }));

const useScrollRotation = () => {
  const [rotation, setRotation] = useState<{ x: number; y: number }>({
    x: rotations[0].x,
    y: rotations[0].y,
  });

  useEffect(() => {
    const onScroll: EventListener = () => {
      try {
        const nextRotation = rotations
          .filter((rot: Rotation) => rot.offset > window.scrollY)
          .sort((a: Rotation, b: Rotation) => a.offset - b.offset)[0];
        const prevRotation = rotations
          .filter((rot: Rotation) => rot.offset <= window.scrollY)
          .sort((a: Rotation, b: Rotation) => b.offset - a.offset)[0];

        const newAngle = {
          x: lerp(
            prevRotation?.x || 0,
            nextRotation?.x || 0,
            (window.scrollY - prevRotation.offset) / window.innerHeight,
          ),
          y: lerp(
            prevRotation?.y || 0,
            nextRotation?.y || 0,
            (window.scrollY - prevRotation.offset) / window.innerHeight,
          ),
        };
        setRotation(newAngle);
      } catch (e) {
        console.warn(e);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return {
    rotation,
  };
};

export default useScrollRotation;
