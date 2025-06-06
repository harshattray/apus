import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { GaugeDonutChartProps, GaugeDonutData } from './types';
import { useTooltip } from '../hooks/useTooltip';

export interface GaugeDonutChartRendererProps extends GaugeDonutChartProps {
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
  variant?:
    | 'full'
    | 'half-bottom'
    | 'half-top'
    | 'half-left'
    | 'half-right'
    | 'quarter-bottom-right'
    | 'quarter-top-right'
    | 'quarter-bottom-left'
    | 'quarter-top-left';
  colors?: string[];
  showTooltip?: boolean;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  tooltipFormat?: (data: GaugeDonutData, total: number, percent: string) => string;
  enableGlow?: boolean;
  glowColor?: string;
  glowBlur?: number;
}

export const GaugeDonutChartRenderer: React.FC<GaugeDonutChartRendererProps> = ({
  legendPosition = 'bottom',
  theme = 'light',
  className = '',
  style,
  data,
  width = 400,
  height = 400,
  variant = 'full',
  centerLabel,
  centerValue,
  onSliceClick,
  colors = d3.schemeCategory10,
  showTooltip = true,
  tooltipBackgroundColor = 'rgba(0,0,0,0.85)',
  tooltipTextColor = '#fff',
  tooltipPadding = '8px 12px',
  tooltipBorderRadius = '6px',
  tooltipFontSize = '14px',
  tooltipFormat,
  enableGlow = false,
  glowColor,
  glowBlur = 5,
}) => {
  const [activeSlices, setActiveSlices] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tooltip = useTooltip(tooltipRef, {
    backgroundColor: tooltipBackgroundColor,
    textColor: tooltipTextColor,
    padding: tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: tooltipFontSize,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
  });

  useEffect(() => {
    tooltip.applyTooltipStyles();
  }, [
    tooltip,
    tooltipBackgroundColor,
    tooltipTextColor,
    tooltipPadding,
    tooltipBorderRadius,
    tooltipFontSize,
  ]);

  const handleSliceClick = useCallback(
    (clickedData: GaugeDonutData) => {
      const newActiveSlices = new Set(activeSlices);

      if (newActiveSlices.has(clickedData.label)) {
        newActiveSlices.delete(clickedData.label);
      } else {
        newActiveSlices.add(clickedData.label);
      }

      setActiveSlices(newActiveSlices);
      onSliceClick?.(clickedData);
    },
    [activeSlices, onSliceClick],
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;

    const svg = d3.select(svgElement);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2;

    let startAngle: number;
    let endAngle: number;

    switch (variant) {
      case 'full':
        startAngle = 0;
        endAngle = Math.PI * 2;
        break;
      case 'half-left':
        startAngle = Math.PI;
        endAngle = Math.PI * 2;
        break;
      case 'half-right':
        startAngle = 0;
        endAngle = Math.PI;
        break;
      case 'half-bottom':
        startAngle = Math.PI / 2;
        endAngle = Math.PI * 1.5;
        break;
      case 'half-top':
        startAngle = Math.PI * 1.5;
        endAngle = Math.PI * 2.5;
        break;
      case 'quarter-top-left':
        startAngle = Math.PI * 1.5;
        endAngle = Math.PI * 2;
        break;
      case 'quarter-top-right':
        startAngle = 0;
        endAngle = Math.PI / 2;
        break;
      case 'quarter-bottom-left':
        startAngle = Math.PI;
        endAngle = Math.PI * 1.5;
        break;
      case 'quarter-bottom-right':
        startAngle = Math.PI / 2;
        endAngle = Math.PI;
        break;
      default:
        startAngle = 0;
        endAngle = Math.PI * 2;
    }

    const filteredData =
      activeSlices.size === 0 ? data : data.filter((d) => activeSlices.has(d.label));

    const pie = d3
      .pie<GaugeDonutData>()
      .value((d) => d.value)
      .startAngle(startAngle)
      .endAngle(endAngle)
      .sort(null);

    const arcData = pie(filteredData);

    const total = filteredData.reduce((sum, d) => sum + d.value, 0);

    const arcGen = d3
      .arc<d3.PieArcDatum<GaugeDonutData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
      .cornerRadius(10)
      .padAngle(0.02);

    svg.select('g').remove();
    svg.selectAll('defs').remove();

    const defs = svg.append('defs');

    if (enableGlow) {
      defs
        .append('filter')
        .attr('id', 'gauge-glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%')
        .call((filter) => {
          filter
            .append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', glowBlur)
            .attr('result', 'coloredBlur');
          filter
            .append('feFlood')
            .attr('flood-color', glowColor || 'currentColor')
            .attr('result', 'glowColor');
          filter
            .append('feComposite')
            .attr('in', 'glowColor')
            .attr('in2', 'coloredBlur')
            .attr('operator', 'in')
            .attr('result', 'coloredBlur');
          filter.append('feMerge').call((merge) => {
            merge.append('feMergeNode').attr('in', 'coloredBlur');
            merge.append('feMergeNode').attr('in', 'SourceGraphic');
          });
        });
    }

    filteredData.forEach((d, i) => {
      if (d.gradient) {
        const gradientId = `gradient-${i}`;
        const gradient = defs
          .append('linearGradient')
          .attr('id', gradientId)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '100%');

        d.gradient.forEach((stop) => {
          gradient
            .append('stop')
            .attr('offset', stop.offset)
            .attr('stop-color', stop.color)
            .attr('stop-opacity', stop.opacity ?? 1);
        });
      }
    });

    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

    const paths = g
      .selectAll<SVGPathElement, d3.PieArcDatum<GaugeDonutData>>('path')
      .data(arcData, (d) => d.data.label);

    const enteredPaths = paths
      .enter()
      .append('path')
      .attr('fill', (d, i) => {
        if (d.data.gradient) {
          return `url(#gradient-${i})`;
        }
        return d.data.color || colors[i % colors.length];
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('transition', 'opacity 0.2s, d 0.2s')
      .attr('filter', enableGlow ? 'url(#gauge-glow)' : null);

    enteredPaths
      .on('mouseover', (event, d) => {
        if (!showTooltip) return;
        const [x, y] = d3.pointer(event, svgElement);
        const percent = total > 0 ? ((d.data.value / total) * 100).toFixed(1) : '0.0';
        const content = tooltipFormat
          ? tooltipFormat(d.data, total, percent)
          : `<strong>${d.data.label}</strong><br/>Value: ${d.data.value}<br/>${percent}%`;
        tooltip.showTooltip(content, x, y, 10, -15);
      })
      .on('mouseout', () => {
        if (!showTooltip) return;
        tooltip.hideTooltip();
      })
      .on('click', (event, d) => handleSliceClick(d.data))
      .style('cursor', onSliceClick ? 'pointer' : 'default');

    paths
      .on('mouseover', (event, d) => {
        if (!showTooltip) return;
        const [x, y] = d3.pointer(event, svgElement);
        const percent = total > 0 ? ((d.data.value / total) * 100).toFixed(1) : '0.0';
        const content = tooltipFormat
          ? tooltipFormat(d.data, total, percent)
          : `<strong>${d.data.label}</strong><br/>Value: ${d.data.value}<br/>${percent}%`;
        tooltip.showTooltip(content, x, y, 10, -15);
      })
      .on('mouseout', () => {
        if (!showTooltip) return;
        tooltip.hideTooltip();
      })
      .on('click', (event, d) => handleSliceClick(d.data))
      .style('cursor', onSliceClick ? 'pointer' : 'default');

    paths.merge(enteredPaths).attr('d', arcGen);

    paths.exit().remove();

    if (centerLabel || centerValue !== undefined) {
      const textGroup = g
        .append('g')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('pointer-events', 'none');

      textGroup
        .append('text')
        .attr('class', `text-slate-700 dark:text-slate-300`)
        .style('font-size', '32px')
        .style('font-weight', 'bold')
        .text(centerValue !== undefined ? centerValue : total.toFixed(0));

      if (centerLabel) {
        textGroup
          .append('text')
          .attr('class', `text-slate-500 dark:text-slate-400`)
          .attr('y', 30)
          .style('font-size', '16px')
          .text(centerLabel);
      }
    }

    return () => {
      svg.select('g').remove();
      svg.selectAll('defs').remove();
    };
  }, [
    width,
    height,
    data,
    variant,
    centerLabel,
    centerValue,
    onSliceClick,
    colors,
    showTooltip,
    tooltip,
    tooltipFormat,
    activeSlices,
    enableGlow,
    glowColor,
    glowBlur,
  ]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: legendPosition === 'right' || legendPosition === 'left' ? 'row' : 'column',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...style,
  };

  const chartStyle: React.CSSProperties = {
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    position: 'relative',
  };

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    borderRadius: '4px',
    maxHeight: legendPosition === 'right' || legendPosition === 'left' ? '100%' : '200px',
    overflowY: 'auto',
  };

  return (
    <div className={`chart-container ${className}`} style={containerStyle}>
      {legendPosition === 'top' && (
        <div style={legendStyle}>
          {data.map((item) => {
            const isActive = activeSlices.has(item.label);
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
                onClick={() => handleSliceClick(item)}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color || colors[data.indexOf(item) % colors.length],
                    borderRadius: '2px',
                  }}
                />
                <span>{item.label}</span>
                <span style={{ color: theme === 'dark' ? '#aaa' : '#666' }}>({item.value})</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={chartStyle}>
        <svg ref={svgRef} width={width} height={height} style={{ display: 'block' }}></svg>
        <div ref={tooltipRef} className="gauge-donut-tooltip"></div>
      </div>

      {legendPosition === 'bottom' && (
        <div style={legendStyle}>
          {data.map((item) => {
            const isActive = activeSlices.has(item.label);
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
                onClick={() => handleSliceClick(item)}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color || colors[data.indexOf(item) % colors.length],
                    borderRadius: '2px',
                  }}
                />
                <span>{item.label}</span>
                <span style={{ color: theme === 'dark' ? '#aaa' : '#666' }}>({item.value})</span>
              </div>
            );
          })}
        </div>
      )}

      {(legendPosition === 'left' || legendPosition === 'right') && (
        <div style={{ ...legendStyle, width: '200px' }}>
          {data.map((item) => {
            const isActive = activeSlices.has(item.label);
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.5,
                  transition: 'opacity 0.2s',
                }}
                onClick={() => handleSliceClick(item)}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color || colors[data.indexOf(item) % colors.length],
                    borderRadius: '2px',
                  }}
                />
                <span>{item.label}</span>
                <span style={{ color: theme === 'dark' ? '#aaa' : '#666' }}>({item.value})</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
