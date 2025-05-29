import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

export type LineChartProps = {
  data: { label: string | number; value: number }[];
  width: number;
  height: number;
  color?: string;
  areaColor?: string;
  pointColor?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  yAxisTicks?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
};

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  width, 
  height, 
  color = '#88b0de', 
  areaColor = 'rgba(70, 130, 180, 0.3)', 
  pointColor = '#88b0de', 
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  yAxisTicks = 5,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current || !data || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scalePoint()
      .domain(data.map((d) => String(d.label)))
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label))!)
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const area = d3
      .area<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label))!)
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Add grid lines if enabled
    if (showGridLines) {
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(yAxisTicks).tickSize(-innerWidth))
        .selectAll('line')
        .attr('stroke', '#444444'); // Grid line color
    }

    // Append the area path
    g.append('path')
      .datum(data)
      .attr('fill', areaColor)
      .attr('d', area);

    // Append the line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('d', line);

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
      .style('background-color', '#333333')
      .style('color', '#ffffff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px');

    g.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(String(d.label))!)
      .attr('cy', (d) => y(d.value))
      .attr('r', 4)
      .attr('fill', pointColor)
      .attr('stroke', '#1e1e1e')
      .attr('stroke-width', 1.5)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 7);
        tooltip.style('visibility', 'visible').html(`<b>${d.label}</b>: ${d.value}`);
      })
      .on('mousemove', function(event) {
        tooltip.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        tooltip.style('visibility', 'hidden');
      });

    return () => {
      tooltip.remove();
    };

  }, [data, width, height, color, areaColor, pointColor, margin, yAxisTicks, showXAxis, showYAxis, showGridLines]);

  return <svg ref={ref} width={width} height={height} />;
}; 