# BarChart

Ideal for comparing discrete categories. Supports single or multiple colors, responsiveness, and customization for axes, grid lines, and tooltips.

## Props

| Prop                   | Type                                                         | Default Value                      | Description                                                                                             |
|------------------------|--------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `ariaLabel`            | `string`                                                     | `'Bar chart'`                      | Optional ARIA label for accessibility.                                                                  |
| `data`                 | `{ label: string; value: number }[]`                         | `[]`                               | Array of data points (label-value pairs).                                                               |
| `width`                | `number`                                                     | `600`                              | Width of the chart.                                                                                     |
| `height`               | `number`                                                     | `400`                              | Height of the chart.                                                                                    |
| `color`                | `string \| string[]`                                       | `'#6a93d1'`                        | Color(s) for the bars. Can be a single string or an array for multiple bars (colors will cycle).        |
| `gradientColors`       | `string[]`                                                   | `undefined`                        | Array of colors for bar gradient (e.g., `['#startColor', '#endColor']`). Overrides `color` if provided.    |
| `margin`               | `{ top: number; right: number; bottom: number; left: number }` | `{ top: 20, right: 30, bottom: 30, left: 40 }` | Margins around the chart plotting area.                                                                 |
| `responsive`           | `boolean`                                                    | `true`                             | Whether the chart should be responsive to its container's width.                                        |
| `showXAxis`            | `boolean`                                                    | `true`                             | Whether to display the X-axis.                                                                          |
| `showYAxis`            | `boolean`                                                    | `true`                             | Whether to display the Y-axis.                                                                          |
| `showGridLines`        | `boolean`                                                    | `false`                            | Whether to display grid lines.                                                                          |
| `xAxisTextColor`       | `string`                                                     | `'#333333'`                        | Color for X-axis tick labels. (Note: Main README had '#cccccc', using a more readable default here)       |
| `yAxisTextColor`       | `string`                                                     | `'#333333'`                        | Color for Y-axis tick labels. (Note: Main README had '#cccccc', using a more readable default here)       |
| `axisLineColor`        | `string`                                                     | `'#cccccc'`                        | Color for axis lines.                                                                                   |
| `yAxisTicks`           | `number`                                                     | `5`                                | Suggested number of ticks on the Y-axis.                                                                |
| `tooltipBackgroundColor` | `string`                                                     | `'rgba(0, 0, 0, 0.7)'`             | Background color for the tooltip.                                                                       |
| `tooltipTextColor`     | `string`                                                     | `'white'`                          | Text color for the tooltip.                                                                             |
| `tooltipPadding`       | `string`                                                     | `'8px'`                            | Padding for the tooltip.                                                                                |
| `tooltipBorderRadius`  | `string`                                                     | `'4px'`                            | Border radius for the tooltip.                                                                          |
| `tooltipFontSize`      | `string`                                                     | `'12px'`                           | Font size for the tooltip.                                                                              |
| `showLegend`           | `boolean`                                                    | `false`                            | Whether to display a legend for the chart. (Note: Bar charts typically don't need a legend unless colors represent categories within a single bar series, which is not the current setup). |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                    | `'bottom'`                         | Position of the legend relative to the chart.                                                           |
| `legendFontSize`       | `string`                                                     | `'12px'`                           | Font size for the legend text.                                                                          |
| `legendFontColor`      | `string`                                                     | `'#333333'`                        | Font color for the legend text. (Note: Main README had '#cccccc', using a more readable default here)     |
| `legendLabels`         | `string[]`                                                   | `undefined`                        | Optional custom labels for the legend. If not provided, data labels will be used.                       |

## Usage Example

```tsx
import { BarChart } from 'apus'; 

const barChartData = [
  { label: 'Category A', value: 10 },
  { label: 'Category B', value: 20 },
  { label: 'Category C', value: 15 },
];

const MyBarChart = () => (
  <BarChart
    data={barChartData}
    width={600}
    height={400}
    color="#6a93d1" // Single color for all bars
    // or use an array for multiple colors: color={['#ff0000', '#00ff00', '#0000ff']}
    showGridLines={true}
    xAxisTextColor="#333333"
    yAxisTextColor="#333333"
    responsive={true}
    ariaLabel="Comparison of categories"
  />
);

export default MyBarChart;
```

## Advanced Usage: Custom Styling with Multiple Colors

```tsx
<BarChart
  data={barChartData} // Assuming barChartData is defined as in the example above
  width={700}
  height={450}
  color={['#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845']} // Colors will cycle for bars
  showGridLines={true}
  axisLineColor="#BDC3C7"
  xAxisTextColor="#7F8C8D"
  yAxisTextColor="#7F8C8D"
  margin={{ top: 30, right: 40, bottom: 50, left: 60 }} // Custom margins
/>
```
