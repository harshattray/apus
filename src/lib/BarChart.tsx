import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

export type BarChartProps = {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  color?: string | string[]; // Allow single color or array of colors
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const BarChart: React.FC<BarChartProps> = ({ data, width, height, color = '#6a93d1', margin = { top: 20, right: 30, bottom: 30, left: 40 } }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

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

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#cccccc');

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#cccccc');

    g.selectAll('.domain, .tick line')
      .attr('stroke', '#cccccc');

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.value))
      .attr('fill', (d, i) => (Array.isArray(color) ? color[i % color.length] : color)); // Use color array or single color
  }, [data, width, height, color, margin]);

  return <svg ref={ref} width={width} height={height} />;
};
