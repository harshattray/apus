import React, { useRef, useEffect, FC } from 'react';
import * as d3 from 'd3';
import * as d3Regression from 'd3-regression';
import { RendererProps, Margin, ScatterDataPoint } from './types';

const DEFAULT_COLORS = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

export const ScatterChartRenderer: FC<RendererProps> = ({
  data,
  width,
  height,
  colors = DEFAULT_COLORS,
  xAxis = {},
  yAxis = {},
  grid = { horizontal: false, vertical: false },
  showLegend = true,
  legendPosition = 'right',
  clickableLegend = true,
  trendLine,
  pointSize = 6,
  selectedCategory,
  onPointHover,
  onPointLeave,
  onLegendItemClick,
  onPointClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin: Margin = { top: 40, right: 40, bottom: 50, left: 60 };

    const categories = [...new Set(data.map((d) => d.category))];

    // Handle colors as either array or object
    let colorScale: d3.ScaleOrdinal<string, string>;
    if (Array.isArray(colors)) {
      colorScale = d3.scaleOrdinal<string>().domain(categories).range(colors);
    } else {
      // If colors is an object mapping categories to colors
      colorScale = d3
        .scaleOrdinal<string>()
        .domain(categories)
        .range(
          categories.map(
            (category) =>
              (colors as Record<string, string>)[category] ||
              DEFAULT_COLORS[categories.indexOf(category) % DEFAULT_COLORS.length],
          ),
        );
    }

    if (showLegend) {
      const legendPadding = 10;
      const legendItemHeight = 20;
      const legendWidth = 120; // Fixed width for legend

      if (legendPosition === 'right') margin.right += legendWidth;
      else if (legendPosition === 'left') margin.left += legendWidth;
      else if (legendPosition === 'top')
        margin.top += categories.length * legendItemHeight + legendPadding;
      else if (legendPosition === 'bottom')
        margin.bottom += categories.length * legendItemHeight + legendPadding;
    }

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    if (chartWidth <= 0 || chartHeight <= 0) return;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xIsDate = data[0]?.x instanceof Date;

    const xDomain = d3.extent(data, (d) => d.x) as [number | Date, number | Date];
    const yDomain = d3.extent(data, (d) => d.y) as [number, number];

    const xScale = (
      xIsDate
        ? d3.scaleTime().domain(xDomain as [Date, Date])
        : d3.scaleLinear().domain(xDomain as [number, number])
    )
      .range([0, chartWidth])
      .nice();
    const yScale = d3.scaleLinear().domain(yDomain).range([chartHeight, 0]).nice();

    // Grid lines
    if (grid.horizontal) {
      const yAxisGrid = d3
        .axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat(() => '');
      g.append('g')
        .attr('class', 'grid y-grid')
        .call(yAxisGrid)
        .selectAll('line')
        .attr('stroke', grid.stroke || '#e0e0e0')
        .attr('stroke-width', grid.strokeWidth || 1)
        .attr('stroke-dasharray', grid.strokeDasharray || '3 3');
    }

    if (grid.vertical) {
      const xAxisGrid = d3
        .axisBottom(xScale)
        .tickSize(-chartHeight)
        .tickFormat(() => '');
      g.append('g')
        .attr('class', 'grid x-grid')
        .call(xAxisGrid)
        .selectAll('line')
        .attr('stroke', grid.stroke || '#e0e0e0')
        .attr('stroke-width', grid.strokeWidth || 1)
        .attr('stroke-dasharray', grid.strokeDasharray || '3 3');
    }

    // Axes
    const xAxisGenerator = d3.axisBottom(xScale);
    if (xAxis.tickFormat) {
      xAxisGenerator.tickFormat(xAxis.tickFormat);
    }
    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    if (yAxis.tickFormat) {
      yAxisGenerator.tickFormat(yAxis.tickFormat);
    }
    const yAxisGroup = g.append('g').call(yAxisGenerator);

    // Axis labels
    if (xAxis.label) {
      g.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('fill', xAxis.labelColor || '#333')
        .style('font-size', xAxis.labelFontSize || '14px')
        .text(xAxis.label);
    }

    if (yAxis.label) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .style('fill', yAxis.labelColor || '#333')
        .style('font-size', yAxis.labelFontSize || '14px')
        .text(yAxis.label);
    }

    // Style axes
    xAxisGroup.selectAll('path').style('stroke', xAxis.stroke || '#333');
    xAxisGroup.selectAll('line').style('stroke', xAxis.tickColor || '#333');
    xAxisGroup
      .selectAll('text')
      .style('fill', xAxis.tickColor || '#333')
      .style('font-size', xAxis.fontSize || '12px');
    yAxisGroup.selectAll('path').style('stroke', yAxis.stroke || '#333');
    yAxisGroup.selectAll('line').style('stroke', yAxis.tickColor || '#333');
    yAxisGroup
      .selectAll('text')
      .style('fill', yAxis.tickColor || '#333')
      .style('font-size', yAxis.fontSize || '12px');

    // Data points
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.x as number))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', pointSize)
      .style('fill', (d) => colorScale(d.category))
      .style('opacity', (d) => (!selectedCategory || d.category === selectedCategory ? 0.8 : 0.2))
      .style('cursor', 'pointer')
      .on('click', function (event: MouseEvent, d: ScatterDataPoint) {
        if (onPointClick) {
          onPointClick(event, d);
        }
      })
      .on('mouseover', function (event: MouseEvent, d: ScatterDataPoint) {
        // Highlight the point on hover
        d3.select(this)
          .attr('r', pointSize * 1.5)
          .style('stroke', '#fff')
          .style('stroke-width', 2);

        if (onPointHover) {
          const [mouseX, mouseY] = d3.pointer(event, svg.node());
          onPointHover(event, d, colorScale(d.category), mouseX, mouseY);
        }
      })
      .on('mousemove', function (event: MouseEvent, d: ScatterDataPoint) {
        // Update tooltip position on mouse move
        if (onPointHover) {
          const [mouseX, mouseY] = d3.pointer(event, svg.node());
          onPointHover(event, d, colorScale(d.category), mouseX, mouseY);
        }
      })
      .on('mouseout', function () {
        // Reset point appearance
        d3.select(this).attr('r', pointSize).style('stroke', 'none');

        if (onPointLeave) {
          onPointLeave();
        }
      });

    // Add larger transparent circles for easier hovering
    g.selectAll('.hover-area')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'hover-area')
      .attr('cx', (d) => xScale(d.x as number))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', pointSize * 3) // Larger area for easier hovering
      .style('fill', 'transparent')
      .style('pointer-events', 'all')
      .on('click', function (event: MouseEvent, d: ScatterDataPoint) {
        if (onPointClick) {
          onPointClick(event, d);
        }
      })
      .on('mouseover', function (event: MouseEvent, d: ScatterDataPoint) {
        // Find and highlight the corresponding dot
        svg
          .selectAll('.dot')
          .filter((p: any) => p === d)
          .attr('r', pointSize * 1.5)
          .style('stroke', '#fff')
          .style('stroke-width', 2);

        if (onPointHover) {
          const [mouseX, mouseY] = d3.pointer(event, svg.node());
          onPointHover(event, d, colorScale(d.category), mouseX, mouseY);
        }
      })
      .on('mousemove', function (event: MouseEvent, d: ScatterDataPoint) {
        if (onPointHover) {
          const [mouseX, mouseY] = d3.pointer(event, svg.node());
          onPointHover(event, d, colorScale(d.category), mouseX, mouseY);
        }
      })
      .on('mouseout', function (event: MouseEvent, d: ScatterDataPoint) {
        // Reset the corresponding dot
        svg
          .selectAll('.dot')
          .filter((p: any) => p === d)
          .attr('r', pointSize)
          .style('stroke', 'none');

        if (onPointLeave) {
          onPointLeave();
        }
      });

    // Trend Line
    if (trendLine?.show) {
      const regressionGenerator = d3Regression
        .regressionLinear()
        .x((d: any) => d.x as number)
        .y((d: any) => d.y);

      const regressionData = regressionGenerator(data);

      const line = d3
        .line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      g.append('path')
        .datum(regressionData)
        .attr('class', 'trend-line')
        .attr('d', line)
        .style('stroke', trendLine.color || 'steelblue')
        .style('stroke-width', trendLine.strokeWidth || 2)
        .style('stroke-dasharray', trendLine.strokeDasharray || '6, 2')
        .style('fill', 'none');
    }

    // Legend
    if (showLegend) {
      const legendItemHeight = 20;
      let legendX = 0,
        legendY = 0;

      if (legendPosition === 'right') {
        legendX = chartWidth + margin.left + 20;
        legendY = margin.top + (chartHeight - categories.length * legendItemHeight) / 2;
      } else if (legendPosition === 'left') {
        legendX = 10;
        legendY = margin.top + (chartHeight - categories.length * legendItemHeight) / 2;
      } else if (legendPosition === 'top') {
        legendX = margin.left;
        legendY = 10;
      } else {
        // bottom
        legendX = margin.left;
        legendY = chartHeight + margin.top + 20;
      }

      const legendGroup = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${legendX}, ${legendY})`);

      const legendItems = legendGroup
        .selectAll('.legend-item')
        .data(categories)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * legendItemHeight})`)
        .style('cursor', clickableLegend ? 'pointer' : 'default')
        .on('click', (event, d: string) => {
          if (clickableLegend && onLegendItemClick) {
            const newSelectedCategory = selectedCategory === d ? null : d;
            onLegendItemClick(newSelectedCategory);
          }
        });

      legendItems
        .append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('rx', 6)
        .attr('ry', 6)
        .style('fill', (d) => colorScale(d))
        .style('opacity', (d) => (!selectedCategory || d === selectedCategory ? 1 : 0.5));

      legendItems
        .append('text')
        .attr('x', 18)
        .attr('y', 9)
        .attr('dy', '0.1em')
        .text((d) => d)
        .style('font-size', '12px')
        .style('fill', '#333')
        .style('opacity', (d) => (!selectedCategory || d === selectedCategory ? 1 : 0.5));
    }
  }, [
    width,
    height,
    data,
    colors,
    xAxis,
    yAxis,
    grid,
    showLegend,
    legendPosition,
    clickableLegend,
    trendLine,
    pointSize,
    selectedCategory,
    onPointHover,
    onPointLeave,
    onLegendItemClick,
  ]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};
