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

// Multiple series data
const seriesData = [
  {
    id: 'series1',
    name: 'Series A',
    colors: { A: '#FF6384', B: '#FF6384', C: '#FF6384', D: '#FF6384' },
    data: [
      { x: 10, y: 20, category: 'A' },
      { x: 15, y: 25, category: 'B' },
      { x: 20, y: 30, category: 'C' },
      { x: 25, y: 35, category: 'D' },
    ],
    pointSize: 8,
  },
  {
    id: 'series2',
    name: 'Series B',
    colors: { A: '#36A2EB', B: '#36A2EB', C: '#36A2EB', D: '#36A2EB' },
    data: [
      { x: 12, y: 22, category: 'A' },
      { x: 17, y: 27, category: 'B' },
      { x: 22, y: 32, category: 'C' },
      { x: 27, y: 37, category: 'D' },
    ],
    pointSize: 6,
  },
  {
    id: 'series3',
    name: 'Series C',
    colors: { A: '#FFCE56', B: '#FFCE56', C: '#FFCE56', D: '#FFCE56' },
    data: [
      { x: 14, y: 24, category: 'A' },
      { x: 19, y: 29, category: 'B' },
      { x: 24, y: 34, category: 'C' },
      { x: 29, y: 39, category: 'D' },
    ],
    pointSize: 7,
  },
] as any;

// Multiple series with error bars data
const seriesWithErrorBarsData = [
  {
    id: 'series1',
    name: 'Series A',
    colors: { A: '#FF6384', B: '#FF6384', C: '#FF6384', D: '#FF6384' },
    data: [
      { x: 10, y: 20, category: 'A', xError: 2, yError: 3 },
      { x: 15, y: 25, category: 'B', xError: 1.5, yError: 2.5 },
      { x: 20, y: 30, category: 'C', xError: [1, 2], yError: [2, 3] },
      { x: 25, y: 35, category: 'D', xError: 1, yError: 2 },
    ],
    pointSize: 8,
    errorBars: {
      color: '#FF6384',
      strokeWidth: 1.5,
      opacity: 0.8,
      capWidth: 8,
    },
  },
  {
    id: 'series2',
    name: 'Series B',
    colors: { A: '#36A2EB', B: '#36A2EB', C: '#36A2EB', D: '#36A2EB' },
    data: [
      { x: 12, y: 22, category: 'A', xError: 1, yError: 2 },
      { x: 17, y: 27, category: 'B', xError: [0.5, 1.5], yError: 1.5 },
      { x: 22, y: 32, category: 'C', xError: 1.2, yError: [1, 2] },
      { x: 27, y: 37, category: 'D', xError: 0.8, yError: 1.8 },
    ],
    pointSize: 6,
    errorBars: {
      color: '#36A2EB',
      strokeWidth: 1.2,
      opacity: 0.7,
      capWidth: 6,
    },
  },
  {
    id: 'series3',
    name: 'Series C',
    colors: { A: '#FFCE56', B: '#FFCE56', C: '#FFCE56', D: '#FFCE56' },
    data: [
      { x: 14, y: 24, category: 'A', xError: 1.5, yError: 2.5 },
      { x: 19, y: 29, category: 'B', xError: 1, yError: 2 },
      { x: 24, y: 34, category: 'C', xError: [1, 1.5], yError: [1.5, 2.5] },
      { x: 29, y: 39, category: 'D', xError: 0.5, yError: 1.5 },
    ],
    pointSize: 7,
    errorBars: {
      color: '#FFCE56',
      strokeWidth: 1.3,
      opacity: 0.75,
      capWidth: 7,
    },
  },
] as any;

