# LineChart

A versatile chart for displaying trends over time or continuous data. Supports multiple series, area fills, point highlighting, and various customization options for lines, areas, axes, and tooltips.

## Props

| Prop                   | Type                                                                 | Default Value                         | Description                                                                                                |
|------------------------|----------------------------------------------------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------|
| `ariaLabel`            | `string`                                                             | `'Line chart'`                        | Optional ARIA label for accessibility.                                                                     |
| `data`                 | `{ name: string; values: { label: string \| number; value: number }[] }[]` | `[]`                                  | Array of data series. Each series has a name and an array of values (label-value pairs).                   |
| `width`                | `number`                                                             | `600`                                 | Width of the chart.                                                                                        |
| `height`               | `number`                                                             | `400`                                 | Height of the chart.                                                                                       |
| `lineColors`           | `string \| string[]`                                               | (D3 default scheme)                   | Color(s) for the lines. Can be a single string or an array for multiple series.                            |
| `areaColor`            | `string`                                                             | `'rgba(70, 130, 180, 0.3)'`           | Fill color for the area under the line. Used if `showArea` is true and `areaGradientColors` is not set.    |
| `pointColor`           | `string`                                                             | `'#88b0de'`                           | Color for the data points.                                                                                 |
| `margin`               | `{ top: number; right: number; bottom: number; left: number }`      | `{ top: 20, right: 30, bottom: 30, left: 40 }` | Margins around the chart plotting area.                                                                    |
| `yAxisTicks`           | `number`                                                             | `5`                                   | Suggested number of ticks on the Y-axis.                                                                   |
| `showXAxis`            | `boolean`                                                            | `true`                                | Whether to display the X-axis.                                                                             |
| `showYAxis`            | `boolean`                                                            | `true`                                | Whether to display the Y-axis.                                                                             |
| `showGridLines`        | `boolean`                                                            | `false`                               | Whether to display grid lines.                                                                             |
| `tooltipBackgroundColor` | `string`                                                             | `'#333333'`                           | Background color for the tooltip.                                                                          |
| `tooltipTextColor`     | `string`                                                             | `'#ffffff'`                           | Text color for the tooltip.                                                                                |
| `tooltipPadding`       | `string`                                                             | `'8px'`                               | Padding for the tooltip.                                                                                   |
| `tooltipBorderRadius`  | `string`                                                             | `'4px'`                               | Border radius for the tooltip.                                                                             |
| `tooltipFontSize`      | `string`                                                             | `'12px'`                              | Font size for the tooltip.                                                                                 |
| `areaGradientColors`   | `string[]`                                                           | `undefined`                           | Array of colors for area gradient (e.g., `['#startColor', '#endColor']`). Overrides `areaColor` if provided. | 
| `lineGradientColors`   | `string[]`                                                           | `undefined`                           | Array of colors for line gradient (e.g., `['#startColor', '#endColor']`). Overrides `lineColors` if provided. | 
| `showArea`             | `boolean`                                                            | `true`                                | Whether to display the area under the line.                                                                |
| `responsive`           | `boolean`                                                            | `true`                                | Whether the chart should be responsive to its container's width.                                           |
| `showLegend`           | `boolean`                                                            | `false`                               | Whether to display a legend for the chart.                                                                 |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                             | `'bottom'`                            | Position of the legend relative to the chart.                                                              |
| `legendFontSize`       | `string`                                                             | `'12px'`                              | Font size for the legend text.                                                                             |
| `legendFontColor`      | `string`                                                             | `'#333333'`                           | Font color for the legend text. (Note: Main README had '#cccccc', using a more readable default here)      |
| `xAxisTextColor`       | `string`                                                             | `'#333333'`                           | Color for X-axis tick labels. (Note: Main README had '#cccccc', using a more readable default here)        |
| `yAxisTextColor`       | `string`                                                             | `'#333333'`                           | Color for Y-axis tick labels. (Note: Main README had '#cccccc', using a more readable default here)        |
| `axisLineColor`        | `string`                                                             | `'#cccccc'`                           | Color for axis lines.                                                                                      |

## Usage Example

```tsx
import { LineChart } from 'apus'; 

const lineChartData = [
  {
    name: 'Series 1',
    values: [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 40 },
      { label: 'Mar', value: 35 },
    ],
  },
  {
    name: 'Series 2',
    values: [
      { label: 'Jan', value: 50 },
      { label: 'Feb', value: 60 },
      { label: 'Mar', value: 55 },
    ],
  },
];

<LineChart
  data={lineChartData}
  width={600}
  height={400}
  lineColors={['#1f77b4', '#ff7f0e']} // Different color for each line series
  showArea={true}
  areaColor="rgba(70, 130, 180, 0.1)" // A light blue area fill
  pointColor="#88b0de" // Color for data points
  showGridLines={true}
  responsive={true}
  ariaLabel="Sales trend over months"
  xAxisTextColor="#333333"
  yAxisTextColor="#333333"
  axisLineColor="#666666"
  showLegend={true}
  legendPosition="top"
/>
```

## Advanced Usage: Custom Styling with Gradients

```tsx
const lineChartData = [
  {
    name: 'Series 1',
    values: [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 40 },
      { label: 'Mar', value: 35 },
    ],
  },
  {
    name: 'Series 2',
    values: [
      { label: 'Jan', value: 50 },
      { label: 'Feb', value: 60 },
      { label: 'Mar', value: 55 },
    ],
  },
];

<LineChart
  data={lineChartData} // Now lineChartData is defined within this block
  width={800}
  height={500}
  lineGradientColors={['#FF5733', '#C70039']} // Apply a gradient to the line
  areaGradientColors={['rgba(255, 87, 51, 0.4)', 'rgba(199, 0, 57, 0.1)']} // Apply a gradient to the area
  showArea={true}
  pointColor="#FFC300"
  tooltipBackgroundColor="#2C3E50"
  tooltipTextColor="#ECF0F1"
  yAxisTicks={10} // More ticks on Y-axis
  xAxisTextColor="#34495E" // Dark blue-gray for X-axis labels
  yAxisTextColor="#34495E" // Dark blue-gray for Y-axis labels
  axisLineColor="#7F8C8D" // Medium gray for axis lines
  showLegend={true}
  legendPosition="right"
  legendFontColor="#34495E"
/>
```
