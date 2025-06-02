# Radar Chart

A Radar Chart (also known as a spider chart or star chart) is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

## Example Usage

```jsx
const radarChartData = [
  {
    name: 'Player A',
    color: 'rgba(255, 99, 132, 0.6)', // Example color
    dataPoints: [
      { axis: 'Shooting', value: 80 },
      { axis: 'Passing', value: 65 },
      { axis: 'Dribbling', value: 70 },
      { axis: 'Defense', value: 50 },
      { axis: 'Pace', value: 90 },
      { axis: 'Physical', value: 75 },
    ],
  },
  {
    name: 'Player B',
    color: 'rgba(54, 162, 235, 0.6)', // Example color
    dataPoints: [
      { axis: 'Shooting', value: 70 },
      { axis: 'Passing', value: 85 },
      { axis: 'Dribbling', value: 60 },
      { axis: 'Defense', value: 70 },
      { axis: 'Pace', value: 80 },
      { axis: 'Physical', value: 85 },
    ],
  },
];

const axes = ['Shooting', 'Passing', 'Dribbling', 'Defense', 'Pace', 'Physical'];

<RadarChart data={radarChartData} axesLabels={axes} size={400} maxValue={100} />
```

## Props

| Prop                      | Type                                       | Default                                  | Description                                                                                                |
|---------------------------|--------------------------------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Core Props**            |                                            |                                          |                                                                                                            |
| `data`                    | `RadarChartSeries[]`                       | -                                        | Array of data series. Each series has `name`, `color` (optional), and `dataPoints` (`axis`, `value`).      |
| `size`                    | `number`                                   | `300`                                    | Overall width and height of the chart.                                                                     |
| `axesLabels`              | `string[]`                                 | -                                        | Array of strings for axis labels.                                                                          |
| `maxValue`                | `number`                                   | `auto`                                   | Maximum value for scaling. Auto-calculated if not provided.                                                |
| `levels`                  | `number`                                   | `5`                                      | Number of concentric grid levels.                                                                          |
| **Series Styling**        |                                            |                                          |                                                                                                            |
| `seriesFillOpacity`       | `number`                                   | `0.3`                                    | Opacity of the filled area for each series.                                                                |
| `seriesStrokeWidth`       | `number`                                   | `2`                                      | Stroke width for the series path.                                                                          |
| `seriesHoverStrokeWidth`  | `number`                                   | `2.5`                                    | Stroke width for the series path on hover.                                                                 |
| `enableSeriesShadow`      | `boolean`                                  | `false`                                  | Enables a drop shadow for the series paths.                                                                |
| `seriesShadowColor`       | `string`                                   | `'rgba(0,0,0,0.35)'`                     | Color of the series shadow.                                                                                |
| `seriesShadowBlur`        | `number`                                   | `4`                                      | Blur radius for the series shadow.                                                                         |
| `seriesShadowOffsetX`     | `number`                                   | `0`                                      | Horizontal offset for the series shadow.                                                                   |
| `seriesShadowOffsetY`     | `number`                                   | `0`                                      | Vertical offset for the series shadow.                                                                     |
| `enableSeriesGlow`        | `boolean`                                  | `false`                                  | Enables a glow effect for the series paths.                                                                |
| `seriesGlowColor`         | `string`                                   | Series color (via filter)                | Color of the series glow. (Note: current SVG filter uses series color by default, this prop is for future filter enhancements) |
| `seriesGlowBlur`          | `number`                                   | `5`                                      | Blur radius for the series glow SVG filter.                                                                |
| `seriesGlowOffsetX`       | `number`                                   | `0`                                      | Horizontal offset for the series glow (for advanced filter use).                                           |
| `seriesGlowOffsetY`       | `number`                                   | `0`                                      | Vertical offset for the series glow (for advanced filter use).                                             |
| `seriesGlowOpacity`       | `number`                                   | `0.75`                                   | Opacity for the series glow (for advanced filter use).                                                     |
| **Tooltip Customization** |                                            |                                          |                                                                                                            |
| `tooltipBackgroundColor`  | `string`                                   | `'rgba(50, 50, 50, 0.85)'`               | Background color for the default tooltip.                                                                  |
| `tooltipTextColor`        | `string`                                   | `'#FFFFFF'`                              | Text color for the default tooltip.                                                                        |
| `tooltipPadding`          | `string`                                   | `'8px 12px'`                             | Padding for the default tooltip.                                                                           |
| `tooltipBorderRadius`     | `string`                                   | `'6px'`                                  | Border radius for the tooltip container.                                                                   |
| `tooltipFontSize`         | `string`                                   | `'12px'`                                 | Font size for the default tooltip.                                                                         |
| `tooltipFormat`           | `(data: HoveredDataInfo) => string`        | `undefined`                              | Custom function to generate HTML content for the tooltip. Overrides default styling if used.             |
| **Hover Points**          |                                            |                                          |                                                                                                            |
| `showHoverPoints`         | `boolean`                                  | `false`                                  | Whether to display visible circles at data points on hover.                                                |
| `hoverPointRadius`        | `number`                                   | `8`                                      | Radius of the visible hover points.                                                                        |
| `hoverPointFill`          | `string`                                   | Series color / default                   | Fill color of the visible hover points. Defaults to a semi-transparent version of the series color.        |
| `hoverPointStroke`        | `string`                                   | `'rgba(0,0,0,0.3)'`                      | Stroke color of the visible hover points.                                                                  |
| `hoverPointStrokeWidth`   | `number`                                   | `1`                                      | Stroke width of the visible hover points.                                                                  |
| `hoverTargetRadius`       | `number`                                   | `10`                                     | Radius of the invisible hover target circles for triggering tooltips.                                      |
| **Grid Customization**    |                                            |                                          |                                                                                                            |
| `showGrid`                | `boolean`                                  | `true`                                   | Whether to display the background grid.                                                                    |
| `gridStrokeColor`         | `string`                                   | `'#CDCDCD'`                              | Color of the grid lines.                                                                                   |
| `gridStrokeWidth`         | `number`                                   | `0.5`                                    | Stroke width of the grid lines.                                                                            |
| `gridLineStyle`           | `'solid' \| 'dashed' \| 'dotted'`         | `'solid'`                                | Style of the grid lines.                                                                                   |
| **Axes Customization**    |                                            |                                          |                                                                                                            |
| `showAxesLabels`          | `boolean`                                  | `true`                                   | Whether to display the labels for each axis.                                                               |
| `axisLabelColor`          | `string`                                   | `'#333333'`                              | Color of the axis labels.                                                                                  |
| `axisLabelFontSize`       | `string`                                   | `'10px'`                                 | Font size of the axis labels.                                                                              |
| `axisLabelFontFamily`     | `string`                                   | `'sans-serif'`                           | Font family of the axis labels.                                                                            |
| `axisLabelOffset`         | `number`                                   | `10`                                     | Offset of axis labels from the chart edge.                                                                 |
| `axisLineColor`           | `string`                                   | `'#B0B0B0'`                              | Color of the radial axis lines.                                                                            |
| `axisLineWidth`           | `number`                                   | `1`                                      | Stroke width of the radial axis lines.                                                                     |
| `showAxisLines`           | `boolean`                                  | `true`                                   | Whether to display the radial axis lines.                                                                  |
| **Legend Customization**  |                                            |                                          |                                                                                                            |
| `showLegend`             | `boolean`        | `false`                                 | Whether to display the legend. |
| `legendPosition`         | `'top' \| 'bottom' \| 'left' \| 'right'`         | `'bottom'`                              | Position of the legend. |
| `legendTitle`            | `string`         | `undefined`                             | Optional title for the legend. |
| `legendTitleColor`       | `string`         | Theme-dependent              | Color of the legend title. Defaults to a color that contrasts with the background. |
| `legendTitleFontSize`    | `string`         | `'14px'`                                | Font size of the legend title. |
| `legendTitleFontFamily`  | `string`         | `'sans-serif'`                          | Font family of the legend title. |
| `legendItemColor`        | `string`         | Theme-dependent              | Color of the legend item text. Defaults to a color that contrasts with the background. |
| `legendItemFontSize`     | `string`         | `'12px'`                                | Font size of the legend item text. |
| `legendItemFontFamily`   | `string`         | `'sans-serif'`                          | Font family of the legend item text. |
| `legendSwatchSize`       | `number`         | `12`                                    | Diameter of the circular color swatches in pixels. |
| `legendSwatchBorderColor`| `string`         | `'transparent'`                         | Border color of the legend swatches. |
| `legendSwatchBorderWidth`| `number`         | `0`                                     | Border width of the legend swatches in pixels. |
| `legendGap`              | `number`         | `8`                                     | Gap between legend items in pixels. |
| `legendPadding`          | `string \| number` | `'10px'`                                | Padding around the legend block (e.g., `'10px'` or `10`). |
| **Interactive Legend & Highlighting** |                               |                                   | |
| `clickableLegend`        | `boolean`        | `false`                                 | Enables legend items to be clicked to highlight/select a series. |
| `selectedSeriesFillOpacity` | `number`         | `0.7`                                   | Fill opacity for the selected series. |
| `selectedSeriesStrokeWidth` | `number`         | `3`                                     | Stroke width for the selected series. |
| `deselectedSeriesFillOpacity` | `number`         | `0.15`                                  | Fill opacity for non-selected series when a selection is active. |
| `deselectedSeriesStrokeWidth` | `number`         | `1`                                     | Stroke width for non-selected series when a selection is active. |
| `onLegendItemClick`      | `(seriesName: string \| null) => void` | `undefined`                             | Callback function when a legend item is clicked. Receives the series name, or `null` if deselected. |


