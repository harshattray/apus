import React, { FC, useState, useRef } from 'react';
import { ScatterChartProps, ScatterHoveredData, ScatterDataPoint } from './types';
import { ScatterChartRenderer } from './ScatterChartRenderer';
import { useTooltip } from '../hooks/useTooltip';

/**
 * ScatterChart component for visualizing data points in a two-dimensional space.
 *
 * @component
 * @example
 * ```jsx
 * import { BasicScatterChart } from './ScatterChart.examples';
 *
 * <BasicScatterChart />
 * ```
 *
 * @example
 * ```jsx
 * import { ScatterChartWithFeatures } from './ScatterChart.examples';
 *
 * <ScatterChartWithFeatures />
 * ```
 *
 * @example
 * ```jsx
 * import { ScatterChartWithTrendLine } from './ScatterChart.examples';
 *
 * <ScatterChartWithTrendLine />
 * ```
 */
export const ScatterChart: FC<ScatterChartProps> = ({
  data,
  series,
  width,
  height,
  colors,
  style,
  className,
  xAxis = {},
  yAxis = {},
  grid = {},
  showLegend = true,
  legendPosition = 'right',
  clickableLegend = true,
  onLegendItemClick,
  showTooltip = true,
  tooltipFormat,
  tooltipBackgroundColor = 'rgba(50, 50, 50, 0.85)',
  tooltipTextColor = '#FFFFFF',
  tooltipPadding = '8px 12px',
  tooltipBorderRadius = '4px',
  tooltipOffsetX = 10,
  tooltipOffsetY = 10,
  trendLine,
  pointSize,
  bubbleChart,
  errorBars,
  visibleSeries,
  onSeriesToggle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [internalVisibleSeries, setInternalVisibleSeries] = useState<Record<string, boolean>>({});
  const visibleSeriesState = visibleSeries || internalVisibleSeries;
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    showTooltip: showTooltipFn,
    hideTooltip,
    applyTooltipStyles,
  } = useTooltip(tooltipRef, {
    backgroundColor: tooltipBackgroundColor,
    textColor: tooltipTextColor,
    padding: tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  });

  // Apply tooltip styles when component mounts
  React.useEffect(() => {
    applyTooltipStyles();
  }, [applyTooltipStyles]);

  // Initialize visible series when component mounts or series changes
  React.useEffect(() => {
    if (series && !visibleSeries) {
      const initialVisibility: Record<string, boolean> = {};
      series.forEach((s) => {
        initialVisibility[s.id] = s.visible !== false; // Default to true if not specified
      });
      setInternalVisibleSeries(initialVisibility);
    }
  }, [series, visibleSeries]);

  const handleLegendItemClick = (category: string | null, seriesId?: string) => {
    setSelectedCategory(category);
    if (seriesId) {
      setSelectedSeries(selectedSeries === seriesId ? null : seriesId);
    }
    if (onLegendItemClick) {
      onLegendItemClick(category, seriesId);
    }
  };

  const handleSeriesToggle = (seriesId: string, visible: boolean) => {
    if (onSeriesToggle) {
      onSeriesToggle(seriesId, visible);
    } else {
      setInternalVisibleSeries((prev) => ({
        ...prev,
        [seriesId]: visible,
      }));
    }
  };

  const handlePointHover = (
    event: MouseEvent,
    dataPoint: ScatterDataPoint,
    color: string,
    mouseX: number,
    mouseY: number,
    seriesId?: string,
    seriesName?: string,
  ) => {
    if (showTooltip) {
      // Format tooltip content
      let tooltipContent = '';

      const hovered: ScatterHoveredData = {
        ...dataPoint,
        eventX: event.pageX,
        eventY: event.pageY,
        seriesId,
        seriesName,
      };

      if (tooltipFormat) {
        tooltipContent = tooltipFormat(hovered);
      } else {
        const xValue = dataPoint.x instanceof Date ? dataPoint.x.toLocaleDateString() : dataPoint.x;
        tooltipContent = `
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <span style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 8px;"></span>
            <strong>${dataPoint.category}</strong>
          </div>
          ${seriesName ? `<div><strong>Series:</strong> ${seriesName}</div>` : ''}
          <div>X: ${xValue}</div>
          <div>Y: ${dataPoint.y}</div>
          ${dataPoint.size ? `<div>Size: ${dataPoint.size}</div>` : ''}
        `;
      }

      // Use the exact coordinates from the SVG with proper offsets
      // This ensures consistent positioning like in BarChart and RadarChart
      showTooltipFn(tooltipContent, mouseX, mouseY, tooltipOffsetX, tooltipOffsetY);
    }
  };

  const handlePointLeave = () => {
    if (showTooltip) {
      hideTooltip();
    }
  };

  return (
    <div style={{ ...style, position: 'relative' }} className={className}>
      <ScatterChartRenderer
        data={data}
        series={series}
        width={width}
        height={height}
        colors={colors}
        xAxis={xAxis}
        yAxis={yAxis}
        grid={grid}
        showLegend={showLegend}
        legendPosition={legendPosition}
        clickableLegend={clickableLegend}
        onLegendItemClick={handleLegendItemClick}
        selectedCategory={selectedCategory}
        selectedSeries={selectedSeries}
        onPointHover={handlePointHover}
        onPointLeave={handlePointLeave}
        onSeriesToggle={handleSeriesToggle}
        trendLine={trendLine}
        pointSize={pointSize}
        bubbleChart={bubbleChart}
        errorBars={errorBars}
        visibleSeries={visibleSeriesState}
      />
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{ position: 'absolute', display: 'none', pointerEvents: 'none' }}
      />
    </div>
  );
};
