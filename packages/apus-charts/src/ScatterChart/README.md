# ScatterChart

A scatter chart component for visualizing data points in a two-dimensional space. ScatterChart is ideal for showing the relationship between two variables and identifying patterns, clusters, or outliers in your data. It supports multiple series, error bars, and bubble chart functionality.

## Features

- Interactive data points with hover and click events
- Customizable colors by category
- Optional trend line with regression analysis
- Responsive tooltips with customizable formatting
- Configurable axes with labels and tick formatting
- Optional legend with customizable positioning
- Grid lines for better readability
- Multiple data series support
- Error bars for X and Y axes
- Bubble chart functionality with variable point sizes
- Series visibility toggle

## Installation

```bash
npm install apus
```

## Basic Usage

```jsx
import React from 'react';
import { ScatterChart } from 'apus';

const Example = () => {
  const scatterData = [
    { x: 10, y: 20, category: 'A' },
    { x: 15, y: 35, category: 'B' },
    { x: 20, y: 22, category: 'A' },
    { x: 25, y: 40, category: 'B' },
    { x: 30, y: 15, category: 'A' },
    { x: 35, y: 28, category: 'B' },
    { x: 40, y: 32, category: 'A' },
  ];

  return (
    <ScatterChart 
      data={scatterData} 
      width={600}
      height={400}
      colors={{ A: '#ff6384', B: '#36a2eb' }}
      showTooltip={true}
      xAxis={{ label: 'X Axis' }}
      yAxis={{ label: 'Y Axis' }}
      showLegend={true}
    />
  );
};

<Example />
```

## Advanced Examples

### With Trend Line

```jsx
import { ScatterChart } from 'apus';

const data = [
  { x: 10, y: 20, category: 'A' },
  { x: 15, y: 35, category: 'B' },
  { x: 20, y: 22, category: 'A' },
  { x: 25, y: 40, category: 'B' },
  { x: 30, y: 15, category: 'A' },
  { x: 35, y: 28, category: 'B' },
  { x: 40, y: 32, category: 'A' },
];

<ScatterChart
  data={data}
  width={600}
  height={400}
  colors={{ A: '#ff6384', B: '#36a2eb' }}
  showTooltip={true}
  trendLine={{ show: true, color: '#333333', strokeWidth: 2 }}
/>
```

### With Custom Tooltip Format

```jsx
import { ScatterChart } from 'apus';

const data = [
  { x: 10, y: 20, category: 'A', label: 'Point 1' },
  { x: 15, y: 35, category: 'B', label: 'Point 2' },
  { x: 20, y: 22, category: 'A' },
  { x: 25, y: 40, category: 'B', label: 'Point 4' },
  { x: 30, y: 15, category: 'A' },
  { x: 35, y: 28, category: 'B' },
  { x: 40, y: 32, category: 'A', label: 'Point 7' },
];

<ScatterChart
  data={data}
  width={600}
  height={400}
  showTooltip={true}
  tooltipFormat={(data) => `
    <div style="font-weight: bold">${data.category}</div>
    <div>Value: (${data.x}, ${data.y})</div>
    ${data.label ? `<div>Label: ${data.label}</div>` : ''}
  `}
/>
```

### Multiple Series with Error Bars

```jsx
import { ScatterChart } from 'apus';

const seriesWithErrorBarsData = [
  {
    id: 'series1',
    name: 'Series A',
    data: [
      { x: 10, y: 20, category: 'A', xError: 2, yError: 3 },
      { x: 15, y: 25, category: 'B', xError: [1, 3], yError: 2 },
    ],
    errorBars: {
      color: '#FF6384',
      strokeWidth: 1.5,
      opacity: 0.8,
      capWidth: 8,
    },
  },
  {
    id: 'series2',
    name: 'Series B',
    data: [
      { x: 12, y: 22, category: 'A', xError: 1.5, yError: 2.5 },
      { x: 17, y: 27, category: 'B', xError: [1, 2], yError: [2, 3] },
    ],
  },
];

<ScatterChart
  series={seriesWithErrorBarsData}
  width={700}
  height={400}
  showLegend={true}
  legendPosition="right"
  errorBars={{
    enabled: true,
    color: '#555555',
    strokeWidth: 1,
    opacity: 0.6,
    capWidth: 5,
    showCaps: true,
  }}
/>
```

