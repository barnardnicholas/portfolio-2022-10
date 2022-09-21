import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { randomRange, degToRad } from '../../utils/utils';

interface Tick {
  angle: number;
  translate: {
    x: number;
    y: number;
  };
  scale: {
    x: number;
    y: number;
  };
  rect: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface Arc {
  translate: {
    x: number;
    y: number;
  };
  angle: number;
  lineWidth: number;
  arc: {
    x: number;
    y: number;
    radius: number;
    fromAngle: number;
    toAngle: number;
  };
}

export interface BackgroundCanvasArgs {
  width: number;
  height: number;
  numTicks: number;
  numArcs: number;
  tickColor: string;
  arcColor: string;
  cx: number;
  cy: number;
  tickWidth: number;
  tickHeight: number;
  tickRadius: number;
  arcRadius: number;
  tickSlice: number;
  arcSlice: number;
}

interface BackgroundCanvasProps {
  args?: Partial<BackgroundCanvasArgs>;
}

const baseArgs = {
  width: 2048,
  height: 2048,
  cx: 1024,
  cy: 1024,
  numTicks: 40,
  numArcs: 40,
  tickColor: '#f7f7f7',
  arcColor: '#f7f7f7',
};
const defaultArgs = {
  tickWidth: baseArgs.width * 0.01,
  tickHeight: baseArgs.height * 0.1,
  tickRadius: baseArgs.width * 0.3,
  arcRadius: baseArgs.width * 0.3,
  tickSlice: degToRad(360 / baseArgs.numTicks),
  arcSlice: degToRad(360 / baseArgs.numArcs),
};

function BackgroundCanvas({ args = {} }: BackgroundCanvasProps) {
  const allArgs: BackgroundCanvasArgs = {
    ...baseArgs,
    ...defaultArgs,
    ...args,
  };
  const { width, height, numTicks, numArcs, tickColor, arcColor } = allArgs;

  const cx = args.cx || width * 0.5;
  const cy = args.cy || height * 0.5;
  const tickWidth = args.tickWidth || width * 0.01;
  const tickHeight = args.tickHeight || height * 0.1;
  const tickRadius = args.tickRadius || width * 0.3;
  const arcRadius = args.arcRadius || width * 0.3;
  const tickSlice = args.tickSlice || degToRad(360 / numTicks);
  const arcSlice = args.arcSlice || degToRad(360 / numArcs);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ticks: Tick[] = useMemo(
    () =>
      new Array(numTicks).fill(0).map((_: number, i: number) => {
        const angle = tickSlice * i;
        return {
          angle,
          translate: {
            x: cx + tickRadius * Math.sin(angle),
            y: cy + tickRadius * Math.cos(angle),
          },
          scale: {
            x: randomRange(0.1, 2),
            y: randomRange(0.2, 0.5),
          },
          rect: {
            x: -tickWidth * 0.5,
            y: randomRange(0, -tickHeight * 0.5),
            w: tickWidth,
            h: tickHeight,
          },
        };
      }),
    [cx, cy, numTicks, tickHeight, tickRadius, tickSlice, tickWidth],
  );

  const arcs: Arc[] = useMemo(
    () =>
      new Array(numArcs).fill(0).map((_: number, i: number) => {
        const angle = arcSlice * i;
        return {
          translate: {
            x: cx,
            y: cy,
          },
          angle,
          lineWidth: randomRange(5, 20),
          arc: {
            x: 0,
            y: 0,
            radius: arcRadius * randomRange(0.7, 1.3),
            fromAngle: arcSlice * randomRange(1, -8),
            toAngle: arcSlice * randomRange(1, 5),
          },
        };
      }),
    [cx, cy, numArcs, arcRadius, arcSlice],
  );

  useLayoutEffect(() => {
    const context = canvasRef.current!.getContext('2d');
    context!.clearRect(0, 0, width, height);

    context!.fillStyle = tickColor;
    context!.strokeStyle = arcColor;

    arcs.forEach(({ translate, angle, lineWidth, arc }: Arc) => {
      context!.save();
      context!.strokeStyle = arcColor;
      context!.translate(translate.x, translate.y);
      context!.rotate(-angle);
      context!.lineWidth = lineWidth;
      context!.beginPath();
      context!.arc(arc.x, arc.y, arc.radius, arc.fromAngle, arc.toAngle);
      context!.stroke();
      context!.restore();
    });
    ticks.forEach(({ translate, angle, scale, rect }: Tick) => {
      context!.save();
      context!.fillStyle = tickColor;
      context!.translate(translate.x, translate.y);
      context!.rotate(-angle);
      context!.scale(scale.x, scale.y);
      context!.beginPath();
      context!.rect(rect.x, rect.x, rect.w, rect.h);
      context!.fill();
      context!.restore();
    });
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  const canvasStyle = {
    animation: `bg-layer-spin ${Math.random() > 0.5 ? 'reverse' : ''} linear ${randomRange(
      25,
      60,
    )}s infinite`,
  };

  return <canvas ref={canvasRef} width={width} height={height} style={canvasStyle} />;
}

BackgroundCanvas.defaultProps = {
  args: {
    ...baseArgs,
    ...defaultArgs,
  },
};

export default BackgroundCanvas;
