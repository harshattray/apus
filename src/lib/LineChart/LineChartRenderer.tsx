/**
 * @file LineChartRenderer.tsx
 * @description Renderer component for the LineChart
 */
import React, { useEffect, RefObject } from 'react';
import * as d3 from 'd3';
import { LineChartSeries } from './types';
import { Margin, createGradient, addGridLines, addLegend } from '../utils/chartUtils';
import { useTooltip } from '../hooks/useTooltip';

type LineChartRendererProps = {
  svgRef: RefObject<SVGSVGElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  data: LineChartSeries[];
  dimensions: { width: number; height: number };
  lineColors: string | string[];
  areaColor: string;
  pointColor: string;
  margin: Margin;
  yAxisTicks: number;
  showXAxis: boolean;
  showYAxis: boolean;
  showGridLines: boolean;
  areaGradientColors?: string[];
  lineGradientColors?: string[];
  showArea: boolean;
  showLegend: boolean;
  legendPosition: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize: string;
  legendFontColor: string;
};

export const LineChartRenderer: React.FC<LineChartRendererProps> = ({
  svgRef,
  tooltipRef,
  data,
  dimensions,
  lineColors,
  areaColor,
  pointColor,
  margin,
  yAxisTicks,
  showXAxis,
  showYAxis,
  showGridLines,
  areaGradientColors,
  lineGradientColors,
  showArea,
  showLegend,
  legendPosition,
  legendFontSize,
  legendFontColor,
}) => {
  const { showTooltip, hideTooltip } = useTooltip(tooltipRef, {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: 'white',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '12px',
  });

  useEffect(() => {
    const { width: currentWidth, height: currentHeight } = dimensions;

    if (!svgRef.current || !data || data.length === 0 || currentWidth <= 0 || currentHeight <= 0)
      return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Adjust margin if legend is at the bottom or top
    const adjustedMargin = { ...margin };
    if (showLegend) {
      if (legendPosition === 'bottom') {
        adjustedMargin.bottom += 30; // Add extra space for legend
      } else if (legendPosition === 'top') {
        adjustedMargin.top += 30;
      }
    }

    const innerWidth = currentWidth - adjustedMargin.left - adjustedMargin.right;
    const innerHeight = currentHeight - adjustedMargin.top - adjustedMargin.bottom;

    // Ensure inner dimensions are non-negative
    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Create gradients if needed
    if (areaGradientColors && areaGradientColors.length >= 2) {
      createGradient(svg, 'areaGradient', areaGradientColors, true);
    }

    if (lineGradientColors && lineGradientColors.length >= 2) {
      createGradient(svg, 'lineGradient', lineGradientColors, false);
    }

    // Flatten all data points to find min/max values
    const allDataPoints = data.flatMap((series) => series.values);
    const allLabels = Array.from(new Set(allDataPoints.map((d) => d.label)));

    // Create scales
    const x = d3.scalePoint().domain(allLabels.map(String)).range([0, innerWidth]).padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allDataPoints, (d) => d.value) || 0])
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
        .style('font-size', '10px');

      // Add grid lines if enabled
      if (showGridLines) {
        addGridLines(g, x, y, innerWidth, innerHeight, false, true, yAxisTicks, '#cccccc');
      }
    }

    // Add X axis
    if (showXAxis) {
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '10px');

      // Add grid lines if enabled
      if (showGridLines) {
        addGridLines(g, x, y, innerWidth, innerHeight, true, false, yAxisTicks, '#cccccc');
      }
    }

    // Create line generator
    const line = d3
      .line<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label)) || 0)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    // Create area generator
    const area = d3
      .area<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label)) || 0)
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    // Draw lines and areas for each series
    data.forEach((series, i) => {
      const seriesColor = Array.isArray(lineColors)
        ? lineColors[i % lineColors.length]
        : lineColors;

      // Add area if enabled
      if (showArea) {
        g.append('path')
          .datum(series.values)
          .attr('class', 'area')
          .attr(
            'fill',
            areaGradientColors && areaGradientColors.length >= 2 ? 'url(#areaGradient)' : areaColor,
          )
          .attr('d', area)
          .attr('opacity', 0)
          .transition()
          .duration(750)
          .attr('opacity', 1);
      }

      // Add line
      g.append('path')
        .datum(series.values)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr(
          'stroke',
          lineGradientColors && lineGradientColors.length >= 2 ? 'url(#lineGradient)' : seriesColor,
        )
        .attr('stroke-width', 2)
        .attr('d', line)
        .attr('stroke-dasharray', function () {
          return this.getTotalLength();
        })
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength();
        })
        .transition()
        .duration(750)
        .attr('stroke-dashoffset', 0);

      // Add points
      const points = g
        .selectAll(`.point-${i}`)
        .data(series.values)
        .enter()
        .append('circle')
        .attr('class', `point-${i}`)
        .attr('cx', (d) => x(String(d.label)) || 0)
        .attr('cy', (d) => y(d.value))
        .attr('r', 0)
        .attr('fill', pointColor)
        .attr('stroke', seriesColor)
        .attr('stroke-width', 2)
        .on('mouseover', (event, d) => {
          const [mouseX, mouseY] = d3.pointer(event);

          showTooltip(
            `<strong>${series.name}</strong><br/>${d.label}: ${d.value}`,
            mouseX + adjustedMargin.left,
            mouseY + adjustedMargin.top - 10,
          );
        })
        .on('mouseout', hideTooltip);

      // Animate points
      points
        .transition()
        .delay((_, j) => j * 150 + 750)
        .duration(300)
        .attr('r', 4);
    });

    // Add legend if enabled
    if (showLegend && data.length > 0) {
      const seriesNames = data.map((series) => series.name);

      // Create gradient IDs for legend if needed
      const gradientIds =
        lineGradientColors && lineGradientColors.length >= 2 ? ['lineGradient'] : undefined;

      addLegend(
        g,
        seriesNames,
        lineColors,
        legendPosition,
        innerWidth,
        innerHeight,
        adjustedMargin,
        legendFontSize,
        legendFontColor,
        gradientIds,
      );
    }
  }, [
    data,
    dimensions,
    lineColors,
    areaColor,
    pointColor,
    margin,
    yAxisTicks,
    showXAxis,
    showYAxis,
    showGridLines,
    areaGradientColors,
    lineGradientColors,
    showArea,
    showLegend,
    legendPosition,
    legendFontSize,
    legendFontColor,
    svgRef,
    showTooltip,
    hideTooltip,
  ]);

  return null;
};
