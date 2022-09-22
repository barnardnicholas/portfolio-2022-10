export function clamp(value: number, min: number, max: number): number {
  if (min < max) {
    if (value < min) return min;
    return value > max ? max : value;
  }
  if (value > max) {
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

/**
 * Interpolate between 2 hexadeciaml colours
 * @param a
 * @param b
 * @param amount
 * @returns Hex code for lerped color
 */
export function lerpColor(a: string, b: string, amount = 0.5) {
  /* eslint-disable */
  const ah = parseInt(a.replace(/#/g, ''), 16);
  const ar = ah >> 16;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const bh = parseInt(b.replace(/#/g, ''), 16);
  const br = bh >> 16;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;
  const rr = ar + amount * (br - ar);
  const rg = ag + amount * (bg - ag);
  const rb = ab + amount * (bb - ab);

  return `#${(((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)}`;
  /* eslint-enable */
}

/**
 * Wrap a number around a min/max
 * @param value
 * @param from
 * @param to
 * @returns Wrapped number
 */
export function wrap(value: number, from: number, to: number) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    throw new TypeError('Must specify "to" and "from" arguments as numbers');
  }
  let intFrom = from;
  let intTo = to;
  if (intFrom > intTo) {
    const t = intFrom;
    intFrom = intTo;
    intTo = t;
  }
  const cycle = intTo - intFrom;
  if (cycle === 0) {
    return intTo;
  }
  return value - cycle * Math.floor((value - intFrom) / cycle);
}

let throttlePause: boolean;
/**
 * Wrap a number around a min/max
 * @param callback Function to execute
 * @param time Interval between executions
 */
export function throttle(callback: () => void, time: number): void {
  if (throttlePause) return;
  throttlePause = true;

  setTimeout(() => {
    callback();
    throttlePause = false;
  }, time);
}
