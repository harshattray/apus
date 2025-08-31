# Range Chart

A Range Chart is used to display a range of values between a minimum and a maximum. It's particularly useful for visualizing data like high/low temperatures, blood pressure ranges, or stock price fluctuations over a period.

```jsx
const rangeData = [
  { day: 'Wed', range1: { min: 120, max: 140 }, range2: { min: 70, max: 90 } },
  { day: 'Thu', range1: { min: 115, max: 135 }, range2: { min: 65, max: 85 } },
  { day: 'Fri', range1: { min: 125, max: 145 }, range2: { min: 75, max: 95 } },
  { day: 'Sat', range1: { min: 130, max: 150 }, range2: { min: 80, max: 100 } },
  { day: 'Sun', range1: { min: 110, max: 130 }, range2: { min: 60, max: 80 } },
  { day: 'Mon', range1: { min: 135, max: 155 }, range2: { min: 85, max: 105 } },
  { day: 'Tue', range1: { min: 128, max: 148 }, range2: { min: 78, max: 98 } },
];
<RangeChart data={rangeData} width={600} height={400} color1="#f472b6" color2="#60a5fa" />
```

## Advanced Examples

*Examples temporarily removed for debugging*

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| **Core Props** | | | |
| `data` | `RangeChartDataItem[]` | - | Array of data items. Each item must have a `day` (string) and `range1`/`range2` objects with `min` and `max`. |
| `width` | `number` | `600` | The width of the chart SVG. |
| `height` | `number` | `400` | The height of the chart SVG. |
| `responsive` | `boolean` | `true` | If `true`, the chart will resize to fit its container. |
| `margin` | `{ top: number, right: number, bottom: number, left: number }` | `{ top: 20, right: 20, bottom: 30, left: 40 }` | The margin around the chart. |
| **Styling Props** | | | |
| `color1` | `string` | `'#8884d8'` | The color for the first data range (`range1`). |
| `color2` | `string` | `'#82ca9d'` | The color for the second data range (`range2`). |
| **Axes & Grid** | | | |
| `showXAxis` | `boolean` | `true` | Toggles the visibility of the X-axis. |
| `showYAxis` | `boolean` | `true` | Toggles the visibility of the Y-axis. |
| `showGridLines` | `boolean` | `true` | Toggles the visibility of the grid lines. |
| `xAxisTextColor` | `string` | `'#333'` | The color of the X-axis text labels. |
| `yAxisTextColor` | `string` | `'#333'` | The color of the Y-axis text labels. |
| `axisLineColor` | `string` | `'#ccc'` | The color of the axis lines. |
| `yAxisTicks` | `number` | `5` | The suggested number of ticks for the Y-axis. |
| **Tooltip Customization** | | | |
| `tooltipBackgroundColor` | `string` | `'rgba(0, 0, 0, 0.7)'` | Background color for the tooltip. |
| `tooltipTextColor` | `string` | `'white'` | Text color for the tooltip. |
| `tooltipPadding` | `string | number` | `'8px'` | Padding for the tooltip. |
| `tooltipBorderRadius` | `string | number` | `'4px'` | Border radius for the tooltip. |
| `tooltipBoxShadow` | `string` | `'none'` | Box shadow for the tooltip. |

