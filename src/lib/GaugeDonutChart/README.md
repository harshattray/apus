# GaugeDonutChart

A semi-circular gauge chart for displaying progress or metrics. Supports various arc types (half, quarter), interactive slices, tooltips, gradients, and theme customization.

## Props

| Prop                   | Type                                                         | Default Value                      | Description                                                                                             |
|------------------------|--------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `data`                 | `GaugeDonutData[]`                                          | `[]`                               | Array of data points (label-value pairs). Each point can have an optional color or gradient.            |
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
| `showLegend`           | `boolean`                                                    | `true`                             | Whether to show the legend.                                                                             |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                    | `'bottom'`                         | Position of the legend relative to the chart.                                                           |
| `legendFontSize`       | `string`                                                     | `'14px'`                           | Font size for the legend text.                                                                          |
| `legendFontColor`      | `string`                                                     | (theme-based)                      | Color for the legend text.                                                                              |
| `showTooltip`          | `boolean`                                                    | `true`                             | Whether to show tooltips on hover.                                                                      |
| `theme`                | `'light' \| 'dark'`                                        | `'light'`                          | Theme for the chart.                                                                                    |
| `className`            | `string`                                                     | `''`                               | Additional CSS class name for the container.                                                            |
| `style`                | `React.CSSProperties`                                        | `{}`                               | Additional CSS styles for the container.                                                                |

## Data Types

### GaugeDonutData
```typescript
type GaugeDonutData = {
  label: string;
  value: number;
  color?: string;
  gradient?: GradientStop[];
};
```

### GradientStop
```typescript
type GradientStop = {
  offset: string;  // e.g., "0%", "50%", "100%"
  color: string;   // e.g., "#ff0000", "rgb(255,0,0)"
  opacity?: number; // optional, defaults to 1
};
```

## Usage Example

```tsx
import { GaugeDonutChart } from 'apus';

// Using solid colors
const gaugeData = [
  { label: 'Completed', value: 75, color: '#4ECDC4' },
  { label: 'Remaining', value: 25, color: '#FF6B6B' },
];

// Using gradients
const gradientData = [
  {
    label: 'Completed',
    value: 75,
    gradient: [
      { offset: '0%', color: '#4ECDC4' },
      { offset: '100%', color: '#2E8B84' }
    ]
  },
  {
    label: 'Remaining',
    value: 25,
    gradient: [
      { offset: '0%', color: '#FF6B6B' },
      { offset: '100%', color: '#CC5555' }
    ]
  }
];

<GaugeDonutChart
  data={gradientData}
  width={400}
  height={400}
  variant="half-bottom"
  innerRadius={0.6}
  outerRadius={0.8}
  cornerRadius={10}
  centerLabel="Progress"
  centerValue="75%"
  onSliceClick={(data) => console.log('Clicked:', data)}
  showLegend={true}
  legendPosition="bottom"
  legendFontSize="14px"
  showTooltip={true}
  theme="light"
/>
```

## Advanced Usage: Custom Styling and Different Variants

```tsx
const gaugeData = [
  {
    label: 'Completed',
    value: 75,
    gradient: [
      { offset: '0%', color: '#4ECDC4', opacity: 0.8 },
      { offset: '50%', color: '#4ECDC4' },
      { offset: '100%', color: '#2E8B84' }
    ]
  },
  {
    label: 'Remaining',
    value: 25,
    gradient: [
      { offset: '0%', color: '#FF6B6B', opacity: 0.8 },
      { offset: '50%', color: '#FF6B6B' },
      { offset: '100%', color: '#CC5555' }
    ]
  }
];

<GaugeDonutChart
  data={gaugeData}
  width={500}
  height={500}
  variant="quarter-bottom-right"
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
  showLegend={true}
  legendPosition="right"
  legendFontSize="16px"
  legendFontColor="#333"
  showTooltip={true}
  theme="dark"
  style={{
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
  }}
/>
``` 