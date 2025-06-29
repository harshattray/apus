# Scatter Chart

A chart for displaying data as a collection of points.

## Usage

```jsx
import React from 'react';
import { ScatterChart } from 'apus';

const Example = () => {
  const scatterData = [
    { x: 10, y: 20, category: 'A' },
    { x: 15, y: 35, category: 'B' },
    { x: 20, y: 22, category: 'A' },
    { x: 25, y: 40, category: 'B' },
    { x: 30, y: 15, category: 'A' },
    { x: 35, y: 28, category: 'B' },
    { x: 40, y: 32, category: 'A' },
  ];

  return (
    <ScatterChart 
      data={scatterData} 
      width={600}
      height={400}
      colors={{ A: '#ff6384', B: '#36a2eb' }}
      showTooltip={true}
      xAxis={{ title: 'X Axis' }}
      yAxis={{ title: 'Y Axis' }}
      showLegend={true}
    />
  );
};

<Example />
```
