# Scatter Chart

A chart for displaying data as a collection of points.

## Usage

```jsx
import { ScatterChart } from 'apus-charts';

const scatterData = [
  { x: 10, y: 20, category: 'A' },
  { x: 15, y: 35, category: 'B' },
  { x: 20, y: 22, category: 'A' },
  // ... more data
];

<ScatterChart 
  data={scatterData} 
  colors={{ A: '#ff6384', B: '#36a2eb' }}
/>
```
