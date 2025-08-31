/**
 * @file RangeChartRenderer.tsx
 * @description Renderer component for the RangeChart
 */
import React, { useEffect, RefObject } from 'react';
import * as d3 from 'd3';
import { RangeChartDataItem } from './types';
import { Margin, addGridLines } from '../utils/chartUtils';

type RangeChartRendererProps = {
  svgRef: RefObject<SVGSVGElement>;
  data: RangeChartDataItem[];
  dimensions: { width: number; height: number; margin: Margin };
  color1: string;
  color2: string;
  margin: Margin;
  showXAxis: boolean;
  showYAxis: boolean;
  showGridLines: boolean;
  xAxisTextColor: string;
  yAxisTextColor: string;
  axisLineColor: string;
  yAxisTicks: number;
  setHoveredData: (data: RangeChartDataItem | null) => void;
  setTooltipPosition: (position: { x: number; y: number } | null) => void;
};

export const RangeChartRenderer: React.FC<RangeChartRendererProps> = ({
  svgRef,
  data,
  dimensions,
  color1,
  color2,
  margin,
  showXAxis,
  showYAxis,
  showGridLines,
  xAxisTextColor,
  yAxisTextColor,
  axisLineColor,
  yAxisTicks,
  setHoveredData,
  setTooltipPosition,
}) => {
  useEffect(() => {
    const { width: currentWidth, height: currentHeight } = dimensions;

    if (!svgRef.current || !data || data.length === 0 || currentWidth <= 0 || currentHeight <= 0)
      return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = currentWidth - margin.left - margin.right;
    const innerHeight = currentHeight - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.day))
      .range([0, innerWidth])
      .padding(0.6);

    const allValues = data.flatMap((d) => [d.range1.min, d.range1.max, d.range2.min, d.range2.max]);
    const yMin = d3.min(allValues) || 0;
    const yMax = d3.max(allValues) || 0;

    const y = d3
      .scaleLinear()
      .domain([yMin - 10, yMax + 10])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    if (showYAxis) {
      g.append('g')
        .call(d3.axisLeft(y).ticks(yAxisTicks).tickSize(-innerWidth))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', yAxisTextColor);
    }

    if (showXAxis) {
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', xAxisTextColor);
    }

    if (showGridLines) {
      addGridLines(g, x, y, innerWidth, innerHeight, true, true, yAxisTicks, axisLineColor);
    }

    g.selectAll('.domain').attr('stroke', 'none');
    g.selectAll('.tick line')
      .filter((d, i) => i !== 0)
      .attr('stroke', axisLineColor)
      .attr('stroke-dasharray', '2,2');

    const rangeGroup = g
      .selectAll('.range-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'range-group')
      .attr('transform', (d) => `translate(${x(d.day)! + x.bandwidth() / 2}, 0)`);

    // Range 1
    rangeGroup
      .append('rect')
      .attr('x', -4)
      .attr('y', (d) => y(d.range1.max))
      .attr('width', 8)
      .attr('height', (d) => y(d.range1.min) - y(d.range1.max))
      .attr('fill', color1)
      .attr('opacity', 0.2);

    rangeGroup
      .append('circle')
      .attr('cy', (d) => y(d.range1.min))
      .attr('r', 4)
      .attr('fill', color1);

    rangeGroup
      .append('circle')
      .attr('cy', (d) => y(d.range1.max))
      .attr('r', 4)
      .attr('fill', color1);

    // Range 2
    rangeGroup
      .append('rect')
      .attr('x', -4)
      .attr('y', (d) => y(d.range2.max))
      .attr('width', 8)
      .attr('height', (d) => y(d.range2.min) - y(d.range2.max))
      .attr('fill', color2)
      .attr('opacity', 0.2);

    rangeGroup
      .append('circle')
      .attr('cy', (d) => y(d.range2.min))
      .attr('r', 4)
      .attr('fill', color2);

    rangeGroup
      .append('circle')
      .attr('cy', (d) => y(d.range2.max))
      .attr('r', 4)
      .attr('fill', color2);

    const tooltipArea = rangeGroup
      .append('rect')
      .attr('x', -x.bandwidth() / 2)
      .attr('y', 0)
      .attr('width', x.bandwidth())
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all');

    tooltipArea
      .on('mouseover', (event, d) => {
        const [mouseX, mouseY] = d3.pointer(event, svg.node());
        setHoveredData(d);
        setTooltipPosition({ x: mouseX, y: mouseY - 10 });
      })
      .on('mouseout', () => {
        setHoveredData(null);
        setTooltipPosition(null);
      });
  }, [
    data,
    color1,
    color2,
    margin,
    dimensions,
    showXAxis,
    showYAxis,
    xAxisTextColor,
    yAxisTextColor,
    axisLineColor,
    yAxisTicks,
    showGridLines,
    svgRef,
    setHoveredData,
    setTooltipPosition,
  ]);

  return null;
};
