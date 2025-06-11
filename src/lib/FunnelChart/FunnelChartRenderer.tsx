import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FunnelChartProps } from './types';
import { useTooltip } from '../hooks/useTooltip';

const FunnelChartRenderer: React.FC<FunnelChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  showValues,
  valueFormat,
  onSliceClick,
  tooltipBackgroundColor = '#000000',
  tooltipTextColor = '#FFFFFF',
  tooltipPadding = '8px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  tooltipOffsetX = 10,
  tooltipOffsetY = 10,
  tooltipFormat,
  showLegend = false,
  legendPosition = 'bottom',
  legendTitle,
  legendItemColor,
  legendSwatchSize = 10,
  legendGap = 10,
  clickableLegend = false,
  onLegendItemClick,
  legendTitleColor,
  legendTitleFontSize,
  legendTitleFontFamily,
  legendSwatchBorderWidth = 1,
  legendSwatchBorderColor = '#FFF',
  isDarkMode = false,
  enableGradients = false,
  gradientDirection = 'vertical',
  segmentShadowColor = 'rgba(0,0,0,0.2)',
  segmentShadowBlur = 5,
  segmentShadowOffsetX = 0,
  segmentShadowOffsetY = 5,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const filterIdRef = useRef<string>(`funnel-shadow-${Math.random().toString(36).substring(7)}`);

  const [selectedSegmentName, setSelectedSegmentName] = useState<string | null>(null);
  const [legendDimensions, setLegendDimensions] = useState({ width: 0, height: 0 });

  const tooltip = useTooltip(tooltipRef, {
    backgroundColor: tooltipFormat ? 'transparent' : tooltipBackgroundColor,
    textColor: tooltipFormat ? 'transparent' : tooltipTextColor,
    padding: tooltipFormat ? '0px' : tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: tooltipFontSize,
  });

  useEffect(() => {
    tooltip.applyTooltipStyles();
  }, [tooltip]);

  useEffect(() => {
    if (legendRef.current && showLegend) {
      setLegendDimensions({
        width: legendRef.current.offsetWidth,
        height: legendRef.current.offsetHeight,
      });
    } else if (!showLegend) {
      setLegendDimensions({ width: 0, height: 0 });
    }
  }, [showLegend, legendPosition, legendTitle, data]);

  let adjustedWidth = width;
  let adjustedHeight = height;

  if (showLegend) {
    if (legendPosition === 'top' || legendPosition === 'bottom') {
      adjustedHeight = Math.max(0, height - legendDimensions.height);
    } else if (legendPosition === 'left' || legendPosition === 'right') {
      adjustedWidth = Math.max(0, width - legendDimensions.width);
    }
  }

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');

    defs
      .append('filter')
      .attr('id', filterIdRef.current)
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
      .append('feDropShadow')
      .attr('dx', segmentShadowOffsetX)
      .attr('dy', segmentShadowOffsetY)
      .attr('stdDeviation', segmentShadowBlur)
      .attr('flood-color', segmentShadowColor);

    data.forEach((d, i) => {
      if (enableGradients && d.color) {
        const gradientId = `gradient-${d.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${i}`;
        const linearGradient = defs.append('linearGradient').attr('id', gradientId);

        if (gradientDirection === 'vertical') {
          linearGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
        } else {
          linearGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%');
        }

        linearGradient
          .append('stop')
          .attr('offset', '0%')
          .attr('stop-color', d3.color(d.color)?.darker(0.5)?.toString() || d.color);
        linearGradient.append('stop').attr('offset', '100%').attr('stop-color', d.color);
      }
    });

    const innerWidth = adjustedWidth - margin.left - margin.right;
    const innerHeight = adjustedHeight - margin.top - margin.bottom;

    const maxValue = d3.max(data, (d) => d.value) || 0;

    const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, innerWidth]);

    const segmentHeight = innerHeight / data.length;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    let currentY = 0;
    data.forEach((d, i) => {
      if (clickableLegend && selectedSegmentName && selectedSegmentName !== d.label) {
        currentY += segmentHeight;
        return;
      }

      const segment = g.append('g').attr('class', 'funnel-segment');

      const topWidth = xScale(d.value);
      const bottomWidth = i < data.length - 1 ? xScale(data[i + 1].value) : xScale(0);

      const topX = (innerWidth - topWidth) / 2;
      const bottomX = (innerWidth - bottomWidth) / 2;

      const path = segment
        .append('path')
        .attr(
          'd',
          `
          M ${topX} ${currentY}
          L ${topX + topWidth} ${currentY}
          L ${bottomX + bottomWidth} ${currentY + segmentHeight}
          L ${bottomX} ${currentY + segmentHeight}
          Z
        `,
        )
        .attr(
          'fill',
          enableGradients && d.color
            ? `url(#gradient-${d.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${i})`
            : d.color || `hsl(${(i * 360) / data.length}, 70%, 50%)`,
        )
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .style('cursor', onSliceClick ? 'pointer' : 'default')
        .style('filter', `url(#${filterIdRef.current})`);

      path
        .on('click', function (_event) {
          void _event;
          onSliceClick?.(d);
        })
        .on('mouseenter', function (event) {
          if (chartRef.current) {
            const [x, y] = d3.pointer(event, chartRef.current);

            const tooltipContent = tooltipFormat
              ? tooltipFormat(d)
              : `
                <div style="
                  background-color: ${tooltipBackgroundColor};
                  color: ${tooltipTextColor};
                  padding: ${tooltipPadding};
                  border-radius: ${tooltipBorderRadius};
                  font-size: ${tooltipFontSize};
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  text-align: center;
                ">
                  <div style="font-weight: bold; color: ${d.color || (isDarkMode ? '#a8dadc' : '#4287f5')};">${d.label}</div>
                  <div>Value: <span style="font-weight: bold;">${valueFormat?.(d.value) ?? d.value.toString()}</span></div>
                </div>
                `;

            tooltip.showTooltip(tooltipContent, x + tooltipOffsetX, y + tooltipOffsetY);
          }
        })
        .on('mouseleave', function () {
          tooltip.hideTooltip();
        });

      currentY += segmentHeight;
    });

    g.selectAll('.y-axis-label').remove();

    g.selectAll('.y-axis-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -10)
      .attr('y', (d, i) => i * segmentHeight + segmentHeight / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('fill', isDarkMode ? '#cbd5e0' : '#4a5568')
      .attr('font-size', '12px')
      .text((d) => d.label);
  }, [
    data,
    adjustedWidth,
    adjustedHeight,
    margin,
    showValues,
    valueFormat,
    onSliceClick,
    tooltip,
    tooltipOffsetX,
    tooltipOffsetY,
    tooltipFormat,
    clickableLegend,
    selectedSegmentName,
    isDarkMode,
    enableGradients,
    gradientDirection,
    segmentShadowColor,
    segmentShadowBlur,
    segmentShadowOffsetX,
    segmentShadowOffsetY,
  ]);

  const renderLegend = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'row' : 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: legendGap,
        padding: '8px',
      }}
    >
      {legendTitle && (
        <h4
          style={{
            color: legendTitleColor || (isDarkMode ? '#94a3b8' : '#64748b'),
            fontSize: legendTitleFontSize,
            fontFamily: legendTitleFontFamily,
            marginBottom: '8px',
          }}
        >
          {legendTitle}
        </h4>
      )}
      {data.map((d, index) => (
        <div
          key={d.label}
          onClick={() => {
            if (!clickableLegend) return;
            const newSelectedName = selectedSegmentName === d.label ? null : d.label;
            setSelectedSegmentName(newSelectedName);
            onLegendItemClick?.(newSelectedName ? d : null);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: clickableLegend ? 'pointer' : 'default',
            opacity:
              clickableLegend && selectedSegmentName && selectedSegmentName !== d.label ? 0.5 : 1,
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: `${legendSwatchSize}px`,
              height: `${legendSwatchSize}px`,
              borderRadius: '50%',
              backgroundColor: d.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
              border: `${legendSwatchBorderWidth}px solid ${legendSwatchBorderColor}`,
              marginRight: '8px',
            }}
          ></span>
          <span style={{ color: legendItemColor || (isDarkMode ? '#e2e8f0' : '#333') }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );

  const getFlexDirection = () => {
    switch (legendPosition) {
      case 'top':
        return 'column';
      case 'bottom':
        return 'column-reverse';
      case 'left':
        return 'row';
      case 'right':
        return 'row-reverse';
      default:
        return 'column';
    }
  };

  return (
    <div
      ref={chartRef}
      style={{
        width: adjustedWidth,
        height: adjustedHeight,
        display: 'flex',
        flexDirection: getFlexDirection(),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {(legendPosition === 'top' || legendPosition === 'left') && showLegend && (
        <div ref={legendRef}>{renderLegend()}</div>
      )}
      <svg ref={svgRef} width={adjustedWidth} height={adjustedHeight} style={{ display: 'block' }}>
        <defs>
          {data.map((d, i) => {
            if (enableGradients && d.color) {
              const gradientId = `gradient-${d.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${i}`;
              const darkerColor = d3.color(d.color)?.darker(0.5)?.toString() || d.color;
              return (
                <linearGradient
                  key={gradientId}
                  id={gradientId}
                  x1={gradientDirection === 'horizontal' ? '0%' : '0%'}
                  y1={gradientDirection === 'horizontal' ? '0%' : '0%'}
                  x2={gradientDirection === 'horizontal' ? '100%' : '0%'}
                  y2={gradientDirection === 'horizontal' ? '0%' : '100%'}
                >
                  <stop offset="0%" stopColor={darkerColor} />
                  <stop offset="100%" stopColor={d.color} />
                </linearGradient>
              );
            }
            return null;
          })}
          <filter id={filterIdRef.current} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx={segmentShadowOffsetX}
              dy={segmentShadowOffsetY}
              stdDeviation={segmentShadowBlur}
              floodColor={segmentShadowColor}
            />
          </filter>
        </defs>
      </svg>
      {(legendPosition === 'bottom' || legendPosition === 'right') && showLegend && (
        <div ref={legendRef}>{renderLegend()}</div>
      )}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 1000,
          display: 'none',
        }}
      />
    </div>
  );
};

export default FunnelChartRenderer;
