# FunnelChart

A React component for rendering funnel charts using D3.js.

## Installation

```bash
npm install apus
# or
yarn add apus
```

## Usage

```tsx
import { FunnelChart } from 'apus';

const data = [
  { label: 'Visits', value: 1000 },
  { label: 'Signups', value: 500 },
  { label: 'Purchases', value: 100 },
];

function App() {
  return (
    <FunnelChart
      data={data}
      width={600}
      height={400}
      showValues={true}
      valueFormat={(value) => value.toLocaleString()}
      onSliceClick={(data) => { /* console.log('Clicked:', data); */ }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `FunnelData[]` | Required | Array of data points for the funnel chart |
| width | `number` | 600 | Width of the chart in pixels |
| height | `number` | 400 | Height of the chart in pixels |
| margin | `{ top: number, right: number, bottom: number, left: number }` | `{ top: 20, right: 20, bottom: 30, left: 40 }` | Margins around the chart |
| showValues | `boolean` | true | Whether to show value labels on the segments |
| valueFormat | `(value: number) => string` | `(value) => value.toString()` | Function to format the displayed values |
| onSliceClick | `(data: FunnelData) => void` | undefined | Callback when a segment is clicked |
| className | `string` | undefined | Additional CSS class name |
| style | `React.CSSProperties` | undefined | Additional CSS styles |

## FunnelData Interface

```typescript
interface FunnelData {
  label: string;    // The label for this segment
  value: number;    // The value for this segment
  color?: string;   // Optional custom color for this segment
}
```

## Features

- Responsive design
- Customizable colors
- Value labels
- Click interactions
- Custom value formatting
- Axes with labels 