/**
 * @file StackedBarChartRenderer.tsx
 * @description Renderer component for the StackedBarChart
 */
import * as d3 from 'd3';
import React, { useEffect, RefObject } from 'react';
import { StackedBarChartData } from './types';
import { Dimensions } from '../hooks/useChartDimensions';
import { Margin, addGridLines } from '../utils/chartUtils';

// Type for a segment of a stacked bar, which includes the original data object
type StackedBarSegment = d3.SeriesPoint<StackedBarChartData>;

// Define the props for the renderer component
export interface StackedBarChartRendererProps {
  // Exporting for potential use elsewhere if needed
  layout?: 'vertical' | 'horizontal';
  tooltipComponent?: React.ComponentType<{
    data: { id: string; value: number; indexValue: string };
    color: string;
  }>; // Specific type for custom tooltip
  svgRef: RefObject<SVGSVGElement>;
  tooltip: {
    showTooltip: (content: string, x: number, y: number) => void;
    hideTooltip: () => void;
    applyTooltipStyles: () => void;
  };
  data: StackedBarChartData[];
  keys: string[];
  indexBy: string;
  dimensions: Dimensions;
  margin: Margin;
  colors: string[];
  showXAxis: boolean;
  showYAxis: boolean;
  showGridLines: boolean;
  xAxisTextColor: string;
  yAxisTextColor: string;
  axisLineColor: string;
  yAxisTicks: number;
  visibleKeys: string[];
  setVisibleKeys: React.Dispatch<React.SetStateAction<string[]>>;
  showLegend: boolean;
  legendPosition: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize: string;
  legendFontColor: string;
  barCornerRadius?: number;
  showValues?: boolean;
  valuesFontSize?: string;
  valuesFontColor?: string;
  barOpacity?: number;
  animationDuration?: number;
  // layout and tooltipComponent are now at the top of the interface
}

