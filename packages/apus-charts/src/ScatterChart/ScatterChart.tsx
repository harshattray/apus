import React, { FC, useState, useRef } from 'react';
import { ScatterChartProps, ScatterHoveredData, ScatterDataPoint } from './types';
import { ScatterChartRenderer } from './ScatterChartRenderer';
import { useTooltip } from '../hooks/useTooltip';

export const ScatterChart: FC<ScatterChartProps> = ({
  data,
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
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const handleLegendItemClick = (category: string | null) => {
    setSelectedCategory(category);
    if (onLegendItemClick) {
      onLegendItemClick(category);
    }
  };

  const handlePointHover = (
    event: MouseEvent,
    dataPoint: ScatterDataPoint,
    color: string,
    mouseX: number,
    mouseY: number,
  ) => {
    if (showTooltip) {
      // Format tooltip content
      let tooltipContent = '';

      const hovered: ScatterHoveredData = {
        ...dataPoint,
        eventX: event.pageX,
        eventY: event.pageY,
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
          <div>X: ${xValue}</div>
          <div>Y: ${dataPoint.y}</div>
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
        onPointHover={handlePointHover}
        onPointLeave={handlePointLeave}
        trendLine={trendLine}
        pointSize={pointSize}
      />
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{ position: 'absolute', display: 'none', pointerEvents: 'none' }}
      />
    </div>
  );
};
