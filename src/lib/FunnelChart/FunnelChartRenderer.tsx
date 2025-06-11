import React, { useEffect, useRef } from 'react';
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
  const chartRef = useRef<HTMLDivElement>(null);
  const filterIdRef = useRef<string>(`funnel-shadow-${Math.random().toString(36).substring(7)}`);

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

  const adjustedWidth = width;
  const adjustedHeight = height;

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

      if (showValues) {
        segment
          .append('text')
          .attr('x', innerWidth / 2) // Centered horizontally
          .attr('y', currentY + segmentHeight / 2) // Centered vertically within the segment
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', isDarkMode ? '#e2e8f0' : '#1a202c') // Adjust color for better contrast
          .attr('font-size', '14px')
          .attr('pointer-events', 'none') // Prevent text from interfering with mouse events on path
          .text(`${d.label}: ${valueFormat ? valueFormat(d.value) : d.value}`);
      }

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
    isDarkMode,
    enableGradients,
    gradientDirection,
    segmentShadowColor,
    segmentShadowBlur,
    segmentShadowOffsetX,
    segmentShadowOffsetY,
    tooltipBackgroundColor,
    tooltipTextColor,
    tooltipPadding,
    tooltipBorderRadius,
    tooltipFontSize,
  ]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg ref={svgRef} width={width} height={height} style={{ display: 'block' }} />
      <div ref={tooltipRef} style={{ position: 'absolute', pointerEvents: 'none', zIndex: 9999 }} />
    </div>
  );
};

export default FunnelChartRenderer;
