import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { GaugeDonutChartProps, GaugeDonutData } from './types';

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
}) => {
  const [activeSlices, setActiveSlices] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<null | {
    x: number;
    y: number;
    data: GaugeDonutData[];
  }>(null);
  const tooltipTimeoutRef = useRef<number | null>(null);

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

    const handleMouseLeave = () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      tooltipTimeoutRef.current = window.setTimeout(() => {
        setTooltip(null);
      }, 50);
    };

    svgElement.addEventListener('mouseleave', handleMouseLeave);

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

    const arcGen = d3
      .arc<d3.PieArcDatum<GaugeDonutData>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8)
      .cornerRadius(10)
      .padAngle(0.02);

    svg.select('g').remove();
    svg.selectAll('defs').remove();

    const defs = svg.append('defs');
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
      .style('transition', 'opacity 0.2s, d 0.2s');

    enteredPaths
      .on('mouseover', (event) => {
        if (!showTooltip) return;
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }

        setTooltip({
          x: event.clientX,
          y: event.clientY,
          data: data,
        });
      })
      .on('mouseout', () => {
        if (!showTooltip) return;
        tooltipTimeoutRef.current = window.setTimeout(() => {
          setTooltip(null);
        }, 50);
      })
      .on('click', (event, d) => handleSliceClick(d.data))
      .style('cursor', onSliceClick ? 'pointer' : 'default');

    paths
      .on('mouseover', (event) => {
        if (!showTooltip) return;
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }

        setTooltip({
          x: event.clientX,
          y: event.clientY,
          data: data,
        });
      })
      .on('mouseout', () => {
        if (!showTooltip) return;
        tooltipTimeoutRef.current = window.setTimeout(() => {
          setTooltip(null);
        }, 50);
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

      if (centerValue !== undefined) {
        textGroup
          .append('text')
          .attr('y', variant.includes('half') || variant.includes('quarter') ? 0 : -8)
          .style('font-size', 32)
          .style('font-weight', 'bold')
          .text(centerValue);
      }

      if (centerLabel) {
        textGroup
          .append('text')
          .attr(
            'y',
            variant.includes('half') || variant.includes('quarter')
              ? centerValue !== undefined
                ? 24
                : 0
              : 20,
          )
          .style('font-size', 16)
          .style('fill', theme === 'dark' ? '#888' : '#666')
          .text(centerLabel);
      }
    }

    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      svgElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [
    data,
    width,
    height,
    variant,
    centerLabel,
    centerValue,
    onSliceClick,
    activeSlices,
    theme,
    handleSliceClick,
    colors,
    showTooltip,
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
      {tooltip.data.map((item, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ marginRight: '10px' }}>{item.label}:</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  ) : null;

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
      </div>
      {tooltipDiv}

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
