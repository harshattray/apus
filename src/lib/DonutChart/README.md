# DonutChart

A versatile circular chart for displaying proportions of a whole. Supports interactive slices, tooltips, legends, and various customization options.

## Props

| Prop                   | Type                                                         | Default Value                      | Description                                                                                             |
|------------------------|--------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `data`                 | `DonutChartData[]`                                          | `[]`                               | Array of data points (label-value pairs).                                                               |
| `width`                | `number`                                                     | `400`                              | Width of the chart.                                                                                     |
| `height`               | `number`                                                     | `400`                              | Height of the chart.                                                                                    |
| `colors`               | `string[]`                                                   | (D3 schemeCategory10)              | Array of colors for the slices. Colors will cycle if there are more data points than colors.            |
| `innerRadius`          | `number`                                                     | `0.6`                              | Inner radius of the donut (0-1, relative to outer radius).                                              |
| `outerRadius`          | `number`                                                     | `0.8`                              | Outer radius of the donut (0-1, relative to chart size).                                                |
| `cornerRadius`         | `number`                                                     | `0`                                | Corner radius for the slices.                                                                           |
| `padAngle`             | `number`                                                     | `0.02`                             | Padding angle between slices in radians.                                                                |
| `centerLabel`          | `string`                                                     | `undefined`                        | Text to display in the center of the donut.                                                             |
| `centerValue`          | `string \| number`                                         | `undefined`                        | Value to display in the center of the donut.                                                            |
| `onSliceClick`         | `(data: DonutChartData) => void`                            | `undefined`                        | Callback function when a slice is clicked.                                                              |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                    | `'bottom'`                         | Position of the legend relative to the chart.                                                           |
| `theme`                | `'light' \| 'dark'`                                        | `'light'`                          | Theme for the chart.                                                                                    |
| `className`            | `string`                                                     | `''`                               | Additional CSS class name for the container.                                                            |
| `style`                | `React.CSSProperties`                                        | `{}`                               | Additional CSS styles for the container.                                                                |
| `tooltipBackgroundColor` | `string`                                                     | `'rgba(0, 0, 0, 0.85)'`            | Background color for the tooltip.                                                                       |
| `tooltipTextColor`     | `string`                                                     | `'#fff'`                           | Text color for the tooltip.                                                                             |
| `tooltipPadding`       | `string`                                                     | `'8px 12px'`                       | Padding for the tooltip.                                                                                |
| `tooltipBorderRadius`  | `string`                                                     | `'6px'`                            | Border radius for the tooltip.                                                                          |
| `tooltipFontSize`      | `string`                                                     | `'14px'`                           | Font size for the tooltip.                                                                              |

## Usage Example

```tsx
import { DonutChart } from 'apus';

const donutData = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 40 },
  { label: 'Category C', value: 20 },
  { label: 'Category D', value: 10 },
];

<DonutChart
  data={donutData}
  width={400}
  height={400}
  colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
  innerRadius={0.6}
  outerRadius={0.8}
  cornerRadius={5}
  centerLabel="Total"
  centerValue="100"
  onSliceClick={(data) => console.log('Clicked:', data)}
  legendPosition="right"
  theme="light"
/>
```

## Advanced Usage: Custom Styling and Interactions

```tsx
const donutData = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 40 },
  { label: 'Category C', value: 20 },
  { label: 'Category D', value: 10 },
];

<DonutChart
  data={donutData}
  width={500}
  height={500}
  colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
  innerRadius={0.5}
  outerRadius={0.9}
  cornerRadius={10}
  padAngle={0.03}
  centerLabel="Distribution"
  centerValue="100%"
  onSliceClick={(data) => {
    console.log('Clicked slice:', data);
    // Add your custom click handling logic
  }}
  legendPosition="right"
  theme="dark"
  tooltipBackgroundColor="rgba(0, 0, 0, 0.9)"
  tooltipTextColor="#ffffff"
  tooltipPadding="12px 16px"
  tooltipBorderRadius="8px"
  tooltipFontSize="14px"
  style={{
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  }}
/>
```
