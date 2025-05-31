/**
 * @file BarChart.tsx
 * @description This file contains the BarChart component, a React component for rendering bar charts using D3.js.
 * @author Harsha Attray
 */
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

export type BarChartProps = {
  ariaLabel?: string;
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string | string[];
  gradientColors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  responsive?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  xAxisTextColor?: string;
  yAxisTextColor?: string;
  axisLineColor?: string;
  yAxisTicks?: number;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize?: string;
  legendFontColor?: string;
  legendLabels?: string[];
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 600,
  height = 400,
  color = '#6a93d1',
  gradientColors,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  responsive = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
  xAxisTextColor = '#cccccc',
  yAxisTextColor = '#cccccc',
  axisLineColor = '#cccccc',
  yAxisTicks = 5,
  tooltipBackgroundColor = 'rgba(0, 0, 0, 0.7)',
  tooltipTextColor = 'white',
  tooltipPadding = '8px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  ariaLabel = 'Bar chart',
  showLegend = false,
  legendPosition = 'bottom',
  legendFontSize = '12px',
  legendFontColor = '#cccccc',
  legendLabels,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: responsive && containerRef.current ? containerRef.current.clientWidth : width,
    height:
      responsive && containerRef.current
        ? containerRef.current.clientWidth * (height / width)
        : height, // Calculate initial height based on aspect ratio if responsive
  });

  useEffect(() => {
    const currentContainer = containerRef.current;

    if (!responsive || !currentContainer) {
      setDimensions({ width: width, height: height });
      return;
    }

    // Initial dimensions calculation
    setDimensions({
      width: currentContainer.clientWidth,
      height: currentContainer.clientWidth * (height / width),
    });

    const observer = new ResizeObserver((entries) => {
      const { clientWidth } = entries[0].target as HTMLElement;
      setDimensions({
        width: clientWidth,
        height: clientWidth * (height / width),
      });
    });

    observer.observe(currentContainer);

    // Clean up the observer
    return () => {
      observer.unobserve(currentContainer);
    };
  }, [responsive, width, height]);

  useEffect(() => {
    const { width: currentWidth, height: currentHeight } = dimensions;

    if (!svgRef.current || !data || data.length === 0 || currentWidth <= 0 || currentHeight <= 0)
      return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Adjust bottom margin if legend is at the bottom
    const adjustedMargin = { ...margin };
    if (showLegend && legendPosition === 'bottom') {
      adjustedMargin.bottom += 30; // Add extra space for legend
    }

    const innerWidth = currentWidth - adjustedMargin.left - adjustedMargin.right;
    const innerHeight = currentHeight - adjustedMargin.top - adjustedMargin.bottom;

    // Ensure inner dimensions are non-negative
    if (innerWidth <= 0 || innerHeight <= 0) return;

    if (gradientColors && gradientColors.length >= 2) {
      const defs = svg.append('defs');
      const gradient = defs
        .append('linearGradient')
        .attr('id', 'barGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradientColors.forEach((color, i) => {
        gradient
          .append('stop')
          .attr('offset', `${(i / (gradientColors.length - 1)) * 100}%`)
          .attr('stop-color', color);
      });
    }

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${adjustedMargin.left},${adjustedMargin.top})`);

    // Add Y axis
    if (showYAxis) {
      g.append('g')
        .call(d3.axisLeft(y).ticks(yAxisTicks))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', yAxisTextColor);

      // Add grid lines if enabled
      if (showGridLines) {
        g.append('g')
          .attr('class', 'grid')
          .call(
            d3
              .axisLeft(y)
              .ticks(yAxisTicks)
              .tickSize(-innerWidth)
              .tickFormat(() => ''),
          )
          .attr('stroke', axisLineColor)
          .attr('stroke-opacity', 0.2);
      }
    }

    // Add X axis
    if (showXAxis) {
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', xAxisTextColor);

      // Add grid lines if enabled
      if (showGridLines) {
        g.append('g')
          .attr('class', 'grid')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(
            d3
              .axisBottom(x)
              .tickSize(-innerHeight)
              .tickFormat(() => ''),
          )
          .attr('stroke', axisLineColor)
          .attr('stroke-opacity', 0.2);
      }
    }

    // Style axis lines and ticks
    g.selectAll('.domain, .tick line').attr('stroke', axisLineColor);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label)!)
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('width', x.bandwidth())
      .attr('fill', (d, i) => {
        if (gradientColors && gradientColors.length >= 2) {
          return 'url(#barGradient)';
        }
        return Array.isArray(color) ? color[i % color.length] : color;
      })
      .transition() // Add transition
      .duration(750) // Duration of the transition
      .attr('y', (d) => y(d.value)) // Animate to correct y position
      .attr('height', (d) => innerHeight - y(d.value)); // Animate to correct height

    g.selectAll('rect')
      .on('mouseover', (event, d) => {
        const tooltip = d3.select(tooltipRef.current);
        const dataPoint = d as { label: string; value: number };
        const [mouseX, mouseY] = d3.pointer(event);
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (containerRect) {
          tooltip
            .style('opacity', 1)
            .html(`<strong>${dataPoint.label}:</strong> ${dataPoint.value}`)
            .style('left', `${mouseX + margin.left}px`)
            .style('top', `${mouseY + margin.top - 30}px`)
            .style('transform', 'translate(-50%, -100%)');
        }
      })
      .on('mouseout', () => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style('opacity', 0);
      });
    // Add legend if enabled
    if (showLegend && data.length > 0) {
      // Determine legend labels - use provided labels or data labels
      const labels = legendLabels || data.map((d) => d.label);

      // Calculate legend dimensions and position
      const legendItemHeight = 20;
      const legendItemWidth = 80;
      const legendPadding = 10;
      const legendHeight = labels.length * legendItemHeight;

      let legendX = 0;
      let legendY = 0;

      // Position the legend based on the legendPosition prop
      switch (legendPosition) {
        case 'top':
          legendX = innerWidth / 2 - (legendItemWidth * labels.length) / 2;
          legendY = -margin.top / 2;
          break;
        case 'right':
          legendX = innerWidth + legendPadding;
          legendY = innerHeight / 2 - legendHeight / 2;
          break;
        case 'bottom':
          legendX = innerWidth / 2 - (legendItemWidth * labels.length) / 2;
          legendY = innerHeight + legendPadding + 15; // Added extra padding to avoid x-axis overlap
          break;
        case 'left':
          legendX = -margin.left + legendPadding;
          legendY = innerHeight / 2 - legendHeight / 2;
          break;
      }

      // Create legend group
      const legend = g
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${legendX}, ${legendY})`);

      // For horizontal legends (top/bottom), arrange items side by side
      const isHorizontal = legendPosition === 'top' || legendPosition === 'bottom';

      // Create legend items
      labels.forEach((label, i) => {
        const itemX = isHorizontal ? i * legendItemWidth : 0;
        const itemY = isHorizontal ? 0 : i * legendItemHeight;

        const legendItem = legend.append('g').attr('transform', `translate(${itemX}, ${itemY})`);

        // Add colored rectangle
        legendItem
          .append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', () => {
            if (gradientColors && gradientColors.length >= 2) {
              return 'url(#barGradient)';
            }
            return Array.isArray(color) ? color[i % color.length] : color;
          });

        // Add text label
        legendItem
          .append('text')
          .attr('x', 20)
          .attr('y', 12)
          .style('font-size', legendFontSize)
          .style('fill', legendFontColor)
          .text(label);
      });
    }
  }, [
    data,
    color,
    margin,
    dimensions,
    showXAxis,
    showYAxis,
    xAxisTextColor,
    yAxisTextColor,
    axisLineColor,
    yAxisTicks,
    gradientColors,
    showGridLines,
    showLegend,
    legendPosition,
    legendFontSize,
    legendFontColor,
    legendLabels,
  ]);

  const paddingBottom = responsive ? `${(height / width) * 100}%` : undefined;

  return (
    <div
      ref={containerRef}
      style={{
        position: responsive ? 'relative' : undefined,
        width: responsive ? '100%' : width,
        height: responsive ? '0' : height,
        paddingBottom: paddingBottom,
      }}
    >
      <svg
        role="img"
        aria-label={ariaLabel}
        ref={svgRef}
        style={{
          position: responsive ? 'absolute' : undefined,
          top: responsive ? 0 : undefined,
          left: responsive ? 0 : undefined,
        }}
        width={responsive ? '100%' : width}
        height={responsive ? '100%' : height}
      ></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          backgroundColor: tooltipBackgroundColor,
          color: tooltipTextColor,
          padding: tooltipPadding,
          borderRadius: tooltipBorderRadius,
          fontSize: tooltipFontSize,
          zIndex: 10,
        }}
      ></div>
    </div>
  );
};
