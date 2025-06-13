/**
 * @file chartUtils.ts
 * @description Utility functions for chart components
 */
import * as d3 from 'd3';

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

/**
 * Creates a gradient definition for a chart
 * @param svg - D3 selection of the SVG element
 * @param id - ID for the gradient
 * @param colors - Array of colors for the gradient
 * @param vertical - Whether the gradient should be vertical (true) or horizontal (false)
 */
export const createGradient = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  id: string,
  colors: string[],
  vertical = true,
): void => {
  if (!colors || colors.length < 2) return;

  const defs = svg.append('defs');
  const gradient = defs
    .append('linearGradient')
    .attr('id', id)
    .attr('x1', vertical ? '0%' : '0%')
    .attr('y1', vertical ? '0%' : '0%')
    .attr('x2', vertical ? '0%' : '100%')
    .attr('y2', vertical ? '100%' : '0%');

  colors.forEach((color, i) => {
    gradient
      .append('stop')
      .attr('offset', `${(i / (colors.length - 1)) * 100}%`)
      .attr('stop-color', color);
  });
};

/**
 * Adds grid lines to a chart
 * @param g - D3 selection of the group element
 * @param x - X scale
 * @param y - Y scale
 * @param width - Width of the chart
 * @param height - Height of the chart
 * @param showXGrid - Whether to show X grid lines
 * @param showYGrid - Whether to show Y grid lines
 * @param ticks - Number of ticks
 * @param color - Color of the grid lines
 */
export const addGridLines = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: d3.ScaleBand<string> | d3.ScalePoint<string>, // More specific type for x scale
  y: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  showXGrid: boolean,
  showYGrid: boolean,
  ticks: number,
  color: string,
): void => {
  if (showYGrid) {
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(y)
          .ticks(ticks)
          .tickSize(-width)
          .tickFormat(() => ''),
      )
      .attr('stroke', color)
      .attr('stroke-opacity', 0.2);
  }

  if (showXGrid) {
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-height)
          .tickFormat(() => ''),
      )
      .attr('stroke', color)
      .attr('stroke-opacity', 0.2);
  }
};

/**
 * Adds a legend to a chart
 * @param g - D3 selection of the group element
 * @param labels - Array of labels for the legend
 * @param colors - Array of colors or a single color for the legend
 * @param position - Position of the legend
 * @param innerWidth - Inner width of the chart
 * @param innerHeight - Inner height of the chart
 * @param margin - Margins of the chart
 * @param fontSize - Font size for the legend
 * @param fontColor - Font color for the legend
 * @param gradientIds - Optional array of gradient IDs
 */
export const addLegend = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  labels: string[],
  colors: string | string[],
  position: 'top' | 'right' | 'bottom' | 'left',
  innerWidth: number,
  innerHeight: number,
  margin: Margin,
  fontSize: string,
  fontColor: string,
  gradientIds?: string[],
): void => {
  if (!labels || labels.length === 0) return;

  // Calculate legend dimensions and position
  const legendItemHeight = 20;
  const legendItemWidth = 80;
  const legendPadding = 10;
  const legendHeight = labels.length * legendItemHeight;

  let legendX = 0;
  let legendY = 0;

  // Position the legend based on the position prop
  switch (position) {
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
  const isHorizontal = position === 'top' || position === 'bottom';

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
        if (gradientIds && gradientIds[i]) {
          return `url(#${gradientIds[i]})`;
        }
        return Array.isArray(colors) ? colors[i % colors.length] : colors;
      });

    // Add text label
    legendItem
      .append('text')
      .attr('x', 20)
      .attr('y', 12)
      .style('font-size', fontSize)
      .style('fill', fontColor)
      .text(label);
  });
};
