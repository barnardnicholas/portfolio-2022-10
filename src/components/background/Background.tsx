import React from 'react';
import BackgroundCanvas, { BackgroundCanvasArgs } from './BackgroundCanvas';
import BackgroundLayer from './BackgroundLayer';

interface BackgroundLayer {
  numTicks: number;
  numArcs: number;
  arcRadius: number;
  tickRadius: number;
  arcColor: string;
  tickColor: string;
}

const backgroundLayers: { args: Partial<BackgroundCanvasArgs> }[] = [
  {
    args: {
      numTicks: 1,
      numArcs: 0,
      tickRadius: 50,
      tickColor: '#555555',
      tickWidth: 20,
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 3,
      arcRadius: 60,
      arcColor: '#444444',
    },
  },
  {
    args: {
      numTicks: 3,
      numArcs: 0,
      tickRadius: 100,
      tickColor: '#555555',
      tickWidth: 20,
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 3,
      arcRadius: 120,
      arcColor: '#444444',
    },
  },
  {
    args: {
      numTicks: 6,
      numArcs: 0,
      tickRadius: 200,
      tickColor: '#777777',
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 6,
      arcRadius: 240,
      arcColor: '#666666',
    },
  },
  {
    args: {
      numTicks: 12,
      numArcs: 0,
      tickRadius: 400,
      tickColor: '#999999',
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 12,
      arcRadius: 380,
      arcColor: '#888888',
    },
  },
  {
    args: {
      numTicks: 24,
      numArcs: 0,
      tickRadius: 500,
      tickColor: '#BBBBBB',
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 24,
      arcRadius: 680,
      arcColor: '#AAAAAA',
    },
  },
  {
    args: {
      numTicks: 40,
      numArcs: 0,
      tickRadius: 800,
      tickColor: '#DDDDDD',
    },
  },
  {
    args: {
      numTicks: 0,
      numArcs: 30,
      arcRadius: 800,
      arcColor: '#BBBBBB',
    },
  },
];

const minTranslateZ = -800;
const maxTranslateZ = 200;
const zSlice: number = Math.abs(maxTranslateZ - minTranslateZ) / backgroundLayers.length - 1;
const animDelay = 100;

function Background() {
  return (
    <div className="background-container">
      <div className="layer-container">
        {backgroundLayers.map((layer: { args: Partial<BackgroundLayer> }, i: number) => (
          <BackgroundLayer translateZ={minTranslateZ + i * zSlice} animDelay={i * animDelay}>
            <BackgroundCanvas args={layer.args} />
          </BackgroundLayer>
        ))}
      </div>
    </div>
  );
}

export default Background;
