import React from 'react';
import * as d3 from 'd3';
import { NestedDonutChartProps } from './types';
import { NestedDonutChartRenderer } from './NestedDonutChartRenderer';

// Internal component for the actual chart rendering
const NestedDonutChartInternal: React.FC<NestedDonutChartProps> = ({
  levels,
  width = 400,
  height = 400,
  colors,
  centerLabel,
  centerValue,
  onSliceClick,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const ringWidth = Math.min(width, height) / (2 * (levels.length + 1));
  const [highlightLabel, setHighlightLabel] = React.useState<string | null>(null);
  const [tooltip, setTooltip] = React.useState<null | {
    x: number;
    y: number;
    label: string;
    value: number;
    percent: string;
  }>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  // For each level, compute pie/arcs
  const rings = levels.map(
    (levelData: { label: string; value: number; color?: string }[], idx: number) => {
      const pie = d3
        .pie<{ label: string; value: number; color?: string }>()
        .value((d: { label: string; value: number; color?: string }) => d.value)
        .sort(null);
      const arcData = pie(levelData);
      const outerRadius = ringWidth * (levels.length - idx);
      const innerRadius = outerRadius - ringWidth * 0.9;
      const colorScale = d3
        .scaleOrdinal<string, string>()
        .domain(levelData.map((d: { label: string }) => d.label))
        .range(
          colors && colors[idx]
            ? colors[idx]
            : [...d3.schemeTableau10, ...d3.schemeSet2, ...d3.schemeSet3],
        );
      const arcGen = d3
        .arc<d3.PieArcDatum<{ label: string; value: number; color?: string }>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(10)
        .padAngle(0.02);
      const total = levelData.reduce((sum: number, d: { value: number }) => sum + d.value, 0);
      return { arcData, arcGen, innerRadius, outerRadius, colorScale, total, levelData };
    },
  );

  // Tooltip rendering
  const tooltipDiv = tooltip ? (
    <div
      style={{
        position: 'fixed',
        left: tooltip.x + 12,
        top: tooltip.y + 12,
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: 6,
        fontSize: 14,
        pointerEvents: 'none',
        zIndex: 1000,
        minWidth: 100,
      }}
    >
      <div style={{ fontWeight: 600 }}>{tooltip.label}</div>
      <div>Value: {tooltip.value}</div>
      <div>{tooltip.percent}%</div>
    </div>
  ) : null;

  return (
    <div style={{ position: 'relative', width, margin: '0 auto' }}>
      <svg ref={svgRef} width={width} height={height} style={{ display: 'block' }}>
        <g transform={`translate(${cx},${cy})`}>
          {rings.map((ring, levelIdx: number) => (
            <g key={levelIdx}>
              {ring.arcData.map((d) => {
                const percent =
                  ring.total > 0 ? ((d.data.value / ring.total) * 100).toFixed(1) : '0.0';
                const isHighlighted = highlightLabel && d.data.label === highlightLabel;
                return (
                  <path
                    key={d.data.label}
                    d={ring.arcGen(d) || undefined}
                    fill={d.data.color || ring.colorScale(d.data.label)}
                    stroke="#fff"
                    strokeWidth={2}
                    opacity={highlightLabel ? (isHighlighted ? 1 : 0.3) : 1}
                    style={{ transition: 'opacity 0.2s, d 0.2s' }}
                    onMouseOver={(e) => {
                      setHighlightLabel(d.data.label);
                      if (svgRef.current) {
                        setTooltip({
                          x: e.clientX,
                          y: e.clientY,
                          label: d.data.label,
                          value: d.data.value,
                          percent,
                        });
                      }
                    }}
                    onMouseOut={() => {
                      setHighlightLabel(null);
                      setTooltip(null);
                    }}
                    onClick={() => onSliceClick && onSliceClick(levelIdx, d.data)}
                    cursor={onSliceClick ? 'pointer' : 'default'}
                  />
                );
              })}
            </g>
          ))}
          {/* Center label/value */}
          {(centerLabel || centerValue) && (
            <g textAnchor="middle" dominantBaseline="middle" pointerEvents="none">
              {centerValue !== undefined && (
                <text style={{ fontSize: 32, fontWeight: 'bold' }} y={-8}>
                  {centerValue}
                </text>
              )}
              {centerLabel && (
                <text style={{ fontSize: 16, fill: '#888' }} y={20}>
                  {centerLabel}
                </text>
              )}
            </g>
          )}
        </g>
      </svg>
      {tooltipDiv}
    </div>
  );
};

// The main NestedDonutChart component that acts as a wrapper and passes props to the renderer
export const NestedDonutChart: React.FC<NestedDonutChartProps> = (props) => {
  // All props are passed directly to the renderer
  return <NestedDonutChartRenderer {...props} />;
};

// Export the internal component for advanced use cases
export { NestedDonutChartInternal };
