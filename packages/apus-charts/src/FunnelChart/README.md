# Funnel Charts

Apus provides three types of funnel charts for different use cases:
- **FunnelChart**: Basic funnel for sequential/conversion data
- **TimeSeriesFunnelChart**: Funnels over time periods
- **SegmentedFunnelChart**: Funnels with breakdowns by segment/channel

---

## FunnelChart
A simple funnel chart for displaying conversion stages or sequential data.

### Props
| Prop                    | Type                                                        | Default Value                      | Description                                      |
|-------------------------|-------------------------------------------------------------|------------------------------------|--------------------------------------------------|
| `data`                  | `FunnelData[]`                                              | `[]`                               | Array of data points (label-value pairs).        |
| `width`                 | `number`                                                    | `600`                              | Width of the chart.                              |
| `height`                | `number`                                                    | `400`                              | Height of the chart.                             |
| `margin`                | `{ top: number, right: number, bottom: number, left: number }` | `{ top: 20, right: 20, bottom: 30, left: 40 }` | Margins around the chart. |
| `showValues`            | `boolean`                                                   | `true`                             | Show value labels on the segments.               |
| `valueFormat`           | `(value: number) => string`                                 | `(value) => value.toString()`      | Format function for values.                      |
| `onSliceClick`          | `(data: FunnelData) => void`                                | `undefined`                        | Callback when a segment is clicked.             |
| `className`             | `string`                                                    | `undefined`                        | Additional CSS class name.                       |
| `style`                 | `React.CSSProperties`                                       | `undefined`                        | Additional CSS styles.                           |
| `tooltipBackgroundColor`| `string`                                                    | `'#333'`                           | Tooltip background color.                        |
| `tooltipTextColor`      | `string`                                                    | `'#fff'`                           | Tooltip text color.                              |
| `showLegend`            | `boolean`                                                   | `true`                             | Show the legend.                                 |
| `legendPosition`        | `'top' \| 'right' \| 'bottom' \| 'left'`                   | `'bottom'`                         | Legend position.                                 |
| `clickableLegend`       | `boolean`                                                   | `true`                             | Legend items are clickable.                      |
| `onLegendItemClick`     | `(data: FunnelData \| null) => void`                       | `undefined`                        | Callback for legend item click.                  |
| `enableGradients`       | `boolean`                                                   | `true`                             | Enable gradient fills.                           |
| `gradientDirection`     | `'vertical' \| 'horizontal'`                               | `'vertical'`                       | Gradient direction.                              |
| `segmentShadowColor`    | `string`                                                    | `'rgba(0, 0, 0, 0.3)'`            | Segment shadow color.                            |
| `segmentShadowBlur`     | `number`                                                    | `8`                                | Shadow blur radius.                              |
| `segmentShadowOffsetY`  | `number`                                                    | `10`                               | Shadow vertical offset.                          |

### Example
```tsx
import { FunnelChart } from 'apus';

const funnelData = [
  { label: 'Website Visits', value: 10000 },
  { label: 'Sign-ups', value: 5000 },
  { label: 'Free Trials', value: 2000 },
  { label: 'Paid Subscriptions', value: 500 },
];

<FunnelChart
  data={funnelData}
  width={600}
  height={400}
  showValues={true}
  valueFormat={(value) => value.toLocaleString()}
  tooltipBackgroundColor="#333"
  tooltipTextColor="#fff"
  showLegend={true}
  legendPosition="bottom"
  clickableLegend={true}
  onLegendItemClick={(data) => console.log('Legend clicked:', data)}
  enableGradients={true}
  gradientDirection="vertical"
  segmentShadowColor="rgba(0, 0, 0, 0.3)"
  segmentShadowBlur={8}
  segmentShadowOffsetY={10}
/>
```

---

## TimeSeriesFunnelChart
A funnel chart that shows data across multiple time periods, useful for tracking conversion rates over time.

