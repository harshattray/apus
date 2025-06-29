# ScatterChart

A scatter chart component for visualizing data points in a two-dimensional space. ScatterChart is ideal for showing the relationship between two variables and identifying patterns, clusters, or outliers in your data.

## Features

- Interactive data points with hover and click events
- Customizable colors by category
- Optional trend line with regression analysis
- Responsive tooltips with customizable formatting
- Configurable axes with labels and tick formatting
- Optional legend with customizable positioning
- Grid lines for better readability

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Required Props** |||||
| `data` | `ScatterDataPoint[]` | | Array of data points to visualize. Each point must have `x`, `y`, and `category` properties. |
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
| `onLegendItemClick` | `(category: string \| null) => void` | | Callback when a legend item is clicked. |
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

## Type Definitions

### ScatterDataPoint

```typescript
interface ScatterDataPoint {
  x: number | Date;  // X-coordinate value (can be a number or Date)
  y: number;         // Y-coordinate value
  category: string;  // Category for grouping and coloring
  label?: string;    // Optional label for the data point
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
