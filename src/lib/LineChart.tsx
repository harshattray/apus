import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

export type LineChartProps = {
  data: { name: string; values: { label: string | number; value: number }[] }[];
  width: number;
  height: number;
  lineColors?: string | string[]; 
  areaColor?: string;
  pointColor?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  yAxisTicks?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  areaGradientColors?: string[];
  lineGradientColors?: string[]; 
  showArea?: boolean; 
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  lineColors, // Use lineColors prop
  areaColor = 'rgba(70, 130, 180, 0.3)',
  pointColor = '#88b0de',
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  yAxisTicks = 5,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
  tooltipBackgroundColor = '#333333',
  tooltipTextColor = '#ffffff',
  tooltipPadding = '8px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  areaGradientColors,
  lineGradientColors, 
  showArea = true,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current || !data || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Determine the color scale or use provided colors
    const colorScale = Array.isArray(lineColors) 
      ? d3.scaleOrdinal<string, string>().domain(data.map(d => d.name)).range(lineColors) 
      : d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name));

    // Extract all labels and all values to determine scales
    const allLabels = data.reduce((acc, series) => acc.concat(series.values.map(d => String(d.label))), [] as string[]);
    const allValues = data.reduce((acc, series) => acc.concat(series.values.map(d => d.value)), [] as number[]);

    const x = d3
      .scalePoint()
      .domain(allLabels)
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allValues) || 0])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label))!)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    // Area generator (will apply to all series for now, can be refined)
     const area = d3
      .area<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label))!)
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Define gradient if colors are provided (apply to the first series area)
    if (areaGradientColors && areaGradientColors.length > 1 && data.length > 0) {
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'areaGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradient.selectAll('stop')
        .data(areaGradientColors)
        .enter()
        .append('stop')
        .attr('offset', (d, i) => `${i / (areaGradientColors.length - 1) * 100}%`)
        .attr('stop-color', (d) => d);
    }

    // Define line gradient if colors are provided
    if (lineGradientColors && lineGradientColors.length > 1) {
      const lineGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'lineGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%'); 

      lineGradient.selectAll('stop')
        .data(lineGradientColors)
        .enter()
        .append('stop')
        .attr('offset', (d, i) => `${i / (lineGradientColors.length - 1) * 100}%`)
        .attr('stop-color', (d) => d);
    }

    // Add grid lines if enabled
    if (showGridLines) {
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(yAxisTicks).tickSize(-innerWidth))
        .selectAll('line')
        .attr('stroke', '#444444');
    }

    // Append the area paths (one for each series) if showArea is true
    if (showArea) {
      g.selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('fill', (d, i) => (i === 0 && areaGradientColors && areaGradientColors.length > 1) ? 'url(#areaGradient)' : areaColor)
        .attr('d', (d) => area(d.values));
    }

    // Append the line paths (one for each series)
    g.selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', lineGradientColors && lineGradientColors.length > 1 ? 'url(#lineGradient)' : (d) => colorScale(d.name))
      .attr('stroke-width', 2)
      .attr('d', (d) => line(d.values));

    // Add axes if enabled
    if (showYAxis) {
      g.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y).ticks(yAxisTicks))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', '#cccccc');
    }

    if (showXAxis) {
      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '10px')
        .style('fill', '#cccccc');
    }

    // Style axis lines (domain and ticks)
    g.selectAll('.domain, .tick line')
      .attr('stroke', '#cccccc');

    // Hide grid domain line
    g.selectAll('.grid .domain').remove();

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', tooltipBackgroundColor)
      .style('color', tooltipTextColor)
      .style('padding', tooltipPadding)
      .style('border-radius', tooltipBorderRadius)
      .style('pointer-events', 'none')
      .style('font-size', tooltipFontSize);

    // Add circles for data points and interaction
    data.forEach(series => {
      g.selectAll(`.data-point-${series.name.replace(/\s+/g, '-')}`)
        .data(series.values)
        .enter()
        .append('circle')
        .attr('class', `data-point data-point-${series.name.replace(/\s+/g, '-')}`)
        .attr('cx', (d) => x(String(d.label))!)
        .attr('cy', (d) => y(d.value))
        .attr('r', 4)
        .attr('fill', colorScale(series.name))
        .attr('stroke', '#1e1e1e')
        .attr('stroke-width', 1.5)
        .on('mouseover', function(event, d) {
          d3.select(this).attr('r', 7);
          tooltip.style('visibility', 'visible').html(`<b>${series.name}</b><br>Label: ${d.label}<br>Value: ${d.value}`);
        })
        .on('mousemove', function(event) {
          tooltip.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this).attr('r', 4);
          tooltip.style('visibility', 'hidden');
        });
    });

    return () => {
      tooltip.remove();
    };

  }, [data, width, height, lineColors, areaColor, pointColor, margin, yAxisTicks, showXAxis, showYAxis, showGridLines, tooltipBackgroundColor, tooltipTextColor, tooltipPadding, tooltipBorderRadius, tooltipFontSize, areaGradientColors, lineGradientColors, showArea]);

  return <svg ref={ref} width={width} height={height} />;
}; 