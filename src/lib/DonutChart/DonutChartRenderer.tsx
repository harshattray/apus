/**
 * @file DonutChartRenderer.tsx
 * @description Renderer component for the DonutChart
 */
import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { DonutChartData, DonutChartProps } from './types';
import { useTooltip } from '../hooks/useTooltip';

interface DonutChartRendererProps extends Omit<DonutChartProps, 'data' | 'svgRef' | 'tooltipRef'> {
  data: d3.PieArcDatum<DonutChartData>[]; // data processed by d3.pie
  svgRef: React.RefObject<SVGSVGElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  colorScale: d3.ScaleOrdinal<string, string>;
  visibleLabels: string[]; // NEW: which slices are visible
}

const DonutChartRenderer: React.FC<DonutChartRendererProps> = ({
  data: arcData, // Renamed prop to arcData to be explicit it's pie-processed data
  width,
  height,
  innerRadius,
  outerRadius,
  colorScale,
  showTooltip,
  showLegend,
  legendFontSize = '12px',
  legendFontColor = '#444',
  svgRef,
  showHoverEffect = true,
  onSliceClick,
  centerLabel,
  centerValue,
  extraCenterInfo,
  tooltipRef,
  visibleLabels, // NEW
  enableGlow = false, // Default to false
  glowColor,
  glowBlur = 5, // Default glow blur value
}) => {
  // Calculate total from arcData only (already filtered)
  const total = useMemo(() => arcData.reduce((sum, d) => sum + d.data.value, 0), [arcData]);

  // Tooltip logic using the custom hook
  const {
    showTooltip: showT,
    hideTooltip,
    applyTooltipStyles,
  } = useTooltip(tooltipRef, {
    backgroundColor: 'rgba(0,0,0,0.8)',
    textColor: 'white',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1000,
  });

  // Apply tooltip styles on mount
  useEffect(() => {
    applyTooltipStyles();
  }, [applyTooltipStyles]);

  // Arc generator (used by React for the 'd' attribute of path elements)
  // Memoize the arc generator as its configuration depends only on radii and padding
  const arc = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<DonutChartData>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(12)
        .padAngle(0.025),
    [innerRadius, outerRadius],
  );

  // Hover arc generator for expanded slices
  const hoverArc = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<DonutChartData>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius * 1.06)
        .cornerRadius(12)
        .padAngle(0.025),
    [innerRadius, outerRadius],
  );

  // Outer arc generator (for positioning labels/polylines)
  // Memoize as its configuration depends only on outer radius
  const outerArc = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<DonutChartData>>()
        .innerRadius(outerRadius * 0.9)
        .outerRadius(outerRadius * 0.9),
    [outerRadius],
  ); // Memoize based on outerRadius

  // Label arc generator (slightly larger arc for positioning labels clearly outside the donut)
  // Memoize as its configuration depends only on outer radius
  const labelArc = useMemo(
    () =>
      d3
        .arc<d3.PieArcDatum<DonutChartData>>()
        .innerRadius(outerRadius * 1.1)
        .outerRadius(outerRadius * 1.1),
    [outerRadius],
  ); // Memoize based on outerRadius

  // Polyline generator for connecting slices to labels
  // Memoize as it has no dependencies
  const polylineGenerator = useMemo(() => d3.line<[number, number]>().curve(d3.curveNatural), []); // Memoize as it has no dependencies

  // --- Rendering Logic (using React JSX) ---
  return (
    <g transform={`translate(${width / 2},${height / 2})`}>
      <defs>
        {/* Shadow Filters */}
        <filter id="donut-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.18" />
        </filter>
        <filter id="donut-shadow-strong" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.28" />
        </filter>
        {/* Glow Filter */}
        {enableGlow && (
          <filter id="donut-glow" x="-50%" y="-50%" width="200%" height="200%">
            {/* Use feGaussianBlur to create the blur */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="coloredBlur" />
            {/* Use feFlood to set the color, defaulting to slice color if glowColor is not provided */}
            <feFlood floodColor={glowColor || 'currentColor'} result="glowColor" />
            {/* Composite the color and the blur */}
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="coloredBlur" />
            {/* Merge the original graphic with the glow */}
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      {/* Donut Arcs (Slices) */}
      {arcData.map((d) => {
        const percent = total > 0 ? ((d.data.value / total) * 100).toFixed(1) : '0.0';
        const isVisible = visibleLabels.includes(d.data.label);
        // Determine the color for the glow filter if enableGlow is true
        const sliceColor = d.data.color || colorScale(d.data.label);

        return (
          <path
            key={d.data.label}
            d={arc(d) || undefined}
            fill={sliceColor}
            stroke="#fff"
            strokeWidth={3}
            cursor={onSliceClick || showHoverEffect || showTooltip ? 'pointer' : 'default'}
            pointerEvents="all"
            onMouseOver={
              showHoverEffect || showTooltip
                ? (e) => {
                    if (showHoverEffect) {
                      d3.select(e.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('d', hoverArc(d) || null);
                    }
                    if (showTooltip) {
                      if (!svgRef.current) return;
                      const [pointerX, pointerY] = d3.pointer(e, svgRef.current);
                      // Construct tooltip content with HTML tags for formatting
                      const tooltipHtml = `
                      <div style='min-width:120px'>
                        <strong>${d.data.label}</strong>
                        <div style='margin-top:4px'>
                          Value: ${d.data.value}
                          <br/>
                          ${percent}%
                        </div>
                      </div>`;
                      showT(tooltipHtml, pointerX, pointerY - 10);
                    }
                  }
                : undefined
            }
            onMouseOut={
              showHoverEffect || showTooltip
                ? (e) => {
                    if (showHoverEffect) {
                      d3.select(e.currentTarget)
                        .transition()
                        .duration(200)
                        .attr('d', arc(d) || null);
                    }
                    if (showTooltip) {
                      hideTooltip();
                    }
                  }
                : undefined
            }
            onClick={onSliceClick ? () => onSliceClick(d.data) : undefined}
            style={{ opacity: isVisible ? 1 : 0.4 }}
            // Apply glow filter if enabled, otherwise apply shadow filter based on visibility
            filter={enableGlow ? `url(#donut-glow)` : isVisible ? 'url(#donut-shadow)' : undefined}
          />
        );
      })}
      {/* Center Info Display (Label and Value) */}
      {centerLabel && (total > 0 || centerValue !== undefined) && (
        <g textAnchor="middle" dominantBaseline="middle" pointerEvents="none">
          <text
            className={`text-slate-700 dark:text-slate-300`}
            style={{ fontSize: '32px', fontWeight: 'bold' }}
            y={extraCenterInfo ? -10 : 0}
          >
            {centerValue !== undefined ? centerValue : total.toFixed(0)}
          </text>
          {extraCenterInfo && (
            <text
              className={`text-slate-500 dark:text-slate-400`}
              style={{ fontSize: '14px' }}
              y={20}
            >
              {extraCenterInfo}
            </text>
          )}
          <text
            className={`text-slate-500 dark:text-slate-400`}
            style={{ fontSize: '16px' }}
            y={extraCenterInfo ? 38 : 24}
          >
            {centerLabel}
          </text>
        </g>
      )}
      {/* Polylines and Labels (if legend is not shown) */}
      {!showLegend &&
        arcData.map((d) => {
          const [arcX, arcY] = labelArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          const textAnchor = midangle < Math.PI ? 'start' : 'end';
          const polylinePoints: [number, number][] = [
            arc.centroid(d) as [number, number],
            outerArc.centroid(d) as [number, number],
            [arcX + (midangle < Math.PI ? 40 : -40), arcY],
          ];
          const labelX = arcX + (midangle < Math.PI ? 45 : -45);
          const labelY = arcY;
          return (
            <g key={`label-${d.data.label}`}>
              <polyline
                points={polylineGenerator(polylinePoints) || undefined}
                style={{
                  fill: 'none',
                  stroke: legendFontColor,
                  strokeWidth: 1,
                }}
              />
              <text
                transform={`translate(${labelX},${labelY})`}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                style={{ fontSize: legendFontSize, fill: legendFontColor, pointerEvents: 'none' }}
              >
                {d.data.label} ({total > 0 ? ((d.data.value / total) * 100).toFixed(1) : '0.0'}%)
              </text>
            </g>
          );
        })}
    </g>
  );
};

export default DonutChartRenderer;
