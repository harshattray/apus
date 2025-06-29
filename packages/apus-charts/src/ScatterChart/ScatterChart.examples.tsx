import React from 'react';
import { ScatterChart } from './ScatterChart';

// Vibrant color palette for examples
const colorPalette = {
  A: '#FF6384', // Bright pink
  B: '#36A2EB', // Bright blue
  C: '#FFCE56', // Bright yellow
  D: '#4BC0C0', // Teal
  E: '#9966FF', // Purple
  F: '#FF9F40', // Orange
};

/**
 * Basic ScatterChart example with minimal configuration
 */
export const BasicScatterChart = () => {
  const data = [
    { x: 10, y: 20, category: 'A' },
    { x: 15, y: 35, category: 'B' },
    { x: 20, y: 22, category: 'C' },
    { x: 25, y: 40, category: 'D' },
    { x: 30, y: 15, category: 'E' },
    { x: 35, y: 28, category: 'F' },
    { x: 40, y: 32, category: 'A' },
  ];

  return <ScatterChart data={data} width={600} height={400} colors={colorPalette} />;
};

/**
 * ScatterChart with tooltip, axes, and legend
 */
export const ScatterChartWithFeatures = () => {
  const data = [
    { x: 10, y: 20, category: 'A' },
    { x: 15, y: 35, category: 'B' },
    { x: 20, y: 22, category: 'C' },
    { x: 25, y: 40, category: 'D' },
    { x: 30, y: 15, category: 'E' },
    { x: 35, y: 28, category: 'F' },
    { x: 40, y: 32, category: 'A' },
  ];

  return (
    <ScatterChart
      data={data}
      width={600}
      height={400}
      colors={colorPalette}
      showTooltip={true}
      xAxis={{ label: 'X Axis' }}
      yAxis={{ label: 'Y Axis' }}
      showLegend={true}
    />
  );
};

/**
 * ScatterChart with trend line
 */
export const ScatterChartWithTrendLine = () => {
  const data = [
    { x: 10, y: 20, category: 'A' },
    { x: 15, y: 35, category: 'B' },
    { x: 20, y: 22, category: 'C' },
    { x: 25, y: 40, category: 'D' },
    { x: 30, y: 15, category: 'E' },
    { x: 35, y: 28, category: 'F' },
    { x: 40, y: 32, category: 'A' },
  ];

  return (
    <ScatterChart
      data={data}
      width={600}
      height={400}
      colors={colorPalette}
      showTooltip={true}
      trendLine={{ show: true, color: '#333333', strokeWidth: 2 }}
    />
  );
};