### Bubble Chart

```jsx
import { ScatterChart } from 'apus';

const bubbleData = [
  {
    id: 'series1',
    name: 'Series A',
    data: [
      { x: 10, y: 20, category: 'A', size: 30 },
      { x: 15, y: 25, category: 'B', size: 45 },
      { x: 20, y: 30, category: 'C', size: 25 },
    ],
  },
  {
    id: 'series2',
    name: 'Series B',
    data: [
      { x: 12, y: 22, category: 'A', size: 50 },
      { x: 17, y: 27, category: 'B', size: 35 },
      { x: 22, y: 32, category: 'C', size: 60 },
    ],
  },
];

<ScatterChart
  series={bubbleData}
  width={700}
  height={400}
  showLegend={true}
  bubbleChart={{
    enabled: true,
    minSize: 10,
    maxSize: 50,
    sizeScale: 'sqrt',
  }}
/>
```

### Series Visibility Control

```jsx
import React, { useState } from 'react';
import { ScatterChart } from 'apus';

const SeriesVisibilityExample = () => {
  const [visibleSeries, setVisibleSeries] = useState({
    series1: true,
    series2: true,
    series3: true,
  });

  const handleSeriesToggle = (seriesId, visible) => {
    setVisibleSeries(prev => ({
      ...prev,
      [seriesId]: visible,
    }));
  };

  return (
    <ScatterChart
      series={seriesData}
      width={700}
      height={400}
      showLegend={true}
      visibleSeries={visibleSeries}
      onSeriesToggle={handleSeriesToggle}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Required Props** |||||
| `data` | `ScatterDataPoint[]` | | Array of data points to visualize. Each point must have `x`, `y`, and `category` properties. |
| `series` | `SeriesConfig[]` | | Alternative to `data`. Array of series configurations for multiple series support. |
| `width` | `number` | | Width of the chart in pixels. |
| `height` | `number` | | Height of the chart in pixels. |
| **Styling** |||||
| `colors` | `string[] \| Record<string, string>` | Default color palette | Colors for the data points. Can be an array of color strings or an object mapping categories to colors. |
| `style` | `CSSProperties` | | Additional CSS styles to apply to the container. |
| `className` | `string` | | Additional CSS class to apply to the container. |
| `pointSize` | `number` | `6` | Size of the data points in pixels. |
| **Axes Configuration** |||||
| `xAxis` | `Partial<AxisProps>` | `{}` | Configuration for the X axis. |
| `yAxis` | `Partial<AxisProps>` | `{}` | Configuration for the Y axis. |
| `grid` | `Partial<GridProps>` | `{}` | Configuration for the grid lines. |
| **Legend** |||||
| `showLegend` | `boolean` | `true` | Whether to display the legend. |
| `legendPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Position of the legend. |
| `clickableLegend` | `boolean` | `true` | Whether legend items can be clicked to filter data. |
| `onLegendItemClick` | `(category: string \| null, seriesId?: string) => void` | | Callback when a legend item is clicked. |
| **Series Visibility** |||||
| `visibleSeries` | `Record<string, boolean>` | | Object tracking which series are visible. Keys are series IDs, values are boolean visibility state. |
| `onSeriesToggle` | `(seriesId: string, visible: boolean) => void` | | Callback when a series visibility is toggled. |
| **Tooltip** |||||
| `showTooltip` | `boolean` | `true` | Whether to show tooltips on hover. |
| `tooltipFormat` | `(data: ScatterHoveredData) => string` | | Custom formatter for tooltip content. Returns HTML string. |
| `tooltipBackgroundColor` | `string` | `'rgba(50, 50, 50, 0.85)'` | Background color of the tooltip. |
| `tooltipTextColor` | `string` | `'#FFFFFF'` | Text color of the tooltip. |
| `tooltipPadding` | `string` | `'8px 12px'` | Padding of the tooltip. |
| `tooltipBorderRadius` | `string` | `'4px'` | Border radius of the tooltip. |
| `tooltipOffsetX` | `number` | `10` | Horizontal offset of the tooltip from the cursor. |
| `tooltipOffsetY` | `number` | `10` | Vertical offset of the tooltip from the cursor. |
| **Trend Line** |||||
| `trendLine` | `Partial<TrendLineProps>` | | Configuration for the trend line. Set `show: true` to display. |
| **Error Bars** |||||
| `errorBars` | `Partial<ErrorBarConfig>` | | Configuration for error bars. Set `enabled: true` to display. |
| **Bubble Chart** |||||
| `bubbleChart` | `Partial<BubbleChartConfig>` | | Configuration for bubble chart functionality. Set `enabled: true` to display variable-sized points. |

