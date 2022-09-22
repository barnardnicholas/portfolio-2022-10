import { clamp, degToRad, lerp, lerpColor, radToDeg, randomRange, wrap } from './utils';

// ------------------------------------------------------------------------

describe('clamp', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(clamp(1, 0, 2))).toEqual(false);
  });
  test('Returns correct values for happy cases', () => {
    const min = 1;
    const max = 10;
    const values = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    values.forEach(value => {
      expect(clamp(value, min, max)).toBeGreaterThanOrEqual(min);
      expect(clamp(value, min, max)).toBeLessThanOrEqual(max);
    });
  });
});

// ------------------------------------------------------------------------

describe('degToRad', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(degToRad(180))).toEqual(false);
  });
  test('Returns correct values for happy cases', () => {
    const values = [0, 45, 90, 180, 270, 360];
    values.forEach(value => {
      expect(degToRad(value)).toEqual((value * Math.PI) / 180);
    });
  });
});

// ------------------------------------------------------------------------

describe('radToDeg', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(radToDeg(180))).toEqual(false);
  });
  test('Returns correct values for happy cases', () => {
    const values = [0, 45, 90, 180, 270, 360];
    values.forEach(value => {
      expect(radToDeg(value)).toEqual((value * 180) / Math.PI);
    });
  });
});

// ------------------------------------------------------------------------

describe('randomRange', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(randomRange(0, 10))).toEqual(false);
  });
  test('Returns correct values for happy cases', () => {
    const minMaxes = [
      [0, 10],
      [2, 14],
      [-3, 50],
    ];
    minMaxes.forEach(pair => {
      expect(randomRange(pair[0], pair[1])).toBeLessThanOrEqual(pair[1]);
      expect(randomRange(pair[0], pair[1])).toBeGreaterThanOrEqual(pair[0]);
    });
  });
});

// ------------------------------------------------------------------------

describe('lerp', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(lerp(0, 10, 0.5))).toEqual(false);
  });
  test('Returns correct values for happy cases', () => {
    expect(lerp(0, 5, 0.5)).toEqual(2.5);
    expect(lerp(0, 10, 0.5)).toEqual(5);

    expect(lerp(0, 9, 0.3333333)).toBeLessThanOrEqual(3.1);
    expect(lerp(0, 9, 0.3333333)).toBeGreaterThanOrEqual(2.9);
  });
});

// ------------------------------------------------------------------------

describe('lerpColor', () => {
  test('Returns a string', () => {
    expect(typeof lerpColor('#000000', '#FFFFFF', 0.5)).toEqual('string');
  });
  test('Returns values within bounds', () => {
    const minMaxes = [
      ['#000000', '#FFFFFF'],
      ['#FF00D3', '#FF88F8'],
      ['#00D422', '#FFD4F3'],
    ];
    minMaxes.forEach(pair => {
      const rgbFrom = {
        r: parseInt(`${pair[0][1]}${pair[0][2]}`, 16),
        g: parseInt(`${pair[0][3]}${pair[0][4]}`, 16),
        b: parseInt(`${pair[0][5]}${pair[0][6]}`, 16),
      };
      const rgbTo = {
        r: parseInt(`${pair[1][1]}${pair[1][2]}`, 16),
        g: parseInt(`${pair[1][3]}${pair[1][4]}`, 16),
        b: parseInt(`${pair[1][5]}${pair[1][6]}`, 16),
      };
      const result = lerpColor(pair[0], pair[1], 0.5);
      const rgbResult = {
        r: parseInt(`${result[1]}${result[2]}`, 16),
        g: parseInt(`${result[3]}${result[4]}`, 16),
        b: parseInt(`${result[5]}${result[6]}`, 16),
      };
      expect(rgbFrom.r).toBeLessThanOrEqual(rgbResult.r);
      expect(rgbFrom.g).toBeLessThanOrEqual(rgbResult.g);
      expect(rgbFrom.b).toBeLessThanOrEqual(rgbResult.b);
      expect(rgbTo.r).toBeGreaterThanOrEqual(rgbResult.r);
      expect(rgbTo.g).toBeGreaterThanOrEqual(rgbResult.g);
      expect(rgbTo.b).toBeGreaterThanOrEqual(rgbResult.b);
    });
  });
});

// ------------------------------------------------------------------------

describe('wrap', () => {
  test('Returns a number', () => {
    expect(Number.isNaN(wrap(-90, 0, 360))).toEqual(false);
  });
  test('Returns correct values', () => {
    expect(wrap(-180, 0, 360)).toEqual(180);
    expect(wrap(-90, 0, 360)).toEqual(270);
    expect(wrap(360, 0, 360)).toEqual(0);
    expect(wrap(361, 0, 360)).toEqual(1);
  });
});