export const StackedBarChartRenderer: React.FC<StackedBarChartRendererProps> = ({
  svgRef,
  tooltip,
  data,
  keys,
  indexBy,
  dimensions,
  margin,
  colors,
  showXAxis,
  showYAxis,
  showGridLines,
  xAxisTextColor,
  yAxisTextColor,
  axisLineColor,
  yAxisTicks,
  visibleKeys,
  setVisibleKeys,
  showLegend,
  legendPosition,
  legendFontSize,
  legendFontColor,
  barCornerRadius = 0,
  showValues = false,
  valuesFontSize = '10px',
  valuesFontColor = '#333333',
  barOpacity = 1,
  animationDuration = 750,
  layout = 'vertical',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tooltipComponent, // Destructured. Note: D3 renders HTML string tooltips; React component tooltips require different integration.
}) => {
  useEffect(() => {
    const { width: currentWidth, height: currentHeight } = dimensions;

    if (
      !svgRef.current ||
      !data ||
      data.length === 0 ||
      keys.length === 0 ||
      currentWidth <= 0 ||
      currentHeight <= 0
    ) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    // Calculate inner dimensions
    let innerWidth = currentWidth - margin.left - margin.right;
    let innerHeight = currentHeight - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Adjust dimensions for legend
    let legendWidth = 0;
    let legendHeight = 0;
    const legendPadding = 10;
    const legendItemHeight = 20; // Approximate height of a legend item
    const legendTextPadding = 5;

    if (showLegend) {
      if (legendPosition === 'top' || legendPosition === 'bottom') {
        legendHeight = legendItemHeight + legendPadding; // Minimum one line
        innerHeight -= legendHeight;
      } else if (legendPosition === 'left' || legendPosition === 'right') {
        // Estimate legend width
        const maxKeyLength = Math.max(...keys.map((key) => key.length));
        legendWidth =
          maxKeyLength * (parseFloat(legendFontSize) * 0.6) +
          legendItemHeight +
          legendTextPadding +
          legendPadding; // Approx width
        innerWidth -= legendWidth;
      }
    }

    if (innerWidth <= 0 || innerHeight <= 0) return;

    // Create main chart group
    const g = svg.append('g').attr('transform', () => {
      let xOffset = margin.left;
      let yOffset = margin.top;
      if (showLegend) {
        if (legendPosition === 'top') yOffset += legendHeight;
        else if (legendPosition === 'left') xOffset += legendWidth;
      }
      return `translate(${xOffset}, ${yOffset})`;
    });

    // Stack the data using only visible keys
    const stack = d3.stack<StackedBarChartData>().keys(visibleKeys);
    const stackedData = stack(data);

    // Define scales based on layout
    let xScale: d3.ScaleBand<string> | d3.ScaleLinear<number, number>;
    let yScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;

    if (layout === 'vertical') {
      xScale = d3
        .scaleBand<string>()
        .domain(data.map((d) => String(d[indexBy])))
        .range([0, innerWidth])
        .padding(0.2);
      const yDomainMax =
        d3.max(stackedData, (series) => d3.max(series, (d) => d[1] as number)) || 0;
      const yDomainMin =
        d3.min(stackedData, (series) => d3.min(series, (d) => d[0] as number)) || 0;
      yScale = d3
        .scaleLinear()
        .domain([Math.min(0, yDomainMin), yDomainMax])
        .nice()
        .range([innerHeight, 0]);
    } else {
      // Horizontal
      const xDomainMax =
        d3.max(stackedData, (series) => d3.max(series, (d) => d[1] as number)) || 0;
      const xDomainMin =
        d3.min(stackedData, (series) => d3.min(series, (d) => d[0] as number)) || 0;
      xScale = d3
        .scaleLinear()
        .domain([Math.min(0, xDomainMin), xDomainMax])
        .nice()
        .range([0, innerWidth]);
      yScale = d3
        .scaleBand<string>()
        .domain(data.map((d) => String(d[indexBy])))
        .range([0, innerHeight])
        .padding(0.2);
    }

    // Define color scale
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(keys)
      .range(colors || d3.schemeCategory10);

    // Add grid lines if enabled
    if (showGridLines) {
      if (layout === 'vertical') {
        addGridLines(
          g,
          xScale as d3.ScaleBand<string>,
          yScale as d3.ScaleLinear<number, number>,
          innerWidth,
          innerHeight,
          false, // showXGrid (vertical lines) - not for vertical layout's primary grid
          true, // showYGrid (horizontal lines)
          yAxisTicks,
          axisLineColor,
        );
      } else {
        // Horizontal layout
        addGridLines(
          g,
          yScale as d3.ScaleBand<string>, // Pass yScale (band) as x argument for addGridLines
          xScale as d3.ScaleLinear<number, number>, // Pass xScale (linear) as y argument
          innerWidth, // width becomes height for horizontal grid lines
          innerHeight, // height becomes width
          true, // showXGrid (vertical lines)
          false, // showYGrid (horizontal lines) - not for horizontal layout's primary grid
          yAxisTicks, // This might effectively become xTicks
          axisLineColor,
        );
      }
    }

    // Draw bars with transitions
    const barGroups = g
      .append('g')
      .attr('class', 'bar-series-container') // Added class for easier selection
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => String(colorScale(d.key)))
      .attr('opacity', barOpacity);

    barGroups
      .selectAll('rect')
      .data((d) => d.map((segment) => ({ ...segment, key: d.key }))) // Add key to each segment for tooltip
      .join('rect')
      .attr('class', 'bar-segment')
      .attr('rx', barCornerRadius)
      .attr('ry', barCornerRadius)
      .attr('x', (d) => {
        if (layout === 'vertical') {
          return (xScale as d3.ScaleBand<string>)(String(d.data[indexBy]))!;
        }
        // Horizontal layout
        const x0 = d[0] as number;
        const x1 = d[1] as number;
        return (xScale as d3.ScaleLinear<number, number>)(Math.min(x0, x1));
      })
      .attr('y', (d) =>
        layout === 'vertical'
          ? innerHeight
          : (yScale as d3.ScaleBand<string>)(String(d.data[indexBy]))!,
      )
      .attr('width', layout === 'vertical' ? (xScale as d3.ScaleBand<string>).bandwidth() : 0)
      .attr('height', layout === 'vertical' ? 0 : (yScale as d3.ScaleBand<string>).bandwidth())
      .transition()
      .duration(animationDuration)
      .attr('y', (d) => {
        if (layout === 'vertical') {
          const y0 = d[0] as number;
          const y1 = d[1] as number;
          return (yScale as d3.ScaleLinear<number, number>)(Math.max(y0, y1));
        }
        return (yScale as d3.ScaleBand<string>)(String(d.data[indexBy]))!;
      })
      .attr('height', (d) => {
        if (layout === 'vertical') {
          const y0 = d[0] as number;
          const y1 = d[1] as number;
          return Math.abs(
            (yScale as d3.ScaleLinear<number, number>)(y0) -
              (yScale as d3.ScaleLinear<number, number>)(y1),
          );
        }
        return (yScale as d3.ScaleBand<string>).bandwidth();
      })
      .attr('x', (d) => {
        if (layout === 'vertical') {
          return (xScale as d3.ScaleBand<string>)(String(d.data[indexBy]))!;
        }
        // Horizontal layout
        const x0 = d[0] as number;
        const x1 = d[1] as number;
        return (xScale as d3.ScaleLinear<number, number>)(Math.min(x0, x1));
      })
      .attr('width', (d) => {
        if (layout === 'horizontal') {
          const x0 = d[0] as number;
          const x1 = d[1] as number;
          return Math.abs(
            (xScale as d3.ScaleLinear<number, number>)(x1) -
              (xScale as d3.ScaleLinear<number, number>)(x0),
          );
        }
        return (xScale as d3.ScaleBand<string>).bandwidth();
      });

    // Add value labels if enabled
    if (showValues) {
      barGroups
        .selectAll('.value-text') // Use a class for easier selection
        .data((d) => d)
        .enter()
        .append('text')
        .attr('class', 'value-text')
        .attr('x', (d) => {
          const val = (d[1] as number) - (d[0] as number);
          if (layout === 'vertical') {
            return (
              (xScale as d3.ScaleBand<string>)(String(d.data[indexBy]))! +
              (xScale as d3.ScaleBand<string>).bandwidth() / 2
            );
          }
          // Horizontal: position after the bar segment, or centered if space allows
          return (xScale as d3.ScaleLinear<number, number>)((d[0] as number) + val / 2); // Centered in segment for horizontal
        })
        .attr('y', (d) => {
          if (layout === 'vertical') {
            return (yScale as d3.ScaleLinear<number, number>)(d[1] as number) - 5; // Adjust for negative values later
          }
          // Horizontal: center of the band
          return (
            (yScale as d3.ScaleBand<string>)(String(d.data[indexBy]))! +
            (yScale as d3.ScaleBand<string>).bandwidth() / 2 +
            parseFloat(valuesFontSize) / 3
          );
        })
        .attr('text-anchor', layout === 'vertical' ? 'middle' : 'middle') // middle for horizontal too, for centered text
        .attr('font-size', valuesFontSize)
        .attr('fill', valuesFontColor)
        .text((d) => {
          const value = (d[1] as number) - (d[0] as number);
          return value !== 0 ? value.toFixed(0) : ''; // Show non-zero values
        })
        .attr('opacity', 0)
        .transition()
        .duration(animationDuration)
        .attr('opacity', 1);
    }

    // Add x-axis
    if (showXAxis) {
      const xAxisGroup = g
        .append('g')
        .attr('class', 'x-axis')
        .attr(
          'transform',
          layout === 'vertical' ? `translate(0,${innerHeight})` : `translate(0,0)`,
        );

      if (layout === 'vertical') {
        xAxisGroup.call(d3.axisBottom(xScale as d3.ScaleBand<string>));
      } else {
        // For horizontal, X axis is typically at the bottom, but values can be negative.
        // If we want it fixed at bottom: .attr('transform', `translate(0,${innerHeight})`)
        // If we want it at y=0: .call(d3.axisBottom(xScale as d3.ScaleLinear<number,number>).tickSizeOuter(0).tickSizeInner(-innerHeight))
        // For simplicity, let's place it at the bottom for now.
        xAxisGroup
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(xScale as d3.ScaleLinear<number, number>).ticks(yAxisTicks));
      }

      xAxisGroup.selectAll('text').attr('fill', xAxisTextColor).attr('font-size', '10px');
      xAxisGroup.selectAll('.domain, .tick line').attr('stroke', axisLineColor);
    }

    // Add y-axis
    if (showYAxis) {
      const yAxisGroup = g.append('g').attr('class', 'y-axis');

      if (layout === 'vertical') {
        yAxisGroup.call(d3.axisLeft(yScale as d3.ScaleLinear<number, number>).ticks(yAxisTicks));
      } else {
        yAxisGroup.call(d3.axisLeft(yScale as d3.ScaleBand<string>));
      }

      yAxisGroup.selectAll('text').attr('fill', yAxisTextColor).attr('font-size', '10px');
      yAxisGroup.selectAll('.domain, .tick line').attr('stroke', axisLineColor);
    }

    // Add tooltip interactions
    barGroups
      .selectAll<SVGRectElement, StackedBarSegment>('rect')
      .on('mouseover', function (event: MouseEvent, d: StackedBarSegment) {
        event.stopPropagation();

        try {
          // Use D3's pointer event for accurate coordinates
          // const [mouseX, mouseY] = d3.pointer(event); // mouseX/Y relative to event target, not needed if using event.pageX/Y

          // Create tooltip content
          const mainCategoryLabel = d.data[indexBy]; // This is the label for the whole bar (e.g., 'Jan')
          let tooltipHtml = `<div style="padding: 8px; min-width: 150px; font-family: sans-serif; font-size: 12px;"><strong>${mainCategoryLabel}</strong><hr style="border-top: 1px solid #eee; margin: 4px 0;">`;

          // Iterate over the visible keys to display each segment's info
          // The 'd' object for a segment is an array [y0, y1], and d.data contains the original data object for the bar.
          // The key for the specific segment is available via d3.select(this.parentNode as SVGGElement).datum().key
          const segmentKey = (d3.select(this.parentNode as SVGGElement).datum() as { key: string })
            .key;
          const segmentValue = d[1] - d[0];
          const segmentColor = colors[keys.indexOf(segmentKey) % colors.length];

          tooltipHtml += `<div style="display: flex; align-items: center; margin-bottom: 4px;">
                            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${segmentColor}; margin-right: 5px; border-radius: 2px;"></span>
                            <span>${segmentKey}: ${segmentValue.toLocaleString()}</span>
                         </div>`;

          // To show all segments in the stack, not just the hovered one, we'd iterate through d.data using 'keys'
          // For now, the above shows only the hovered segment, which is simpler and often preferred.

          tooltipHtml += '</div>';

          // Show tooltip at the calculated position
          if (!svgRef.current) return;
          const [mouseX, mouseY] = d3.pointer(event, svgRef.current);
          tooltip.showTooltip(tooltipHtml, mouseX, mouseY);

          // Highlight the hovered bar
          d3.select(this).transition().duration(150).attr('opacity', 0.8);
        } catch (error) {
          console.error('Error showing tooltip:', error);
        }
      })
      .on('mouseout', function (event: MouseEvent, _d: StackedBarSegment) {
        // eslint-disable-line @typescript-eslint/no-unused-vars
        event.stopPropagation();
        try {
          // Hide tooltip
          tooltip.hideTooltip();

          // Reset bar opacity
          d3.select(this).transition().duration(150).attr('opacity', barOpacity);
        } catch (error) {
          console.error('Error hiding tooltip:', error);
        }
      });

    // Add legend
    if (showLegend && keys.length > 0) {
      const legendRectSize = 20;
      const legendItemHorizontalPadding = 8; // Space between rect and text
      const legendItemSpacing = 15; // Horizontal space between legend items
      const legendVerticalPadding = 10; // Vertical space between legend lines
      const legendLineHeight = legendRectSize + legendVerticalPadding;

      let initialLegendXTranslation = 0;
      let initialLegendYTranslation = 0;
      let calculatedLegendHeight = legendLineHeight;
      let calculatedLegendWidth = 0;

      // Temporarily append to svg for measurement if not already present
      const measureSvg = svgRef.current
        ? d3.select(svgRef.current)
        : d3.select(document.body).append('svg').style('visibility', 'hidden');
      const tempLegendGroup = measureSvg.append('g').attr('class', 'temp-measuring-legend');

      if (legendPosition === 'top' || legendPosition === 'bottom') {
        let tempCurrentX = 0;
        calculatedLegendHeight = legendLineHeight; // Min one line
        keys.forEach((key, i) => {
          const tempText = tempLegendGroup
            .append('text')
            .style('font-size', legendFontSize)
            .text(key);
          const textWidth = (tempText.node() as SVGTextElement).getComputedTextLength();
          tempText.remove();
          const itemWidth =
            legendRectSize + legendItemHorizontalPadding + textWidth + legendItemSpacing;
          if (tempCurrentX + itemWidth > innerWidth && i > 0) {
            tempCurrentX = 0;
            calculatedLegendHeight += legendLineHeight;
          }
          tempCurrentX += itemWidth;
        });
      } else {
        // 'left' or 'right'
        calculatedLegendHeight = keys.length * legendLineHeight - legendVerticalPadding; // Total height for vertical stack
        keys.forEach((key) => {
          const tempText = tempLegendGroup
            .append('text')
            .style('font-size', legendFontSize)
            .text(key);
          const textWidth = (tempText.node() as SVGTextElement).getComputedTextLength();
          tempText.remove();
          calculatedLegendWidth = Math.max(
            calculatedLegendWidth,
            legendRectSize + legendItemHorizontalPadding + textWidth,
          );
        });
      }
      if (!svgRef.current)
        tempLegendGroup.remove(); // Clean up if we added a temp svg
      else tempLegendGroup.remove(); // Clean up temp group from actual svg

      // Adjust main 'g' based on legend position and dimensions
      let mainGx = margin.left;
      let mainGy = margin.top;

      if (legendPosition === 'top') {
        mainGy += calculatedLegendHeight + legendVerticalPadding;
        initialLegendYTranslation = -calculatedLegendHeight - legendVerticalPadding; // Relative to new 'g' origin
      } else if (legendPosition === 'bottom') {
        initialLegendYTranslation = innerHeight + 30; // Spacing from chart bottom
      } else if (legendPosition === 'left') {
        mainGx += calculatedLegendWidth + legendItemSpacing;
        initialLegendXTranslation = -calculatedLegendWidth - legendItemSpacing; // Relative to new 'g' origin
      } else {
        // 'right'
        initialLegendXTranslation = innerWidth + legendItemSpacing;
        // innerWidth might need to be reduced if chart resizes due to right legend
      }
      g.attr('transform', `translate(${mainGx}, ${mainGy})`);

      const legend = g
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${initialLegendXTranslation}, ${initialLegendYTranslation})`)
        .style('pointer-events', 'none'); // Prevent legend group from capturing mouse events

      let currentX = 0;
      let currentY = 0;

      const legendItems = legend
        .selectAll('.legend-item')
        .data(keys)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .style('opacity', (d) => (visibleKeys.includes(d) ? 1 : 0.5))
        .style('cursor', 'pointer')
        .style('pointer-events', 'auto') // Allow individual items to capture events
        .on('click', (event: MouseEvent, key: string) => {
          setVisibleKeys((prevKeys) =>
            prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key],
          );
        });

      legendItems
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('rx', legendRectSize / 2) // For circular swatches
        .attr('ry', legendRectSize / 2) // For circular swatches
        .attr('fill', (d: string) => colorScale(d));

      legendItems
        .append('text')
        .attr('x', legendRectSize + legendItemHorizontalPadding)
        .attr('y', legendRectSize / 2) // Center text with rect
        .attr('dy', '0.35em')
        .style('font-size', legendFontSize)
        .style('fill', legendFontColor)
        .text((d: string) => d);

      // Position legend items
      if (legendPosition === 'top' || legendPosition === 'bottom') {
        legendItems.each(function (key, i) {
          const itemGroup = d3.select(this);
          const textNode = itemGroup.select('text').node() as SVGTextElement;
          const textWidth = textNode.getComputedTextLength();
          const itemWidth =
            legendRectSize + legendItemHorizontalPadding + textWidth + legendItemSpacing;

          if (currentX + itemWidth > innerWidth && i > 0) {
            currentX = 0;
            currentY += legendLineHeight;
          }
          itemGroup.attr('transform', `translate(${currentX}, ${currentY})`);
          currentX += itemWidth;
        });
      } else {
        // 'left' or 'right' - simple vertical stacking
        currentY = 0; // Ensure Y starts at 0 for vertical stacking
        legendItems.each(function () {
          d3.select(this).attr('transform', `translate(0, ${currentY})`);
          currentY += legendLineHeight;
        });
      }
    }
  }, [
    data,
    keys,
    indexBy,
    dimensions,
    margin,
    colors,
    showXAxis,
    showYAxis,
    showGridLines,
    xAxisTextColor,
    yAxisTextColor,
    axisLineColor,
    yAxisTicks,
    visibleKeys,
    setVisibleKeys,
    showLegend,
    legendPosition,
    legendFontSize,
    legendFontColor,
    barCornerRadius,
    showValues,
    valuesFontSize,
    valuesFontColor,
    barOpacity,
    animationDuration,
    svgRef,
    tooltip,
    layout,
  ]);

  return null; // Component returns null as rendering is done via D3
};
