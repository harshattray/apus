import React, { useState } from 'react';
import { ScatterChart, ScatterHoveredData } from 'apus';

const scatterData = [
  { x: 10, y: 20, category: 'A' },
  { x: 15, y: 35, category: 'A' },
  { x: 20, y: 25, category: 'A' },
  { x: 30, y: 45, category: 'B' },
  { x: 35, y: 60, category: 'B' },
  { x: 40, y: 50, category: 'B' },
  { x: 50, y: 70, category: 'C' },
  { x: 55, y: 85, category: 'C' },
  { x: 60, y: 75, category: 'C' },
];

const dateScatterData = [
  { x: new Date('2023-01-01'), y: 120, category: 'X' },
  { x: new Date('2023-02-01'), y: 150, category: 'X' },
  { x: new Date('2023-03-01'), y: 135, category: 'X' },
  { x: new Date('2023-04-01'), y: 180, category: 'Y' },
  { x: new Date('2023-05-01'), y: 210, category: 'Y' },
  { x: new Date('2023-06-01'), y: 190, category: 'Y' },
];

const ScatterChartExamples = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleLegendClick = (category: string | null) => {
    setSelected(category);
  };

  const tooltipFormatter = (d: ScatterHoveredData): string => {
    const xValue = d.x instanceof Date ? d.x.toLocaleDateString() : d.x;
    return `
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <span style="width: 10px; height: 10px; background-color: #4287f5; border-radius: 50%; margin-right: 8px;"></span>
        <strong style="color: #333;">${d.category}</strong>
      </div>
      <div style="color: #666;">X: ${xValue}</div>
      <div style="color: #666;">Y: ${d.y}</div>
    `;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <h2>Scatter Chart Examples</h2>

      <div>
        <h3>Basic Scatter Chart</h3>
        <ScatterChart
          data={scatterData}
          width={700}
          height={400}
          colors={['#8884d8', '#82ca9d', '#ffc658']}
          showLegend
          showTooltip
        />
      </div>

      <div>
        <h3>Scatter Chart with Trend Line</h3>
        <ScatterChart
          data={scatterData.filter((d) => d.category === 'B')}
          width={700}
          height={400}
          colors={['#ff7300']}
          showLegend={false}
          trendLine={{ show: true, color: '#d00000' }}
          xAxis={{ label: 'X-Axis Value' }}
          yAxis={{ label: 'Y-Axis Value' }}
        />
      </div>

      <div>
        <h3>Interactive Legend & Custom Tooltip</h3>
        <ScatterChart
          data={scatterData}
          width={700}
          height={400}
          colors={['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)']}
          showLegend
          clickableLegend
          onLegendItemClick={handleLegendClick}
          showTooltip
          tooltipBackgroundColor="#FFFFFF"
          tooltipTextColor="#333333"
          tooltipPadding="10px"
          tooltipBorderRadius="4px"
          tooltipFormat={tooltipFormatter}
        />
      </div>

      <div>
        <h3>Date-based X-Axis</h3>
        <ScatterChart
          data={dateScatterData}
          width={700}
          height={400}
          colors={['#0088FE', '#00C49F']}
          showLegend
          legendPosition="top"
          xAxis={{
            label: 'Date',
            tickFormat: (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          }}
          yAxis={{
            label: 'Value',
          }}
          showTooltip
          tooltipFormat={tooltipFormatter}
        />
      </div>
    </div>
  );
};

export default ScatterChartExamples;
