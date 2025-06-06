# GaugeDonutChart

A semi-circular gauge chart for displaying progress or metrics. Supports various arc types (half, quarter), interactive slices, tooltips, and theme customization.

## Props

| Prop                   | Type                                                         | Default Value                      | Description                                                                                             |
|------------------------|--------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `data`                 | `GaugeDonutData[]`                                          | `[]`                               | Array of data points (label-value pairs).                                                               |
| `width`                | `number`                                                     | `400`                              | Width of the chart.                                                                                     |
| `height`               | `number`                                                     | `400`                              | Height of the chart.                                                                                    |
| `variant`              | `'full' \| 'half-bottom' \| 'half-top' \| 'half-left' \| 'half-right' \| 'quarter-bottom-right' \| 'quarter-top-right' \| 'quarter-bottom-left' \| 'quarter-top-left'` | `'full'` | Type of gauge arc.                                                                                     |
| `colors`               | `string[]`                                                   | (D3 schemeCategory10)              | Array of colors for the slices. Colors will cycle if there are more data points than colors.            |
| `innerRadius`          | `number`                                                     | `0.6`                              | Inner radius of the gauge (0-1, relative to outer radius).                                              |
| `outerRadius`          | `number`                                                     | `0.8`                              | Outer radius of the gauge (0-1, relative to chart size).                                                |
| `cornerRadius`         | `number`                                                     | `10`                               | Corner radius for the slices.                                                                           |
| `padAngle`             | `number`                                                     | `0.02`                             | Padding angle between slices in radians.                                                                |
| `centerLabel`          | `string`                                                     | `undefined`                        | Text to display in the center of the gauge.                                                             |
| `centerValue`          | `string \| number`                                         | `undefined`                        | Value to display in the center of the gauge.                                                            |
| `onSliceClick`         | `(data: GaugeDonutData) => void`                            | `undefined`                        | Callback function when a slice is clicked.                                                              |
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
import { GaugeDonutChart } from 'apus';

const gaugeData = [
  { label: 'Completed', value: 75 },
  { label: 'Remaining', value: 25 },
];

<GaugeDonutChart
  data={gaugeData}
  width={400}
  height={400}
  variant="half-bottom"
  colors={['#4ECDC4', '#FF6B6B']}
  innerRadius={0.6}
  outerRadius={0.8}
  cornerRadius={10}
  centerLabel="Progress"
  centerValue="75%"
  onSliceClick={(data) => console.log('Clicked:', data)}
  legendPosition="bottom"
  theme="light"
/>
```

## Advanced Usage: Custom Styling and Different Variants

```tsx
const gaugeData = [
  { label: 'Completed', value: 75 },
  { label: 'Remaining', value: 25 },
];

<GaugeDonutChart
  data={gaugeData}
  width={500}
  height={500}
  variant="quarter-bottom-right"
  colors={['#4ECDC4', '#FF6B6B']}
  innerRadius={0.5}
  outerRadius={0.9}
  cornerRadius={15}
  padAngle={0.03}
  centerLabel="Progress"
  centerValue="75%"
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