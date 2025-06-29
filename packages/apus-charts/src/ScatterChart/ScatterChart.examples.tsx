import React from 'react';
import { ScatterChart } from './ScatterChart';
import { ScatterHoveredData } from './types';

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

/**
 * Bubble Chart example with variable point sizes
 */
export const BubbleChartExample = () => {
  const data = [
    { x: 10, y: 20, category: 'A', size: 25 },
    { x: 15, y: 35, category: 'B', size: 40 },
    { x: 20, y: 22, category: 'C', size: 10 },
    { x: 25, y: 40, category: 'D', size: 35 },
    { x: 30, y: 15, category: 'E', size: 50 },
    { x: 35, y: 28, category: 'F', size: 15 },
    { x: 40, y: 32, category: 'A', size: 30 },
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
      bubbleChart={{
        enabled: true,
        minSize: 5,
        maxSize: 25,
        sizeScale: 'sqrt', // Using square root scale for better visual representation
      }}
      tooltipBackgroundColor="#FFFFFF"
      tooltipTextColor="#333333"
      tooltipBorderRadius="4px"
      tooltipPadding="10px"
      tooltipFormat={(data) => `
        <div>
          <strong style="color: #333;">${data.category}</strong>
        </div>
        <div style="color: #666;">X: ${data.x}</div>
        <div style="color: #666;">Y: ${data.y}</div>
        <div style="color: #666;">Size: ${data.size}</div>
      `}
    />
  );
};

/**
 * ScatterChart with error bars showing data uncertainty
 */
export const ScatterChartWithErrorBars = () => {
  const data = [
    { x: 10, y: 20, category: 'A', xError: 2, yError: 3 },
    { x: 15, y: 35, category: 'B', xError: [1, 3], yError: 2 },
    { x: 20, y: 22, category: 'C', xError: 1.5, yError: [2, 4] },
    { x: 25, y: 40, category: 'D', xError: 2, yError: 5 },
    { x: 30, y: 15, category: 'E', xError: [3, 1], yError: [1, 3] },
    { x: 35, y: 28, category: 'F', xError: 2, yError: 2 },
    { x: 40, y: 32, category: 'A', xError: 1, yError: 4 },
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
      errorBars={{
        enabled: true,
        color: '#555555',
        strokeWidth: 1.5,
        opacity: 0.7,
        capWidth: 8,
      }}
      tooltipFormat={(data) => `
        Category: ${data.category}
        X: ${data.x} ${data.xError ? `± ${Array.isArray(data.xError) ? `${data.xError[0]},${data.xError[1]}` : data.xError}` : ''}
        Y: ${data.y} ${data.yError ? `± ${Array.isArray(data.yError) ? `${data.yError[0]},${data.yError[1]}` : data.yError}` : ''}
      `}
    />
  );
};

/**
 * ScatterChart with multiple series support
 */
export const MultipleSeriesScatterChart = () => {
  const series = [
    {
      id: 'series1',
      name: 'Series A',
      colors: { A: '#FF6384', B: '#FF6384', C: '#FF6384', D: '#FF6384' }, // Bright pink
      data: [
        { x: 10, y: 20, category: 'A' },
        { x: 15, y: 25, category: 'B' },
        { x: 20, y: 30, category: 'C' },
        { x: 25, y: 35, category: 'D' },
      ],
      pointSize: 8,
    },
    {
      id: 'series2',
      name: 'Series B',
      colors: { A: '#36A2EB', B: '#36A2EB', C: '#36A2EB', D: '#36A2EB' }, // Bright blue
      data: [
        { x: 12, y: 22, category: 'A' },
        { x: 17, y: 27, category: 'B' },
        { x: 22, y: 32, category: 'C' },
        { x: 27, y: 37, category: 'D' },
      ],
      pointSize: 6,
    },
    {
      id: 'series3',
      name: 'Series C',
      colors: { A: '#FFCE56', B: '#FFCE56', C: '#FFCE56', D: '#FFCE56' }, // Bright yellow
      data: [
        { x: 14, y: 24, category: 'A' },
        { x: 19, y: 29, category: 'B' },
        { x: 24, y: 34, category: 'C' },
        { x: 29, y: 39, category: 'D' },
      ],
      pointSize: 7,
    },
  ];

  return (
    <ScatterChart
      series={series}
      width={600}
      height={400}
      showTooltip={true}
      xAxis={{ label: 'X Axis' }}
      yAxis={{ label: 'Y Axis' }}
      showLegend={true}
      tooltipBackgroundColor="#FFFFFF"
      tooltipTextColor="#333333"
      tooltipBorderRadius="4px"
      tooltipPadding="10px"
      tooltipFormat={(data: ScatterHoveredData) => `
        <div>
          <strong style="color: #333;">${data.seriesName || data.seriesId || 'Unknown'}</strong>
        </div>
        <div style="color: #666;">Category: ${data.category}</div>
        <div style="color: #666;">X: ${data.x}</div>
        <div style="color: #666;">Y: ${data.y}</div>
      `}
    />
  );
};

/**
 * Multiple Series Bubble Chart example with variable point sizes
 */
export const MultipleSeriesBubbleChart = () => {
  const series = [
    {
      id: 'series1',
      name: 'Series A',
      colors: { A: '#FF6384', B: '#FF6384', C: '#FF6384' },
      data: [
        { x: 10, y: 20, category: 'A', size: 30 },
        { x: 15, y: 25, category: 'B', size: 45 },
        { x: 20, y: 30, category: 'C', size: 25 },
      ],
    },
    {
      id: 'series2',
      name: 'Series B',
      colors: { A: '#36A2EB', B: '#36A2EB', C: '#36A2EB' },
      data: [
        { x: 12, y: 22, category: 'A', size: 50 },
        { x: 17, y: 27, category: 'B', size: 35 },
        { x: 22, y: 32, category: 'C', size: 60 },
      ],
    },
    {
      id: 'series3',
      name: 'Series C',
      colors: { A: '#FFCE56', B: '#FFCE56', C: '#FFCE56' },
      data: [
        { x: 14, y: 24, category: 'A', size: 20 },
        { x: 19, y: 29, category: 'B', size: 40 },
        { x: 24, y: 34, category: 'C', size: 55 },
      ],
    },
  ];

  return (
    <ScatterChart
      series={series}
      width={600}
      height={400}
      showTooltip={true}
      xAxis={{ label: 'X Axis' }}
      yAxis={{ label: 'Y Axis' }}
      showLegend={true}
      bubbleChart={{
        enabled: true,
        minSize: 8,
        maxSize: 40,
        sizeScale: 'sqrt',
      }}
      tooltipBackgroundColor="#FFFFFF"
      tooltipTextColor="#333333"
      tooltipBorderRadius="4px"
      tooltipPadding="10px"
      tooltipFormat={(data: ScatterHoveredData) => `
        <div>
          <strong style="color: #333;">${data.seriesName || data.seriesId || 'Unknown'}</strong>
        </div>
        <div style="color: #666;">Category: ${data.category}</div>
        <div style="color: #666;">X: ${data.x}</div>
        <div style="color: #666;">Y: ${data.y}</div>
        <div style="color: #666;">Size: ${(data as any).size}</div>
      `}
    />
  );
};
