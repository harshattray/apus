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

| Prop           | Type                               | Default | Description                                                                 |
|----------------|------------------------------------|---------|-----------------------------------------------------------------------------|
| `data`         | `RadarChartSeries[]`               | -       | Array of data series to display. Each series has a name and dataPoints.     |
| `size`         | `number`                           | `300`   | The overall width and height of the chart.                                  |
| `axesLabels`   | `string[]`                         | -       | An array of strings representing the labels for each axis.                  |
| `maxValue`     | `number`                           | auto    | The maximum value for scaling. If not provided, it's derived from data.   |
| `levels`       | `number`                           | `5`     | Number of concentric grid levels (circles/polygons).                        |
| `showGrid`     | `boolean`                          | `true`  | Whether to display the background grid.                                     |
| `showAxesLabels`| `boolean`                          | `true`  | Whether to display the labels for each axis.                                |

More visual customization props will be added for features like glows, shadows, custom line styles, etc.