const ScatterChartExamples = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({});

  const handleLegendClick = (category: string | null, seriesId?: string) => {
    setSelected(category);
  };

  const handleSeriesToggle = (seriesId: string, visible: boolean) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [seriesId]: visible,
    }));
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

      <div>
        <h3>Multiple Series Scatter Chart</h3>
        <ScatterChart
          series={seriesData}
          width={700}
          height={400}
          showLegend={true}
          legendPosition="right"
          xAxis={{ label: 'X-Axis Value' }}
          yAxis={{ label: 'Y-Axis Value' }}
          showTooltip={true}
          tooltipBackgroundColor="#FFFFFF"
          tooltipTextColor="#333333"
          tooltipBorderRadius="4px"
          tooltipPadding="10px"
          tooltipFormat={(data: ScatterHoveredData) => `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <strong style="color: #333;">${(data as any).seriesName || (data as any).seriesId || 'Unknown'}</strong>
            </div>
            <div style="color: #666;">Category: ${data.category}</div>
            <div style="color: #666;">X: ${data.x}</div>
            <div style="color: #666;">Y: ${data.y}</div>
          `}
        />
      </div>

      <div>
        <h3>Multiple Series with Error Bars</h3>
        <ScatterChart
          series={seriesWithErrorBarsData}
          width={700}
          height={400}
          showLegend={true}
          legendPosition="right"
          xAxis={{ label: 'X-Axis Value' }}
          yAxis={{ label: 'Y-Axis Value' }}
          showTooltip={true}
          errorBars={{
            enabled: true,
            color: '#555555',
            strokeWidth: 1,
            opacity: 0.6,
            capWidth: 5,
            showCaps: true,
          }}
          tooltipBackgroundColor="#FFFFFF"
          tooltipTextColor="#333333"
          tooltipBorderRadius="4px"
          tooltipPadding="10px"
          tooltipFormat={(data: ScatterHoveredData) => `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <strong style="color: #333;">${(data as any).seriesName || (data as any).seriesId || 'Unknown'}</strong>
            </div>
            <div style="color: #666;">Category: ${data.category}</div>
            <div style="color: #666;">X: ${data.x} ${(data as any).xError ? `± ${Array.isArray((data as any).xError) ? `${(data as any).xError[0]},${(data as any).xError[1]}` : (data as any).xError}` : ''}</div>
            <div style="color: #666;">Y: ${data.y} ${(data as any).yError ? `± ${Array.isArray((data as any).yError) ? `${(data as any).yError[0]},${(data as any).yError[1]}` : (data as any).yError}` : ''}</div>
          `}
        />
      </div>

      <div>
        <h3>Bubble Chart Example</h3>
        <ScatterChart
          data={[
            { x: 10, y: 20, category: 'A', size: 30 },
            { x: 15, y: 35, category: 'A', size: 45 },
            { x: 20, y: 25, category: 'A', size: 25 },
            { x: 30, y: 45, category: 'B', size: 60 },
            { x: 35, y: 60, category: 'B', size: 35 },
            { x: 40, y: 50, category: 'B', size: 50 },
            { x: 50, y: 70, category: 'C', size: 70 },
            { x: 55, y: 85, category: 'C', size: 20 },
            { x: 60, y: 75, category: 'C', size: 40 },
          ]}
          width={700}
          height={400}
          colors={['#8884d8', '#82ca9d', '#ffc658']}
          showLegend
          bubbleChart={{
            enabled: true,
            minSize: 10,
            maxSize: 50,
            sizeScale: 'sqrt',
          }}
          xAxis={{ label: 'X-Axis Value' }}
          yAxis={{ label: 'Y-Axis Value' }}
          showTooltip
          tooltipBackgroundColor="#FFFFFF"
          tooltipTextColor="#333333"
          tooltipBorderRadius="4px"
          tooltipPadding="10px"
          tooltipFormat={(data: ScatterHoveredData) => `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <strong style="color: #333;">${data.category}</strong>
            </div>
            <div style="color: #666;">X: ${data.x}</div>
            <div style="color: #666;">Y: ${data.y}</div>
            <div style="color: #666;">Size: ${(data as any).size}</div>
          `}
        />
      </div>
    </div>
  );
};

export default ScatterChartExamples;
