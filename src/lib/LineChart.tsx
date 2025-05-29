import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import type { D3BrushEvent } from 'd3-brush';
import type { ScalePoint } from 'd3-scale';

export type LineChartProps = {
  data: { name: string; values: { label: string | number; value: number }[] }[];
  width?: number;
  height?: number;
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
  responsive?: boolean;
  brushable?: boolean;
  onBrushEnd?: (selectedLabels: (string | number)[]) => void;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 600,
  height = 400,
  lineColors,
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
  responsive = true,
  brushable = false,
  onBrushEnd,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const brushRef = useRef<SVGGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    if (!responsive || !containerRef.current) {
      setDimensions({ width, height });
      return;
    }

    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const aspectRatio = height / width;
        const containerHeight = containerWidth * aspectRatio;
        
        setDimensions({
          width: containerWidth,
          height: containerHeight
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [responsive, width, height]);

  useEffect(() => {
    const { width: currentWidth, height: currentHeight } = dimensions;

    if (!svgRef.current || !data || data.length === 0 || currentWidth <= 0 || currentHeight <= 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const innerWidth = currentWidth - margin.left - margin.right;
    const innerHeight = currentHeight - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    const colorScale = Array.isArray(lineColors) 
      ? d3.scaleOrdinal<string, string>().domain(data.map(d => d.name)).range(lineColors) 
      : d3.scaleOrdinal(d3.schemeCategory10).domain(data.map(d => d.name));

    const allLabels = data.reduce((acc, series) => acc.concat(series.values.map(d => String(d.label))), [] as string[]);
    const allValues = data.reduce((acc, series) => acc.concat(series.values.map(d => d.value)), [] as number[]);

    const x: ScalePoint<string> = d3
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

    const area = d3
      .area<{ label: string | number; value: number }>()
      .x((d) => x(String(d.label))!)
      .y0(innerHeight)
      .y1((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    if (areaGradientColors && areaGradientColors.length > 1 && data.length > 0) {
      const areaGradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'areaGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      areaGradient.selectAll('stop')
        .data(areaGradientColors)
        .enter()
        .append('stop')
        .attr('offset', (d, i) => `${i / (areaGradientColors.length - 1) * 100}%`)
        .attr('stop-color', (d) => d);
    }

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

    if (showGridLines) {
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(yAxisTicks).tickSize(-innerWidth))
        .selectAll('line')
        .attr('stroke', '#444444');
    }

    if (showArea) {
      g.selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('fill', (d, i) => (i === 0 && areaGradientColors && areaGradientColors.length > 1) ? 'url(#areaGradient)' : areaColor)
        .attr('d', (d) => area(d.values));
    }

    g.selectAll('.line')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', lineGradientColors && lineGradientColors.length > 1 ? 'url(#lineGradient)' : (d) => colorScale(d.name))
      .attr('stroke-width', 2)
      .attr('d', (d) => line(d.values));

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

    g.selectAll('.domain, .tick line')
      .attr('stroke', '#cccccc');

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

    if (brushable && showXAxis) {
      const brush = d3.brushX()
        .extent([[0, 0], [innerWidth, innerHeight]]);

      const brushGroup = g.append('g')
        .attr('class', 'brush')
        .call(brush);
        
      brushGroup.select('.overlay')
        .style('cursor', 'crosshair');

      brushGroup.call(brush.on('end', brushed));
      brushRef.current = brushGroup.node();

      function brushed({ selection }: D3BrushEvent<SVGGElement, any>) {
        if (selection === null) {
          if (onBrushEnd) {
            onBrushEnd([]);
          }
        } else {
          const [x0, x1] = selection;
          const selectedLabels = allLabels.filter(label => {
            const bandCenter = x(label)! + x.bandwidth() / 2;
            return bandCenter >= x0 && bandCenter <= x1;
          });

          if (onBrushEnd) {
            const originalLabels = selectedLabels.map(label => {
                const originalPoint = data.reduce((acc, series) => acc.concat(series.values), [] as { label: string | number; value: number }[]).find(d => String(d.label) === label);
                return originalPoint ? originalPoint.label : label;
            });
            onBrushEnd(originalLabels);
          }
        }
      }
    }

    return () => {
      svg.selectAll('*').remove();
      tooltip.remove();
    };

  }, [data, lineColors, areaColor, pointColor, margin, yAxisTicks, showXAxis, showYAxis, showGridLines, tooltipBackgroundColor, tooltipTextColor, tooltipPadding, tooltipBorderRadius, tooltipFontSize, areaGradientColors, lineGradientColors, showArea, brushable, onBrushEnd, dimensions]);

  const paddingBottom = responsive ? `${(height / width) * 100}%` : undefined;

  return (
    <div ref={containerRef} style={{
      position: responsive ? 'relative' : undefined,
      width: responsive ? '100%' : width,
      height: responsive ? '0' : height, 
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