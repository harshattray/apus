# Apus - React Chart Library

A powerful and customizable chart library for React applications, built with D3.js and TypeScript.


<div align="center">
  <img src="https://raw.githubusercontent.com/harshattray/apus/master/public/apus.svg" alt="Apus Logo" width="200"/>
</div>


## Features

- 🎯 Built with React 18 and TypeScript
- 📊 Powered by D3.js for powerful data visualization
- 🎨 Customizable and responsive charts
- 📦 Lightweight and easy to integrate
- 🔍 Type-safe with TypeScript support
- 🎨 Modern UI components with Tailwind CSS

## Screenshots

![Interactive Line Chart with Multiple Datasets](https://raw.githubusercontent.com/harshattray/apus/master/screens/sc1.png)
*Interactive Line Chart with Multiple Datasets*

![Customizable Bar Chart with Tooltips](https://raw.githubusercontent.com/harshattray/apus/master/screens/sc2.png)
*Customizable Bar Chart with Tooltips*

![Advanced Scatter Plot with Regression Line](https://raw.githubusercontent.com/harshattray/apus/master/screens/sc3.png)
*Advanced Scatter Plot with Regression Line*

## Installation

```bash
npm install apus 
# or
yarn add apus
# or
pnpm add apus 
```

## Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "d3": "^7.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## Available Chart Types

### 1. Line Chart

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
  xAxisTextColor="#333333" // Color for X-axis labels
  yAxisTextColor="#333333" // Color for Y-axis labels
  axisLineColor="#666666" // Color for axis lines
/>
```

### 2. Bar Chart

```tsx
import { BarChart } from 'apus'; 

const barChartData = [
  { label: 'Category A', value: 10 },
  { label: 'Category B', value: 20 },
  { label: 'Category C', value: 15 },
];

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
```

## Component Props

Below are the props available for each chart component.

### `LineChartProps`

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
| `legendFontColor`      | `string`                                                             | `'#cccccc'`                           | Font color for the legend text.                                                                            |
| `xAxisTextColor`       | `string`                                                             | `'#cccccc'`                           | Color for X-axis tick labels.                                                                              |
| `yAxisTextColor`       | `string`                                                             | `'#cccccc'`                           | Color for Y-axis tick labels.                                                                              |
| `axisLineColor`        | `string`                                                             | `'#cccccc'`                           | Color for axis lines.                                                                                      |

### `BarChartProps`

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
| `xAxisTextColor`       | `string`                                                     | `'#cccccc'`                        | Color for X-axis tick labels.                                                                           |
| `yAxisTextColor`       | `string`                                                     | `'#cccccc'`                        | Color for Y-axis tick labels.                                                                           |
| `axisLineColor`        | `string`                                                     | `'#cccccc'`                        | Color for axis lines.                                                                                   |
| `yAxisTicks`           | `number`                                                     | `5`                                | Suggested number of ticks on the Y-axis.                                                                |
| `tooltipBackgroundColor` | `string`                                                     | `'rgba(0, 0, 0, 0.7)'`             | Background color for the tooltip.                                                                       |
| `tooltipTextColor`     | `string`                                                     | `'white'`                          | Text color for the tooltip.                                                                             |
| `tooltipPadding`       | `string`                                                     | `'8px'`                            | Padding for the tooltip.                                                                                |
| `tooltipBorderRadius`  | `string`                                                     | `'4px'`                            | Border radius for the tooltip.                                                                          |
| `tooltipFontSize`      | `string`                                                     | `'12px'`                           | Font size for the tooltip.                                                                              |
| `showLegend`           | `boolean`                                                    | `false`                            | Whether to display a legend for the chart.                                                              |
| `legendPosition`       | `'top' \| 'right' \| 'bottom' \| 'left'`                    | `'bottom'`                         | Position of the legend relative to the chart.                                                           |
| `legendFontSize`       | `string`                                                     | `'12px'`                           | Font size for the legend text.                                                                          |
| `legendFontColor`      | `string`                                                     | `'#cccccc'`                        | Font color for the legend text.                                                                         |
| `legendLabels`         | `string[]`                                                   | `undefined`                        | Optional custom labels for the legend. If not provided, data labels will be used.                       |

## Advanced Usage Examples

### 1. Custom Styling with Gradients (Line Chart)

```tsx
<LineChart
  data={lineChartData} // Assuming lineChartData is defined as in the example above
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

### 2. Custom Styling with Multiple Colors (Bar Chart)

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

### 3. Charts with Legends

#### Line Chart with Legend

```tsx
// Multi-series line chart with legend on the right
const multiSeriesData = [
  {
    name: 'Series A',
    values: [
      { label: 'Jan', value: 30 },
      { label: 'Feb', value: 45 },
      { label: 'Mar', value: 40 },
      { label: 'Apr', value: 55 },
      { label: 'May', value: 50 },
    ],
  },
  {
    name: 'Series B',
    values: [
      { label: 'Jan', value: 60 },
      { label: 'Feb', value: 50 },
      { label: 'Mar', value: 65 },
      { label: 'Apr', value: 70 },
      { label: 'May', value: 68 },
    ],
  },
];

<LineChart
  data={multiSeriesData}
  width={700}
  height={400}
  lineColors={['#3b82f6', '#f59e0b']}
  showLegend={true}
  legendPosition="right" // Options: 'top', 'right', 'bottom', 'left'
  legendFontColor="#666666"
  legendFontSize="14px"
/>
```

#### Bar Chart with Legend

```tsx
// Bar chart with custom legend labels at the bottom
const barData = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
  { label: 'C', value: 15 },
  { label: 'D', value: 25 },
  { label: 'E', value: 30 },
];

<BarChart
  data={barData}
  width={600}
  height={400}
  color={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
  showLegend={true}
  legendPosition="bottom" // Options: 'top', 'right', 'bottom', 'left'
  legendFontColor="#666666"
  // Optional custom legend labels
  legendLabels={['Category A', 'Category B', 'Category C', 'Category D', 'Category E']}
/>
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/harshattray/apus.git
cd apus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build the library:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Make sure to update tests as appropriate.

## License

[MIT](LICENSE) 

## Changelog

### 0.1.9 (2025-05-30)
- Fixed: LineChart component is now properly exported in TypeScript declaration files
- Improved: Type declaration generation with enhanced build configuration

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/harshattray/apus/issues) on GitHub.

## Author

- GitHub: [@harshattray](https://github.com/harshattray)
- Medium: [@Harshattray](https://medium.com/@Harshattray)
