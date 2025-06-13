/**
 * @file BarChartRenderer.tsx
 * @description Renderer component for the BarChart
 */
import React, { useEffect, RefObject } from 'react';
import * as d3 from 'd3';
import { BarChartData } from './types';
import { Margin, createGradient, addGridLines, addLegend } from '../utils/chartUtils';
import { useTooltip } from '../hooks/useTooltip';

type BarChartRendererProps = {
  svgRef: RefObject<SVGSVGElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  data: BarChartData[];
  dimensions: { width: number; height: number };
  color: string | string[];
  gradientColors?: string[];
  margin: Margin;
  showXAxis: boolean;
  showYAxis: boolean;
  showGridLines: boolean;
  xAxisTextColor: string;
  yAxisTextColor: string;
  axisLineColor: string;
  yAxisTicks: number;
  showLegend: boolean;
  legendPosition: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize: string;
  legendFontColor: string;
  legendLabels?: string[];
};

export const BarChartRenderer: React.FC<BarChartRendererProps> = ({
  svgRef,
  tooltipRef,
  data,
  dimensions,
  color,
  gradientColors,
  margin,
  showXAxis,
  showYAxis,
  showGridLines,
  xAxisTextColor,
  yAxisTextColor,
  axisLineColor,
  yAxisTicks,
  showLegend,
  legendPosition,
  legendFontSize,
  legendFontColor,
  legendLabels,
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

    // Adjust bottom margin if legend is at the bottom
    const adjustedMargin = { ...margin };
    if (showLegend && legendPosition === 'bottom') {
      adjustedMargin.bottom += 30; // Add extra space for legend
    }

    const innerWidth = currentWidth - adjustedMargin.left - adjustedMargin.right;
    const innerHeight = currentHeight - adjustedMargin.top - adjustedMargin.bottom;

    // Ensure inner dimensions are non-negative
    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Create gradient if needed
    if (gradientColors && gradientColors.length >= 2) {
      createGradient(svg, 'barGradient', gradientColors, true);
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
        addGridLines(g, x, y, innerWidth, innerHeight, false, true, yAxisTicks, axisLineColor);
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
        addGridLines(g, x, y, innerWidth, innerHeight, true, false, yAxisTicks, axisLineColor);
      }
    }

    // Style axis lines and ticks
    g.selectAll('.domain, .tick line').attr('stroke', axisLineColor);

    // Add bars
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

    // Add tooltip interactions
    g.selectAll('rect')
      .on('mouseover', (event, d) => {
        const dataPoint = d as BarChartData;
        const [mouseX, mouseY] = d3.pointer(event);

        showTooltip(
          `<strong>${dataPoint.label}:</strong> ${dataPoint.value}`,
          mouseX + adjustedMargin.left,
          mouseY + adjustedMargin.top - 30,
        );
      })
      .on('mouseout', hideTooltip);

    // Add legend if enabled
    if (showLegend && data.length > 0) {
      // Determine legend labels - use provided labels or data labels
      const labels = legendLabels || data.map((d) => d.label);

      addLegend(
        g,
        labels,
        color,
        legendPosition,
        innerWidth,
        innerHeight,
        adjustedMargin,
        legendFontSize,
        legendFontColor,
        gradientColors ? ['barGradient'] : undefined,
      );
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
    svgRef,
    showTooltip,
    hideTooltip,
  ]);

  return null;
};
