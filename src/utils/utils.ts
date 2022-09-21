export function clamp(value: number, min: number, max: number): number {
  if (min < max) {
    if (value < min) return min;
    return value > max ? max : value;
  }
  if (value < max) {
    return max;
  }
  return value > min ? min : value;
}

export function degToRad(n: number): number {
  return (n * Math.PI) / 180;
}

export function radToDeg(n: number): number {
  return (n * 180) / Math.PI;
}

export function randomRange(min: number, max: number): number {
  let intMin = min;
  let intMax = max;
  if (max === undefined) {
    intMax = min;
    intMin = 0;
  }

  if (typeof intMin !== 'number' || typeof intMax !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }

  return Math.random() * (intMax - intMin) + intMin;
}

export function lerp(min: number, max: number, t: number): number {
  return min * (1 - t) + max * t;
}