### Props
| Prop                    | Type                                                        | Default Value                      | Description                                      |
|-------------------------|-------------------------------------------------------------|------------------------------------|--------------------------------------------------|
| `seriesData`            | `TimeSeriesFunnelData[]`                                    | `[]`                               | Array of time series data points.                |
| `chartWidth`            | `number`                                                    | `300`                              | Width of each individual chart.                  |
| `chartHeight`           | `number`                                                    | `250`                              | Height of each individual chart.                 |
| `spacing`               | `number`                                                    | `30`                               | Space between charts.                            |
| `showValues`            | `boolean`                                                   | `true`                             | Show value labels.                               |
| `valueFormat`           | `(value: number) => string`                                 | `(value) => value.toString()`      | Format function for values.                      |
| `tooltipBackgroundColor`| `string`                                                    | `'#333'`                           | Tooltip background color.                        |
| `tooltipTextColor`      | `string`                                                    | `'#fff'`                           | Tooltip text color.                              |
| `isDarkMode`            | `boolean`                                                   | `false`                            | Use dark mode styling.                           |
| `enableGradients`       | `boolean`                                                   | `true`                             | Enable gradient fills.                           |
| `gradientDirection`     | `'vertical' \| 'horizontal'`                               | `'vertical'`                       | Gradient direction.                              |
| `segmentShadowColor`    | `string`                                                    | `'rgba(0, 0, 0, 0.2)'`            | Segment shadow color.                            |
| `segmentShadowBlur`     | `number`                                                    | `5`                                | Shadow blur radius.                              |
| `segmentShadowOffsetY`  | `number`                                                    | `5`                                | Shadow vertical offset.                          |
| `showLegend`            | `boolean`                                                   | `true`                             | Show the legend.                                 |
| `legendPosition`        | `'top' \| 'right' \| 'bottom' \| 'left'`                   | `'bottom'`                         | Legend position.                                 |
| `clickableLegend`       | `boolean`                                                   | `true`                             | Legend items are clickable.                      |
| `onLegendItemClick`     | `(data: FunnelData \| null) => void`                       | `undefined`                        | Callback for legend item click.                  |

### Example
```tsx
import { TimeSeriesFunnelChart } from 'apus';

const timeSeriesData = [
  {
    periodLabel: 'Day 1 (2023-01-01)',
    data: [
      { label: 'Visits', value: 1000, color: '#4287f5' },
      { label: 'Sign-ups', value: 500, color: '#f5a442' },
      { label: 'Purchases', value: 100, color: '#87f542' },
    ],
  },
  {
    periodLabel: 'Day 2 (2023-01-02)',
    data: [
      { label: 'Visits', value: 1200, color: '#4287f5' },
      { label: 'Sign-ups', value: 600, color: '#f5a442' },
      { label: 'Purchases', value: 150, color: '#87f542' },
    ],
  },
];

<TimeSeriesFunnelChart
  seriesData={timeSeriesData}
  chartWidth={300}
  chartHeight={250}
  spacing={30}
  showValues={true}
  valueFormat={(value) => value.toLocaleString()}
  tooltipBackgroundColor="#333"
  tooltipTextColor="#fff"
  isDarkMode={false}
  enableGradients={true}
  gradientDirection="vertical"
  segmentShadowColor="rgba(0, 0, 0, 0.2)"
  segmentShadowBlur={5}
  segmentShadowOffsetY={5}
  showLegend={true}
  legendPosition="bottom"
  clickableLegend={true}
  onLegendItemClick={(data) => console.log('Legend clicked:', data)}
/>
```

---

## SegmentedFunnelChart
A funnel chart that breaks down each stage into segments, perfect for analyzing channel-specific conversion rates.

### Props
| Prop                    | Type                                                        | Default Value                      | Description                                      |
|-------------------------|-------------------------------------------------------------|------------------------------------|--------------------------------------------------|
| `data`                  | `SegmentedFunnelStage[]`                                    | `[]`                               | Array of funnel stages with segments.            |
| `width`                 | `number`                                                    | `800`                              | Width of the chart.                              |
| `height`                | `number`                                                    | `500`                              | Height of the chart.                             |
| `margin`                | `{ top: number, right: number, bottom: number, left: number }` | `{ top: 20, right: 20, bottom: 30, left: 20 }` | Margins around the chart. |
| `showValues`            | `boolean`                                                   | `true`                             | Show value labels.                               |
| `valueFormat`           | `(value: number) => string`                                 | `(value) => value.toString()`      | Format function for values.                      |
| `tooltipBackgroundColor`| `string`                                                    | `'#333'`                           | Tooltip background color.                        |
| `tooltipTextColor`      | `string`                                                    | `'#fff'`                           | Tooltip text color.                              |
| `isDarkMode`            | `boolean`                                                   | `false`                            | Use dark mode styling.                           |
| `enableGradients`       | `boolean`                                                   | `true`                             | Enable gradient fills.                           |
| `gradientDirection`     | `'vertical' \| 'horizontal'`                               | `'vertical'`                       | Gradient direction.                              |
| `segmentShadowColor`    | `string`                                                    | `'rgba(0, 0, 0, 0.25)'`           | Segment shadow color.                            |
| `segmentShadowBlur`     | `number`                                                    | `6`                                | Shadow blur radius.                              |
| `segmentShadowOffsetY`  | `number`                                                    | `6`                                | Shadow vertical offset.                          |
| `showTrendIndicators`   | `boolean`                                                   | `true`                             | Show trend indicators.                           |
| `showMiniCharts`        | `boolean`                                                   | `true`                             | Show mini charts.                                |
| `showAnalytics`         | `boolean`                                                   | `true`                             | Show analytics.                                  |
| `miniChartHeight`       | `number`                                                    | `40`                               | Height of mini charts.                           |
| `trendIndicatorSize`    | `number`                                                    | `10`                               | Size of trend indicators.                        |
| `analyticsDisplayMode`  | `'inline' \| 'tooltip' \| 'both'`                          | `'both'`                           | Analytics display mode.                          |
| `showLegend`            | `boolean`                                                   | `true`                             | Show the legend.                                 |
| `legendPosition`        | `'top' \| 'right' \| 'bottom' \| 'left'`                   | `'bottom'`                         | Legend position.                                 |
| `clickableLegend`       | `boolean`                                                   | `true`                             | Legend items are clickable.                      |
| `onLegendItemClick`     | `(data: FunnelData \| null) => void`                       | `undefined`                        | Callback for legend item click.                  |

