import React from 'react';

export interface RadarChartDataPoint {
  axis: string;
  value: number;
}

export interface RadarChartSeries {
  name: string;
  dataPoints: RadarChartDataPoint[];
  color?: string; // Optional: color for this series
}

export interface RadarChartProps {
  data: RadarChartSeries[];
  size?: number; // Overall size of the chart
  axesLabels: string[]; // Labels for each axis, e.g., ['Strength', 'Dexterity', ...]
  maxValue?: number; // The maximum value any data point can take (for scaling)
  levels?: number; // Number of concentric circles/polygons for the grid
  showGrid?: boolean;
  showAxesLabels?: boolean;
  // Visual customization props to be added later
  // e.g., strokeWidth, fillOpacity, glow, shadow, etc.
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  axesLabels,
  maxValue,
  levels = 5,
  showGrid = true,
  showAxesLabels = true,
}) => {
  if (!data || data.length === 0 || !axesLabels || axesLabels.length === 0) {
    return <p>RadarChart: Insufficient data or axes labels provided.</p>;
  }

  const numAxes = axesLabels.length;
  const angleSlice = (Math.PI * 2) / numAxes;
  const radius = size / 2.5; // Effective radius for drawing
  const calculatedMaxValue =
    maxValue || Math.max(...data.flatMap((series) => series.dataPoints.map((dp) => dp.value)));

  // Basic SVG structure - actual drawing logic will be more complex
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {/* Grid lines - Placeholder */}
        {showGrid &&
          [...Array(levels)].map((_, i) => (
            <circle
              key={`grid-level-${i}`}
              r={(radius / levels) * (i + 1)}
              fill="none"
              stroke="#CDCDCD"
              strokeWidth="0.5"
            />
          ))}

        {/* Axes lines - Placeholder */}
        {axesLabels.map((label, i) => (
          <g key={`axis-${label}`}>
            <line
              x1={0}
              y1={0}
              x2={radius * Math.cos(angleSlice * i - Math.PI / 2)}
              y2={radius * Math.sin(angleSlice * i - Math.PI / 2)}
              stroke="#CDCDCD"
              strokeWidth="1"
            />
            {showAxesLabels && (
              <text
                x={radius * 1.1 * Math.cos(angleSlice * i - Math.PI / 2)}
                y={radius * 1.1 * Math.sin(angleSlice * i - Math.PI / 2)}
                dy="0.35em"
                textAnchor="middle"
                fontSize="10px"
                fill="#333"
              >
                {label}
              </text>
            )}
          </g>
        ))}

        {/* Data series - Placeholder */}
        {data.map((series, seriesIndex) => {
          // Placeholder for data points rendering
          // Actual path generation will require d3 or similar logic
          return (
            <g key={`series-${series.name}-${seriesIndex}`}>
              {/* Example: Draw a simple polygon - this will be replaced */}
              <polygon
                points={series.dataPoints
                  .map((dp, i) => {
                    const axisIndex = axesLabels.indexOf(dp.axis);
                    if (axisIndex === -1) return ''; // Should not happen with good data
                    const valueRatio = dp.value / calculatedMaxValue;
                    const x = radius * valueRatio * Math.cos(angleSlice * axisIndex - Math.PI / 2);
                    const y = radius * valueRatio * Math.sin(angleSlice * axisIndex - Math.PI / 2);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill={series.color || 'rgba(130, 100, 220, 0.5)'} // Default color
                stroke={series.color || 'rgba(130, 100, 220, 1)'} // Default color
                strokeWidth="1"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default RadarChart;
