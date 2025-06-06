# NestedDonutChart

A multi-level donut chart for displaying hierarchical or nested data. Supports multiple concentric rings, interactive slices, tooltips, and theme customization.

## Features

- Multiple concentric rings for hierarchical data visualization
- Interactive slices with hover effects and click handlers
- Tooltips showing detailed information
- Per-level legends with value and percentage display
- Customizable colors for each level
- Center label and value display
- Responsive sizing
- Dark mode compatible

## Props

| Prop                   | Type                                                         | Default Value                      | Description                                                                                             |
|------------------------|--------------------------------------------------------------|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `levels`               | `NestedDonutLevelData[]`                                    | `[]`                               | Array of data arrays, one for each ring level.                                                          |
| `width`                | `number`                                                     | `400`                              | Width of the chart.                                                                                     |
| `height`               | `number`                                                     | `400`                              | Height of the chart.                                                                                    |
| `colors`               | `string[][]`                                                 | (D3 schemeCategory10)              | Array of color arrays, one per level. Colors will cycle if there are more data points than colors.      |
| `centerLabel`          | `string`                                                     | `undefined`                        | Text to display in the center of the chart.                                                             |
| `centerValue`          | `string \| number`                                         | `undefined`                        | Value to display in the center of the chart.                                                            |
| `onSliceClick`         | `(level: number, data: { label: string; value: number; color?: string }) => void` | `undefined` | Callback function when a slice is clicked.                                                      |
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
import { NestedDonutChart } from 'apus';

const nestedData = [
  // Level 1 (outer ring)
  [
    { label: 'Category A', value: 40 },
    { label: 'Category B', value: 30 },
    { label: 'Category C', value: 30 },
  ],
  // Level 2 (middle ring)
  [
    { label: 'Sub A1', value: 20 },
    { label: 'Sub A2', value: 20 },
    { label: 'Sub B1', value: 15 },
    { label: 'Sub B2', value: 15 },
    { label: 'Sub C1', value: 15 },
    { label: 'Sub C2', value: 15 },
  ],
  // Level 3 (inner ring)
  [
    { label: 'Detail A1.1', value: 10 },
    { label: 'Detail A1.2', value: 10 },
    { label: 'Detail A2.1', value: 10 },
    { label: 'Detail A2.2', value: 10 },
    { label: 'Detail B1.1', value: 7.5 },
    { label: 'Detail B1.2', value: 7.5 },
    { label: 'Detail B2.1', value: 7.5 },
    { label: 'Detail B2.2', value: 7.5 },
    { label: 'Detail C1.1', value: 7.5 },
    { label: 'Detail C1.2', value: 7.5 },
    { label: 'Detail C2.1', value: 7.5 },
    { label: 'Detail C2.2', value: 7.5 },
  ],
];

<NestedDonutChart
  levels={nestedData}
  width={500}
  height={500}
  colors={[
    ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    ['#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#20BF55', '#0B1354'],
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#20BF55', '#0B1354', '#FF6B6B', '#4ECDC4', '#45B7D1']
  ]}
  centerLabel="Total"
  centerValue="100%"
  onSliceClick={(level, data) => console.log('Clicked:', level, data)}
  legendPosition="right"
  theme="light"
/>
```

## Advanced Usage: Custom Styling and Interactions

```tsx
const nestedData = [
  // Level 1 (outer ring)
  [
    { label: 'Category A', value: 40 },
    { label: 'Category B', value: 30 },
    { label: 'Category C', value: 30 },
  ],
  // Level 2 (middle ring)
  [
    { label: 'Sub A1', value: 20 },
    { label: 'Sub A2', value: 20 },
    { label: 'Sub B1', value: 15 },
    { label: 'Sub B2', value: 15 },
    { label: 'Sub C1', value: 15 },
    { label: 'Sub C2', value: 15 },
  ],
  // Level 3 (inner ring)
  [
    { label: 'Detail A1.1', value: 10 },
    { label: 'Detail A1.2', value: 10 },
    { label: 'Detail A2.1', value: 10 },
    { label: 'Detail A2.2', value: 10 },
    { label: 'Detail B1.1', value: 7.5 },
    { label: 'Detail B1.2', value: 7.5 },
    { label: 'Detail B2.1', value: 7.5 },
    { label: 'Detail B2.2', value: 7.5 },
    { label: 'Detail C1.1', value: 7.5 },
    { label: 'Detail C1.2', value: 7.5 },
    { label: 'Detail C2.1', value: 7.5 },
    { label: 'Detail C2.2', value: 7.5 },
  ],
];

<NestedDonutChart
  levels={nestedData}
  width={600}
  height={600}
  colors={[
    ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    ['#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#20BF55', '#0B1354'],
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF9F1C', '#2EC4B6', '#E71D36', '#011627', '#20BF55', '#0B1354', '#FF6B6B', '#4ECDC4', '#45B7D1']
  ]}
  centerLabel="Distribution"
  centerValue="100%"
  onSliceClick={(level, data) => {
    console.log('Clicked level:', level);
    console.log('Clicked data:', data);
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

## Types

```typescript
type NestedDonutLevelData = { label: string; value: number; color?: string }[];

interface NestedDonutChartProps {
  levels: NestedDonutLevelData[];
  width?: number;
  height?: number;
  colors?: string[][];
  centerLabel?: string;
  centerValue?: string | number;
  onSliceClick?: (level: number, data: { label: string; value: number; color?: string }) => void;
}

interface NestedDonutChartRendererProps extends NestedDonutChartProps {
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}
```

## Styling

The chart uses inline styles for basic styling. You can customize the appearance by:

1. Overriding the styles in your CSS
2. Using the `className` prop to apply custom styles
3. Modifying the component's style objects directly

## Best Practices

1. Keep the number of levels reasonable (2-3 levels recommended)
2. Use contrasting colors for different levels
3. Ensure data values are properly normalized within each level
4. Consider using the center space to display summary information
5. Use tooltips to show detailed information for each slice
6. Choose an appropriate legend position based on your layout:
   - Use 'top' or 'bottom' for wider charts
   - Use 'left' or 'right' for taller charts
7. Consider the theme based on your application's design:
   - Use 'light' theme for light backgrounds
   - Use 'dark' theme for dark backgrounds 