/**
 * @file LineChart.tsx
 * @description Main LineChart component
 * @author Harsha Attray
 */
import React, { useRef, useEffect } from 'react';
import { LineChartProps } from './types';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useTooltip } from '../hooks/useTooltip';
import { LineChartRenderer } from './LineChartRenderer';

/**
 * LineChart component for rendering line charts
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 600,
  height = 400,
  lineColors = '#4682b4',
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
  showLegend = false,
  legendPosition = 'bottom',
  legendFontSize = '12px',
  legendFontColor = '#cccccc',
  ariaLabel = 'Line chart',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Use custom hooks
  const dimensions = useChartDimensions(containerRef, width, height, responsive);
  const tooltip = useTooltip(tooltipRef, {
    backgroundColor: tooltipBackgroundColor,
    textColor: tooltipTextColor,
    padding: tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: tooltipFontSize,
  });

  // Apply tooltip styles when component mounts
  useEffect(() => {
    tooltip.applyTooltipStyles();
  }, [tooltip]);

  const paddingBottom = responsive ? `${(height / width) * 100}%` : undefined;

  return (
    <div
      ref={containerRef}
      style={{
        position: responsive ? 'relative' : undefined,
        width: responsive ? '100%' : width,
        height: responsive ? '0' : height,
        paddingBottom: paddingBottom,
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: responsive ? 'absolute' : undefined,
          top: 0,
          left: 0,
        }}
        aria-label={ariaLabel}
      >
        <LineChartRenderer
          svgRef={svgRef}
          tooltipRef={tooltipRef}
          data={data}
          dimensions={dimensions}
          lineColors={lineColors}
          areaColor={areaColor}
          pointColor={pointColor}
          margin={margin}
          yAxisTicks={yAxisTicks}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showGridLines={showGridLines}
          areaGradientColors={areaGradientColors}
          lineGradientColors={lineGradientColors}
          showArea={showArea}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendFontSize={legendFontSize}
          legendFontColor={legendFontColor}
        />
      </svg>
      <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
    </div>
  );
};