## Type Definitions

### ScatterDataPoint

```javascript
// ScatterDataPoint structure:
// {
//   x: number | Date,  // X-coordinate value (can be a number or Date)
//   y: number,         // Y-coordinate value
//   category: string,  // Category for grouping and coloring
//   size?: number,     // Optional size for bubble charts
//   xError?: number,   // Optional error value for X-axis error bars
//   yError?: number    // Optional error value for Y-axis error bars
// }
```

### SeriesConfig

```javascript
// SeriesConfig structure:
// {
//   id: string,                // Unique identifier for the series
//   data: ScatterDataPoint[],  // Data points for this series
//   name?: string,             // Display name for the series (used in legend and tooltip)
//   color?: string,            // Custom color for this series
//   size?: number,             // Default point size for this series
//   shape?: 'circle' | 'square' | 'triangle' | 'diamond',  // Point shape
//   opacity?: number,          // Point opacity (0-1)
//   strokeWidth?: number,      // Point border width
//   strokeColor?: string       // Point border color
// }
```

### AxisProps

```javascript
// AxisProps structure:
// {
//   show?: boolean,           // Whether to show the axis
//   label?: string,           // Axis label text
//   tickFormat?: function,    // Format function for tick labels
//   tickCount?: number,       // Suggested number of ticks
//   domain?: [number, number] | [Date, Date],  // Custom domain for the axis
//   type?: 'linear' | 'log' | 'time',  // Scale type
//   color?: string,           // Axis line and text color
//   fontSize?: number,        // Font size for axis labels
//   fontFamily?: string       // Font family for axis labels
// }
```

### GridProps

```javascript
// GridProps structure:
// {
//   horizontal?: boolean,     // Show horizontal grid lines
//   vertical?: boolean,       // Show vertical grid lines
//   stroke?: string,          // Color of grid lines
//   strokeWidth?: number,     // Width of grid lines
//   strokeDasharray?: string  // Dash pattern for grid lines
// }
```

### TrendLineProps

```javascript
// TrendLineProps structure:
// {
//   show?: boolean,           // Whether to show the trend line
//   color?: string,           // Color of the trend line
//   strokeWidth?: number,     // Width of the trend line
//   strokeDasharray?: string, // Dash pattern for the trend line
//   type?: 'linear' | 'polynomial' | 'exponential'  // Type of trend line
// }
```

### BubbleChartConfig

```javascript
// BubbleChartConfig structure:
// {
//   enabled?: boolean,        // Whether to use variable point sizes (bubble chart mode)
//   minSize?: number,         // Minimum point size in pixels
//   maxSize?: number,         // Maximum point size in pixels
//   sizeScale?: 'linear' | 'sqrt' | 'log',  // Scale type for size mapping
//   sizeField?: string        // Field name in data to use for size (defaults to 'size')
// }
```

### ErrorBarConfig

```javascript
// ErrorBarConfig structure:
// {
//   enabled?: boolean,        // Whether to show error bars
//   color?: string,           // Color of error bars
//   strokeWidth?: number,     // Width of error bar lines
//   capSize?: number          // Size of error bar caps in pixels
// }
