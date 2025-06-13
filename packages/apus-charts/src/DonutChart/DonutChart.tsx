/**
 * @file DonutChart.tsx
 * @description Main DonutChart component
 */
import React, { useRef, useState } from 'react';
import { DonutChartProps } from './types';
import DonutChartRenderer from './DonutChartRenderer';
import { useChartDimensions } from '../hooks/useChartDimensions';
import * as d3 from 'd3';

/**
 * DonutChart component for rendering donut/pie charts
 */
export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 320,
  height = 320,
  innerRadiusRatio = 0.7,
  colors,
  margin = { top: 24, right: 24, bottom: 24, left: 24 },
  responsive = true,
  showTooltip = true,
  showLegend = true,
  legendPosition = 'bottom',
  legendFontSize = '12px',
  legendFontColor = '#cccccc',
  legendLabels,
  centerLabel,
  centerIcon,
  extraCenterInfo,
  ariaLabel = 'Donut chart',
  onSliceClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const dimensions = useChartDimensions(containerRef, width, height, responsive);

  // Add extra width if the legend is on the right or left to accommodate it
  const svgWidth =
    legendPosition === 'right' || legendPosition === 'left'
      ? dimensions.width + 200
      : dimensions.width; // Added 200px as an estimate for legend width

  // Calculate radii
  const outerRadius = Math.min(svgWidth, dimensions.height) / 2 - 8; // 8px padding
  const innerRadius = outerRadius * innerRadiusRatio;

  // Prepare color scale
  const colorScale = d3
    .scaleOrdinal<string, string>()
    .domain(data.map((d) => d.label))
    .range(colors && colors.length > 0 ? colors : d3.schemeCategory10);

  // --- Slice visibility state ---
  const [visibleLabels, setVisibleLabels] = useState<string[]>(data.map((d) => d.label));
  const toggleLabel = (label: string) => {
    setVisibleLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  // --- Filter data for visible slices ---
  const filteredData = data.filter((d) => visibleLabels.includes(d.label));

  // --- Prepare pie data for only visible slices ---
  const pie = d3
    .pie<import('./types').DonutChartData>()
    .value((d) => d.value)
    .sort(null);
  const arcData = pie(filteredData);
  const total = filteredData.reduce((sum, d) => sum + d.value, 0);

  // --- Layout helpers ---
  const isLegendVertical = legendPosition === 'left' || legendPosition === 'right';
  const isLegendFirst = legendPosition === 'top' || legendPosition === 'left';

  // --- Legend rendering ---
  const legend = showLegend ? (
    <div
      className={`donut-legend donut-legend-${legendPosition}`}
      style={{
        display: 'flex',
        flexDirection: isLegendVertical ? 'column' : 'row',
        justifyContent: isLegendVertical ? 'flex-start' : 'center',
        alignItems: isLegendVertical ? 'flex-start' : 'center',
        flexWrap: 'wrap',
        marginBottom: legendPosition === 'top' ? 16 : 0,
        marginRight: legendPosition === 'left' ? 24 : 0,
        marginTop: legendPosition === 'bottom' ? 16 : 0,
        marginLeft: legendPosition === 'right' ? 24 : 0,
        paddingLeft: isLegendVertical ? 8 : 0,
        paddingTop: !isLegendVertical ? 8 : 0,
        gap: isLegendVertical ? 8 : 0,
      }}
    >
      {data.map((d) => {
        const isVisible = visibleLabels.includes(d.label);
        const percent = isVisible && total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0';
        return (
          <div
            key={d.label}
            className="donut-legend-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: !isLegendVertical ? 32 : 0,
              marginBottom: isLegendVertical ? 8 : 0,
              cursor: 'pointer',
              fontSize: legendFontSize,
              color: legendFontColor,
              userSelect: 'none',
              minWidth: 120,
              opacity: isVisible ? 1 : 0.4,
              fontWeight: 500,
              transition: 'opacity 0.2s',
              padding: '2px 0',
            }}
            onClick={() => toggleLabel(d.label)}
          >
            <span
              style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                background: d.color || colorScale(d.label),
                marginRight: 10,
                borderRadius: '50%',
                border: '2px solid #fff',
                boxShadow: '0 0 0 1px #ccc',
                opacity: isVisible ? 1 : 0.4,
                transition: 'opacity 0.2s',
              }}
            />
            <span style={{ minWidth: 80, textAlign: 'left' }}>{d.label}</span>
            <span
              style={{
                marginLeft: 8,
                color: '#888',
                fontWeight: 400,
                minWidth: 24,
                textAlign: 'right',
              }}
            >
              {d.value}
            </span>
            {isVisible && (
              <span
                style={{
                  marginLeft: 8,
                  color: '#aaa',
                  fontWeight: 400,
                  minWidth: 40,
                  textAlign: 'right',
                }}
              >
                {percent}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  ) : null;

  // --- Main render ---
  return (
    <div
      ref={containerRef}
      className={`donut-chart-flex-container legend-${legendPosition}`}
      style={{
        width: '100%',
        maxWidth: width,
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isLegendVertical ? 32 : 0,
      }}
    >
      {/* Legend (top/left) */}
      {showLegend && isLegendFirst && legend}
      {/* SVG Donut Chart */}
      <svg
        ref={svgRef}
        width={svgWidth}
        height={dimensions.height}
        viewBox={`0 0 ${svgWidth} ${dimensions.height}`}
        aria-label={ariaLabel}
        style={{ display: 'block', background: 'none', flex: 'none' }}
      >
        <DonutChartRenderer
          svgRef={svgRef}
          tooltipRef={tooltipRef}
          data={arcData}
          width={svgWidth}
          height={dimensions.height}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          colorScale={colorScale}
          innerRadiusRatio={innerRadiusRatio}
          colors={colors}
          margin={margin}
          showTooltip={showTooltip}
          showLegend={showLegend}
          legendFontSize={legendFontSize}
          legendFontColor={legendFontColor}
          legendLabels={legendLabels}
          centerLabel={centerLabel}
          centerValue={total}
          centerIcon={centerIcon}
          extraCenterInfo={extraCenterInfo}
          onSliceClick={(data) => {
            if (onSliceClick) onSliceClick(data);
          }}
          visibleLabels={visibleLabels}
        />
      </svg>
      {/* Legend (bottom/right) */}
      {showLegend && !isLegendFirst && legend}
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}
      />
    </div>
  );
};