### Example
```tsx
import { SegmentedFunnelChart } from 'apus';

const segmentedData = [
  {
    label: 'Website Visits',
    segments: [
      {
        channel: 'Organic',
        value: 5000,
        color: '#4287f5',
        trend: {
          value: 5000,
          previousValue: 4500,
          change: 500,
          changePercentage: 11.1,
        },
        historicalData: [
          { timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 4500 },
          { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 4600 },
        ],
        analytics: {
          performance: {
            conversionRate: 50,
            averageValue: 4750,
            peakValue: 5000,
            trend: {
              value: 5000,
              previousValue: 4500,
              change: 500,
              changePercentage: 11.1,
            },
          },
          contribution: {
            percentageOfTotal: 50,
            relativeToPrevious: 110,
          },
          correlation: {
            correlationScore: 0.85,
            relatedSegments: [
              { segmentId: 'paid', correlationValue: 0.75 },
              { segmentId: 'referral', correlationValue: 0.65 },
            ],
          },
        },
      },
    ],
  },
];

<SegmentedFunnelChart
  data={segmentedData}
  width={800}
  height={500}
  margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
  showValues={true}
  valueFormat={(value) => value.toLocaleString()}
  tooltipBackgroundColor="#333"
  tooltipTextColor="#fff"
  isDarkMode={false}
  enableGradients={true}
  gradientDirection="vertical"
  segmentShadowColor="rgba(0, 0, 0, 0.25)"
  segmentShadowBlur={6}
  segmentShadowOffsetY={6}
  showTrendIndicators={true}
  showMiniCharts={true}
  showAnalytics={true}
  miniChartHeight={40}
  trendIndicatorSize={10}
  analyticsDisplayMode="both"
  showLegend={true}
  legendPosition="bottom"
  clickableLegend={true}
  onLegendItemClick={(data) => console.log('Legend clicked:', data)}
/>
```

---

## Data Types

### FunnelData
```typescript
interface FunnelData {
  label: string;    // The label for this segment
  value: number;    // The value for this segment
  color?: string;   // Optional custom color for this segment
}
```

### TimeSeriesFunnelData
```typescript
interface TimeSeriesFunnelData {
  periodLabel: string;  // Label for the time period
  data: FunnelData[];   // Array of funnel data for this period
}
```

### SegmentedFunnelStage
```typescript
interface SegmentedFunnelStage {
  label: string;           // Label for this stage
  segments: SegmentedFunnelSegment[];  // Array of segments in this stage
}

interface SegmentedFunnelSegment {
  channel: string;         // Channel identifier
  value: number;           // Value for this segment
  color?: string;          // Optional custom color
  trend?: {
    value: number;
    previousValue: number;
    change: number;
    changePercentage: number;
  };
  historicalData?: {
    timestamp: number;
    value: number;
  }[];
  analytics?: {
    performance: {
      conversionRate: number;
      averageValue: number;
      peakValue: number;
      trend: {
        value: number;
        previousValue: number;
        change: number;
        changePercentage: number;
      };
    };
    contribution: {
      percentageOfTotal: number;
      relativeToPrevious: number;
    };
    correlation: {
      correlationScore: number;
      relatedSegments: {
        segmentId: string;
        correlationValue: number;
      }[];
    };
  };
}
``` 