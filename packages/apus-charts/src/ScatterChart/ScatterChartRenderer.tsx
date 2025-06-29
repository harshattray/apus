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
  series,
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
  bubbleChart = {},
  errorBars = {},
  selectedCategory,
  selectedSeries,
  visibleSeries = {},
  onPointHover,
  onPointLeave,
  onLegendItemClick,
  onSeriesToggle,
  onPointClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Process data from either single dataset or multiple series
    const allData: Array<ScatterDataPoint & { seriesId?: string; seriesName?: string }> = [];
    const seriesList: Array<{ id: string; name: string; color: string }> = [];

    if (series && series.length > 0) {
      // Multiple series mode
      series.forEach((s) => {
        if (s.visible !== false && (!visibleSeries[s.id] || visibleSeries[s.id])) {
          s.data.forEach((d) => {
            allData.push({
              ...d,
              seriesId: s.id,
              seriesName: s.name || s.id,
            });
          });
          seriesList.push({
            id: s.id,
            name: s.name || s.id,
            color: typeof s.colors === 'string' ? s.colors : '',
          });
        }
      });
    } else if (data && data.length > 0) {
      // Single dataset mode
      allData.push(...data);
    }

    if (allData.length === 0 || width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin: Margin = { top: 40, right: 40, bottom: 50, left: 60 };

    // Get unique categories across all series
    const categories = [...new Set(allData.map((d) => d.category))];

    // Create separate color scales for categories and series
    let categoryColorScale: d3.ScaleOrdinal<string, string>;
    let seriesColorScale: d3.ScaleOrdinal<string, string>;

    // Handle colors as either array or object for categories
    if (Array.isArray(colors)) {
      categoryColorScale = d3.scaleOrdinal<string>().domain(categories).range(colors);
    } else if (typeof colors === 'object' && colors !== null) {
      categoryColorScale = d3
        .scaleOrdinal<string>()
        .domain(Object.keys(colors))
        .range(Object.values(colors as Record<string, string>));
    } else {
      categoryColorScale = d3.scaleOrdinal<string>().domain(categories).range(DEFAULT_COLORS);
    }

    // Create series color scale
    seriesColorScale = d3
      .scaleOrdinal<string>()
      .domain(seriesList.map((s) => s.id))
      .range(DEFAULT_COLORS);

    // Helper function to get point color based on series or category
    const getPointColor = (
      d: ScatterDataPoint & { seriesId?: string; seriesName?: string },
    ): string => {
      // If we have series and this point has a seriesId, use series color
      if (series && series.length > 0 && d.seriesId) {
        const seriesConfig = series.find((s) => s.id === d.seriesId);
        if (seriesConfig && typeof seriesConfig.colors === 'string') {
          return seriesConfig.colors;
        }
        return seriesColorScale(d.seriesId);
      }
      // Otherwise use category color
      return d.category ? categoryColorScale(d.category) : DEFAULT_COLORS[0];
    };

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

    const xIsDate = allData.length > 0 && allData[0]?.x instanceof Date;

    // Safely calculate domain extents with proper type handling
    const xDomain =
      allData.length > 0
        ? (d3.extent(allData, (d) => d.x) as [number | Date, number | Date])
        : ([0, 1] as [number | Date, number | Date]);
    const yDomain =
      allData.length > 0
        ? (d3.extent(allData, (d) => d.y) as [number, number])
        : ([0, 1] as [number, number]);

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

    // Configure bubble chart settings
    const bubbleEnabled = bubbleChart.enabled || false;
    const valueField = bubbleChart.valueField || 'size';
    const minSize = bubbleChart.minSize || pointSize;
    const maxSize = bubbleChart.maxSize || pointSize * 3;
    const sizeScale = bubbleChart.sizeScale || 'linear';

    // Create size scale if bubble chart is enabled
    let pointSizeScale: d3.ScaleLinear<number, number> | null = null;

    if (bubbleEnabled) {
      // Get min and max size values from data safely
      const sizeExtent =
        data && data.length > 0
          ? (d3
              .extent(data, (d) => {
                const sizeValue = d[valueField as keyof ScatterDataPoint];
                return typeof sizeValue === 'number' ? sizeValue : null;
              })
              .filter((v): v is number => v !== null) as [number, number])
          : ([1, 10] as [number, number]); // Default if no data

      // Create appropriate scale based on configuration
      if (sizeScale === 'sqrt') {
        pointSizeScale = d3.scaleSqrt().domain(sizeExtent).range([minSize, maxSize]);
      } else if (sizeScale === 'log') {
        // Ensure domain doesn't include zero or negative values for log scale
        const logDomain = [Math.max(0.1, sizeExtent[0]), sizeExtent[1]];
        pointSizeScale = d3.scaleLog().domain(logDomain).range([minSize, maxSize]);
      } else {
        // Default to linear scale
        pointSizeScale = d3.scaleLinear().domain(sizeExtent).range([minSize, maxSize]);
      }
    }

    // Data points
    g.selectAll('.dot')
      .data(allData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.x as number))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', (d) => {
        // Check for series-specific point size
        if (d.seriesId) {
          const seriesItem = series?.find((s) => s.id === d.seriesId);
          if (seriesItem?.pointSize) {
            return seriesItem.pointSize;
          }

          // Check for series-specific bubble chart
          if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
            const seriesBubbleConfig = seriesItem.bubbleChart;
            const seriesValueField = seriesBubbleConfig.valueField || valueField;
            const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
            return typeof sizeValue === 'number'
              ? pointSizeScale(sizeValue)
              : seriesItem.pointSize || pointSize;
          }
        }

        // Default bubble chart behavior
        if (bubbleEnabled && pointSizeScale) {
          const sizeValue = d[valueField as keyof ScatterDataPoint];
          return typeof sizeValue === 'number' ? pointSizeScale(sizeValue) : pointSize;
        }
        return pointSize;
      })
      .style('fill', (d) => getPointColor(d))
      .style('opacity', (d) => {
        // Filter by both category and series
        const categoryMatch = !selectedCategory || d.category === selectedCategory;
        const seriesMatch = !selectedSeries || d.seriesId === selectedSeries;
        return categoryMatch && seriesMatch ? 0.8 : 0.2;
      })
      .style('cursor', 'pointer')
      .on('click', function (event: MouseEvent, d: ScatterDataPoint & { seriesId?: string }) {
        if (onPointClick) {
          onPointClick(event, d, d.seriesId);
        }
      })
      .on(
        'mouseover',
        function (
          event: MouseEvent,
          d: ScatterDataPoint & { seriesId?: string; seriesName?: string },
        ) {
          // Highlight the point on hover
          d3.select(this)
            .attr('r', () => {
              // Check for series-specific point size
              if (d.seriesId) {
                const seriesItem = series?.find((s) => s.id === d.seriesId);
                if (seriesItem?.pointSize) {
                  return seriesItem.pointSize * 1.5;
                }

                // Check for series-specific bubble chart
                if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
                  const seriesBubbleConfig = seriesItem.bubbleChart;
                  const seriesValueField = seriesBubbleConfig.valueField || valueField;
                  const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
                  return typeof sizeValue === 'number'
                    ? pointSizeScale(sizeValue) * 1.5
                    : (seriesItem.pointSize || pointSize) * 1.5;
                }
              }

              // Default bubble chart behavior
              if (bubbleEnabled && pointSizeScale) {
                const sizeValue = d[valueField as keyof ScatterDataPoint];
                return typeof sizeValue === 'number'
                  ? pointSizeScale(sizeValue) * 1.5
                  : pointSize * 1.5;
              }
              return pointSize * 1.5;
            })
            .style('stroke', '#fff')
            .style('stroke-width', 2);

          if (onPointHover) {
            const [mouseX, mouseY] = d3.pointer(event, svg.node());
            const color = getPointColor(d);
            onPointHover(event, d, color, mouseX, mouseY, d.seriesId, d.seriesName);
          }
        },
      )
      .on(
        'mousemove',
        function (
          event: MouseEvent,
          d: ScatterDataPoint & { seriesId?: string; seriesName?: string },
        ) {
          // Update tooltip position on mouse move
          if (onPointHover) {
            const [mouseX, mouseY] = d3.pointer(event, svg.node());
            const color = getPointColor(d);
            onPointHover(event, d, color, mouseX, mouseY, d.seriesId, d.seriesName);
          }
        },
      )
      .on('mouseout', function (event: MouseEvent, d: ScatterDataPoint & { seriesId?: string }) {
        // Reset point appearance
        d3.select(this)
          .attr('r', () => {
            // Check for series-specific point size
            if (d.seriesId) {
              const seriesItem = series?.find((s) => s.id === d.seriesId);
              if (seriesItem?.pointSize) {
                return seriesItem.pointSize;
              }

              // Check for series-specific bubble chart
              if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
                const seriesBubbleConfig = seriesItem.bubbleChart;
                const seriesValueField = seriesBubbleConfig.valueField || valueField;
                const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
                return typeof sizeValue === 'number'
                  ? pointSizeScale(sizeValue)
                  : seriesItem.pointSize || pointSize;
              }
            }

            // Default bubble chart behavior
            if (bubbleEnabled && pointSizeScale) {
              const sizeValue = d[valueField as keyof ScatterDataPoint];
              return typeof sizeValue === 'number' ? pointSizeScale(sizeValue) : pointSize;
            }
            return pointSize;
          })
          .style('stroke', 'none');
        if (onPointLeave) {
          onPointLeave();
        }
      });

    // Draw error bars if enabled
    const errorBarsEnabled = errorBars?.enabled || false;
    const errorBarColor = errorBars?.color || '#333';
    const errorBarStrokeWidth = errorBars?.strokeWidth || 1;
    const errorBarCapWidth = errorBars?.capWidth || 6;
    const errorBarOpacity = errorBars?.opacity || 0.6;
    const showXErrorBars = errorBars?.xAxis !== false; // Default to true if not specified
    const showYErrorBars = errorBars?.yAxis !== false; // Default to true if not specified
    const showErrorBarCaps = errorBars?.showCaps !== false; // Default to true if not specified

    if (errorBarsEnabled) {
      // Create a group for error bars
      const errorBarsGroup = g.append('g').attr('class', 'error-bars');

      // Draw error bars for each point in allData
      allData.forEach((d) => {
        // Skip points from filtered categories
        if (selectedCategory && d.category !== selectedCategory) return;
        // Skip points from filtered series
        if (selectedSeries && d.seriesId !== selectedSeries) return;

        // Get series-specific error bar settings if available
        let pointErrorBarColor = errorBarColor;
        let pointErrorBarStrokeWidth = errorBarStrokeWidth;
        let pointErrorBarOpacity = errorBarOpacity;

        if (d.seriesId) {
          const seriesItem = series?.find((s) => s.id === d.seriesId);
          if (seriesItem?.errorBars) {
            pointErrorBarColor = seriesItem.errorBars.color || pointErrorBarColor;
            pointErrorBarStrokeWidth = seriesItem.errorBars.strokeWidth || pointErrorBarStrokeWidth;
            pointErrorBarOpacity = seriesItem.errorBars.opacity || pointErrorBarOpacity;
          }
        }

        // X-axis error bars
        if (showXErrorBars && d.xError !== undefined) {
          let xErrorNeg: number, xErrorPos: number;

          if (Array.isArray(d.xError)) {
            // Asymmetric error
            if (d.xError.length >= 2) {
              xErrorNeg = d.xError[0];
              xErrorPos = d.xError[1];
            } else if (d.xError.length === 1) {
              xErrorNeg = xErrorPos = d.xError[0];
            } else {
              xErrorNeg = xErrorPos = 0; // Empty array case
            }
          } else {
            // Symmetric error
            xErrorNeg = xErrorPos = d.xError;
          }

          // Draw horizontal error bar
          errorBarsGroup
            .append('line')
            .attr('class', 'error-bar-x')
            .attr('x1', xScale((d.x as number) - xErrorNeg))
            .attr('x2', xScale((d.x as number) + xErrorPos))
            .attr('y1', yScale(d.y))
            .attr('y2', yScale(d.y))
            .attr('stroke', getPointColor(d))
            .attr('stroke-width', pointErrorBarStrokeWidth)
            .attr('opacity', pointErrorBarOpacity);

          // Draw caps if enabled
          if (showErrorBarCaps) {
            // Left cap
            errorBarsGroup
              .append('line')
              .attr('class', 'error-bar-x-cap-left')
              .attr('x1', xScale((d.x as number) - xErrorNeg))
              .attr('x2', xScale((d.x as number) - xErrorNeg))
              .attr('y1', yScale(d.y) - errorBarCapWidth / 2)
              .attr('y2', yScale(d.y) + errorBarCapWidth / 2)
              .attr('stroke', getPointColor(d))
              .attr('stroke-width', pointErrorBarStrokeWidth)
              .attr('opacity', pointErrorBarOpacity);

            // Right cap
            errorBarsGroup
              .append('line')
              .attr('class', 'error-bar-x-cap-right')
              .attr('x1', xScale((d.x as number) + xErrorPos))
              .attr('x2', xScale((d.x as number) + xErrorPos))
              .attr('y1', yScale(d.y) - errorBarCapWidth / 2)
              .attr('y2', yScale(d.y) + errorBarCapWidth / 2)
              .attr('stroke', getPointColor(d))
              .attr('stroke-width', pointErrorBarStrokeWidth)
              .attr('opacity', pointErrorBarOpacity);
          }
        }

        // Y-axis error bars
        if (showYErrorBars && d.yError !== undefined) {
          let yErrorNeg: number, yErrorPos: number;

          if (Array.isArray(d.yError)) {
            // Asymmetric error
            if (d.yError.length >= 2) {
              yErrorNeg = d.yError[0];
              yErrorPos = d.yError[1];
            } else if (d.yError.length === 1) {
              yErrorNeg = yErrorPos = d.yError[0];
            } else {
              yErrorNeg = yErrorPos = 0; // Empty array case
            }
          } else {
            // Symmetric error
            yErrorNeg = yErrorPos = d.yError;
          }

          // Draw vertical error bar
          errorBarsGroup
            .append('line')
            .attr('class', 'error-bar-y')
            .attr('x1', xScale(d.x as number))
            .attr('x2', xScale(d.x as number))
            .attr('y1', yScale(d.y - yErrorNeg))
            .attr('y2', yScale(d.y + yErrorPos))
            .attr('stroke', getPointColor(d))
            .attr('stroke-width', pointErrorBarStrokeWidth)
            .attr('opacity', pointErrorBarOpacity);

          // Draw caps if enabled
          if (showErrorBarCaps) {
            // Top cap
            errorBarsGroup
              .append('line')
              .attr('class', 'error-bar-y-cap-top')
              .attr('x1', xScale(d.x as number) - errorBarCapWidth / 2)
              .attr('x2', xScale(d.x as number) + errorBarCapWidth / 2)
              .attr('y1', yScale(d.y - yErrorNeg))
              .attr('y2', yScale(d.y - yErrorNeg))
              .attr('stroke', getPointColor(d))
              .attr('stroke-width', pointErrorBarStrokeWidth)
              .attr('opacity', pointErrorBarOpacity);

            // Bottom cap
            errorBarsGroup
              .append('line')
              .attr('class', 'error-bar-y-cap-bottom')
              .attr('x1', xScale(d.x as number) - errorBarCapWidth / 2)
              .attr('x2', xScale(d.x as number) + errorBarCapWidth / 2)
              .attr('y1', yScale(d.y + yErrorPos))
              .attr('y2', yScale(d.y + yErrorPos))
              .attr('stroke', getPointColor(d))
              .attr('stroke-width', pointErrorBarStrokeWidth)
              .attr('opacity', pointErrorBarOpacity);
          }
        }
      });
    }

    // Add larger transparent circles for easier hovering
    g.selectAll('.hover-area')
      .data(allData)
      .enter()
      .append('circle')
      .attr('class', 'hover-area')
      .attr('cx', (d) => xScale(d.x as number))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', (d) => {
        // Check for series-specific point size
        if (d.seriesId) {
          const seriesItem = series?.find((s) => s.id === d.seriesId);
          if (seriesItem?.pointSize) {
            return seriesItem.pointSize * 3;
          }

          // Check for series-specific bubble chart
          if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
            const seriesBubbleConfig = seriesItem.bubbleChart;
            const seriesValueField = seriesBubbleConfig.valueField || valueField;
            const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
            return typeof sizeValue === 'number'
              ? pointSizeScale(sizeValue) * 2
              : (seriesItem.pointSize || pointSize) * 3;
          }
        }

        // Default bubble chart behavior
        if (bubbleEnabled && pointSizeScale) {
          const sizeValue = d[valueField as keyof ScatterDataPoint];
          return typeof sizeValue === 'number' ? pointSizeScale(sizeValue) * 2 : pointSize * 3;
        }
        return pointSize * 3; // Larger area for easier hovering
      })
      .style('fill', 'transparent')
      .style('pointer-events', 'all')
      .on('click', function (event: MouseEvent, d: ScatterDataPoint & { seriesId?: string }) {
        if (onPointClick) {
          onPointClick(event, d, d.seriesId);
        }
      })
      .on(
        'mouseover',
        function (
          event: MouseEvent,
          d: ScatterDataPoint & { seriesId?: string; seriesName?: string },
        ) {
          // Find and highlight the corresponding dot
          svg
            .selectAll('.dot')
            .filter((p: any) => p === d)
            .attr('r', () => {
              // Check for series-specific point size
              if (d.seriesId) {
                const seriesItem = series?.find((s) => s.id === d.seriesId);
                if (seriesItem?.pointSize) {
                  return seriesItem.pointSize * 1.5;
                }

                // Check for series-specific bubble chart
                if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
                  const seriesBubbleConfig = seriesItem.bubbleChart;
                  const seriesValueField = seriesBubbleConfig.valueField || valueField;
                  const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
                  return typeof sizeValue === 'number'
                    ? pointSizeScale(sizeValue) * 1.5
                    : (seriesItem.pointSize || pointSize) * 1.5;
                }
              }

              // Default bubble chart behavior
              if (bubbleEnabled && pointSizeScale) {
                const sizeValue = d[valueField as keyof ScatterDataPoint];
                return typeof sizeValue === 'number'
                  ? pointSizeScale(sizeValue) * 1.5
                  : pointSize * 1.5;
              }
              return pointSize * 1.5;
            })
            .style('stroke', '#fff')
            .style('stroke-width', 2);

          if (onPointHover) {
            const [mouseX, mouseY] = d3.pointer(event, svg.node());
            const color = getPointColor(d);
            onPointHover(event, d, color, mouseX, mouseY, d.seriesId, d.seriesName);
          }
        },
      )
      .on(
        'mousemove',
        function (
          event: MouseEvent,
          d: ScatterDataPoint & { seriesId?: string; seriesName?: string },
        ) {
          if (onPointHover) {
            const [mouseX, mouseY] = d3.pointer(event, svg.node());
            const color = getPointColor(d);
            onPointHover(event, d, color, mouseX, mouseY, d.seriesId, d.seriesName);
          }
        },
      )
      .on('mouseout', function (event: MouseEvent, d: ScatterDataPoint & { seriesId?: string }) {
        // Reset the corresponding dot
        svg
          .selectAll('.dot')
          .filter((p: any) => p === d)
          .attr('r', () => {
            // Check for series-specific point size
            if (d.seriesId) {
              const seriesItem = series?.find((s) => s.id === d.seriesId);
              if (seriesItem?.pointSize) {
                return seriesItem.pointSize;
              }

              // Check for series-specific bubble chart
              if (seriesItem?.bubbleChart?.enabled && pointSizeScale) {
                const seriesBubbleConfig = seriesItem.bubbleChart;
                const seriesValueField = seriesBubbleConfig.valueField || valueField;
                const sizeValue = d[seriesValueField as keyof ScatterDataPoint];
                return typeof sizeValue === 'number'
                  ? pointSizeScale(sizeValue)
                  : seriesItem.pointSize || pointSize;
              }
            }

            // Default bubble chart behavior
            if (bubbleEnabled && pointSizeScale) {
              const sizeValue = d[valueField as keyof ScatterDataPoint];
              return typeof sizeValue === 'number' ? pointSizeScale(sizeValue) : pointSize;
            }
            return pointSize;
          })
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

      const regressionData = data ? regressionGenerator(data) : [];

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
        .style('fill', (d) => (d ? categoryColorScale(d) : DEFAULT_COLORS[0]))
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
    series,
    colors,
    xAxis,
    yAxis,
    grid,
    showLegend,
    legendPosition,
    clickableLegend,
    trendLine,
    pointSize,
    bubbleChart,
    errorBars,
    selectedCategory,
    selectedSeries,
    visibleSeries,
    onPointHover,
    onPointLeave,
    onLegendItemClick,
    onSeriesToggle,
    onPointClick,
  ]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};
