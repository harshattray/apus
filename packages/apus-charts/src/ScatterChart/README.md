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

```typescript
interface ScatterDataPoint {
  x: number | Date;  // X-coordinate value (can be a number or Date)
  y: number;         // Y-coordinate value
  category: string;  // Category for grouping and coloring
  label?: string;    // Optional label for the data point
  size?: number;     // Optional size value for bubble chart functionality
  xError?: number | [number, number] | number[];  // Optional x-axis error (symmetric or [negative, positive])
  yError?: number | [number, number] | number[];  // Optional y-axis error (symmetric or [negative, positive])
}
```

### SeriesConfig

```typescript
interface SeriesConfig {
  id: string;                // Unique identifier for the series
  data: ScatterDataPoint[];  // Data points for this series
  name?: string;             // Display name for the series (used in legend and tooltip)
  colors?: string[] | Record<string, string>;  // Colors specific to this series
  pointSize?: number;        // Point size specific to this series
  bubbleChart?: Partial<BubbleChartConfig>;  // Bubble chart config specific to this series
  errorBars?: Partial<ErrorBarConfig>;  // Error bars config specific to this series
  trendLine?: Partial<TrendLineProps>;  // Trend line config specific to this series
  visible?: boolean;         // Whether the series is visible (default: true)
}
```

### AxisProps

```typescript
interface AxisProps {
  show?: boolean;           // Whether to show the axis
  label?: string;           // Axis label text
  tickFormat?: (d: any) => string;  // Format function for tick labels
  stroke?: string;          // Color of the axis line
  tickColor?: string;       // Color of the tick marks
  labelColor?: string;      // Color of the axis label
  fontSize?: number;        // Font size for tick labels
  labelFontSize?: number;   // Font size for the axis label
  tickCount?: number;       // Number of ticks to display
}
```

### GridProps

```typescript
interface GridProps {
  horizontal?: boolean;     // Show horizontal grid lines
  vertical?: boolean;       // Show vertical grid lines
  stroke?: string;          // Color of grid lines
  strokeWidth?: number;     // Width of grid lines
  strokeDasharray?: string; // Dash pattern for grid lines
}
```

### TrendLineProps

```typescript
interface TrendLineProps {
  show?: boolean;           // Whether to show the trend line
  color?: string;           // Color of the trend line
  strokeWidth?: number;     // Width of the trend line
  strokeDasharray?: string; // Dash pattern for the trend line
}
```

### BubbleChartConfig

```typescript
interface BubbleChartConfig {
  enabled?: boolean;        // Whether to use variable point sizes (bubble chart mode)
  minSize?: number;         // Minimum point size in pixels
  maxSize?: number;         // Maximum point size in pixels
  sizeScale?: 'linear' | 'sqrt' | 'log';  // Scaling method for size values
  valueField?: 'size' | string;  // Field in data to use for size (defaults to 'size')
}
```

### ErrorBarConfig

```typescript
interface ErrorBarConfig {
  enabled?: boolean;        // Whether to show error bars
  color?: string;           // Color of error bars
  strokeWidth?: number;     // Width of error bar lines
  capWidth?: number;        // Width of the cap at the end of error bars
  opacity?: number;         // Opacity of error bars
  xAxis?: boolean;          // Show error bars on x-axis
  yAxis?: boolean;          // Show error bars on y-axis
  showCaps?: boolean;       // Whether to show caps at the end of error bars
}
```
