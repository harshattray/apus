import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

export type BarChartProps = {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string | string[]; 
  margin?: { top: number; right: number; bottom: number; left: number };
  responsive?: boolean; 
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 600, 
  height = 400, 
  color = '#6a93d1',
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  responsive = true, 
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: responsive && containerRef.current ? containerRef.current.clientWidth : width,
    height: responsive && containerRef.current ? (containerRef.current.clientWidth * (height / width)) : height, // Calculate initial height based on aspect ratio if responsive
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

    if (!svgRef.current || !data || data.length === 0 || currentWidth <= 0 || currentHeight <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = currentWidth - margin.left - margin.right;
    const innerHeight = currentHeight - margin.top - margin.bottom;

    // Ensure inner dimensions are non-negative
    if (innerWidth <= 0 || innerHeight <= 0) return;

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
      .attr('fill', (d, i) => (Array.isArray(color) ? color[i % color.length] : color));
  }, [data, color, margin, dimensions]);

  // Calculate padding bottom for aspect ratio
  const paddingBottom = responsive ? `${(height / width) * 100}%` : undefined;

  return (
    <div ref={containerRef} style={{
      position: responsive ? 'relative' : undefined,
      width: responsive ? '100%' : width,
      height: responsive ? '0' : height, // Set height to 0 for padding-bottom to work
      paddingBottom: paddingBottom,
    }}>
      <svg ref={svgRef} style={{
        position: responsive ? 'absolute' : undefined,
        top: responsive ? 0 : undefined,
        left: responsive ? 0 : undefined,
      }} width={responsive ? '100%' : width} height={responsive ? '100%' : height}></svg>
    </div>
  );
};
