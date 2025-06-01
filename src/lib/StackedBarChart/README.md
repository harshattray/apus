# StackedBarChart

The `StackedBarChart` component is used to display data as a series of stacked bars, suitable for showing parts of a whole or comparing cumulative totals across different categories.

## Props

| Prop                   | Type                                                                 | Default Value                         | Description                                                                                                                               |
|------------------------|----------------------------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `data`                 | `StackedBarChartData[]`                                              | `[]`                                  | Array of data objects. Each object represents a category (e.g., a month), and its keys represent the segments to be stacked. Example: `{ month: 'Jan', apples: 10, oranges: 15 }` |
| `keys`                 | `string[]`                                                           | `[]`                                  | Array of string keys from the data objects that should be stacked (e.g., `['apples', 'oranges']`).                                          |
| `indexBy`              | `string`                                                             | `''`                                  | The key in each data object that represents the main category or index (e.g., `'month'`).                                                 |
| `width`                | `number`                                                             | `600`                                 | Width of the chart in pixels.                                                                                                             |
| `height`               | `number`                                                             | `400`                                 | Height of the chart in pixels.                                                                                                            |
| `layout`               | `'vertical' \| 'horizontal'`                                        | `'vertical'`                          | Orientation of the bars.                                                                                                                  |
| `margin`               | `{ top: number; right: number; bottom: number; left: number }`      | `{ top: 20, right: 20, bottom: 30, left: 40 }` | Margins around the chart's plotting area.                                                                                                 |
| `colors`               | `string[]`                                                           | (D3 schemeCategory10)                 | Array of color strings for the stacked segments. Colors will cycle if there are more keys than colors.                                    |
| `showGridLines`        | `boolean`                                                            | `false`                               | Whether to display grid lines on the chart.                                                                                               |
| `ariaLabel`            | `string`                                                             | `'StackedBarChart'`                   | ARIA label for accessibility.                                                                                                             |
| `responsive`           | `boolean`                                                            | `true`                                | Whether the chart should resize dynamically with its container.                                                                           |
| `showLegend`           | `boolean`                                                            | `true`                                | Whether to display the legend.                                                                                                            |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                             | `'bottom'`                            | Position of the legend relative to the chart.                                                                                             |
| `legendFontSize`       | `string`                                                             | `'12px'`                              | Font size for the legend text.                                                                                                            |
| `legendFontColor`      | `string`                                                             | `'#333333'`                           | Font color for the legend text.                                                                                                           |
| `showXAxis`            | `boolean`                                                            | `true`                                | Whether to display the X-axis.                                                                                                            |
| `showYAxis`            | `boolean`                                                            | `true`                                | Whether to display the Y-axis.                                                                                                            |
| `xAxisTextColor`       | `string`                                                             | `'#333333'`                           | Color for X-axis tick labels.                                                                                                             |
| `yAxisTextColor`       | `string`                                                             | `'#333333'`                           | Color for Y-axis tick labels.                                                                                                             |
| `axisLineColor`        | `string`                                                             | `'#cccccc'`                           | Color for the axis lines (domain).                                                                                                        |
| `yAxisTicks`           | `number`                                                             | `5`                                   | Suggested number of ticks on the Y-axis (or X-axis if horizontal layout).                                                                 |
| `tooltipBackgroundColor` | `string`                                                             | `'#333333'`                           | Background color for the tooltip.                                                                                                         |
| `tooltipTextColor`     | `string`                                                             | `'#ffffff'`                           | Text color for the tooltip.                                                                                                               |
| `tooltipPadding`       | `string`                                                             | `'8px'`                               | Padding inside the tooltip.                                                                                                               |
| `tooltipBorderRadius`  | `string`                                                             | `'4px'`                               | Border radius for the tooltip.                                                                                                            |
| `tooltipFontSize`      | `string`                                                             | `'12px'`                              | Font size for the tooltip text.                                                                                                           |
| `barCornerRadius`      | `number`                                                             | `0`                                   | Corner radius for the bars.                                                                                                               |
| `showValues`           | `boolean`                                                            | `false`                               | Whether to display the value of each segment on the bar.                                                                                  |
| `valuesFontSize`       | `string`                                                             | `'10px'`                              | Font size for the displayed values on bars.                                                                                               |
| `valuesFontColor`      | `string`                                                             | `'#333333'`                           | Font color for the displayed values on bars.                                                                                              |
| `barOpacity`           | `number`                                                             | `1`                                   | Opacity of the bars (0 to 1).                                                                                                             |
| `animationDuration`    | `number`                                                             | `750`                                 | Duration of the enter/update animations in milliseconds.                                                                                  |
| `visibleKeys`          | `string[]`                                                           | `undefined`                           | Initially visible keys for the legend. If undefined, all keys are visible. Allows controlled visibility.                                  |
| `setVisibleKeys`       | `React.Dispatch<React.SetStateAction<string[]>>`                     | `undefined`                           | Callback function to update the visible keys, used for interactive legends.                                                               |
| `tooltipComponent`     | `React.ComponentType<{ data: { id: string; value: number; indexValue: string; }; color: string; }>` | `undefined`                           | Optional custom React component to render the tooltip content.                                                                            |

## Usage Example

```tsx
import { StackedBarChart } from 'apus'; // Assuming 'apus' is your library name

const salesData = [
  { month: 'Jan', apples: 10, oranges: 20, bananas: 15 },
  { month: 'Feb', apples: 12, oranges: 18, bananas: 22 },
  { month: 'Mar', apples: 8, oranges: 25, bananas: 10 },
  { month: 'Apr', apples: 15, oranges: 15, bananas: 18 },
];

const fruitKeys = ['apples', 'oranges', 'bananas'];

const MyStackedChart = () => (
  <StackedBarChart
    data={salesData}
    keys={fruitKeys}
    indexBy="month"
    width={700}
    height={450}
    colors={['#4CAF50', '#FF9800', '#FFEB3B']}
    showGridLines={true}
    showLegend={true}
    legendPosition="top"
    ariaLabel="Monthly fruit sales"
  />
);

export default MyStackedChart;
```
