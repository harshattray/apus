/**
 * @file BarChart.tsx
 * @description Main BarChart component
 * @author Harsha Attray
 */
import React, { useRef, useEffect } from 'react';
import { BarChartProps } from './types';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useTooltip } from '../hooks/useTooltip';
import { BarChartRenderer } from './BarChartRenderer';

/**
 * BarChart component for rendering bar charts
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 600,
  height = 400,
  color = '#6a93d1',
  gradientColors,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  responsive = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = false,
  xAxisTextColor = '#cccccc',
  yAxisTextColor = '#cccccc',
  axisLineColor = '#cccccc',
  yAxisTicks = 5,
  tooltipBackgroundColor = 'rgba(0, 0, 0, 0.7)',
  tooltipTextColor = 'white',
  tooltipPadding = '8px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  ariaLabel = 'Bar chart',
  showLegend = false,
  legendPosition = 'bottom',
  legendFontSize = '12px',
  legendFontColor = '#cccccc',
  legendLabels,
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
        <BarChartRenderer
          svgRef={svgRef}
          tooltipRef={tooltipRef}
          data={data}
          dimensions={dimensions}
          color={color}
          gradientColors={gradientColors}
          margin={margin}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showGridLines={showGridLines}
          xAxisTextColor={xAxisTextColor}
          yAxisTextColor={yAxisTextColor}
          axisLineColor={axisLineColor}
          yAxisTicks={yAxisTicks}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendFontSize={legendFontSize}
          legendFontColor={legendFontColor}
          legendLabels={legendLabels}
        />
      </svg>
      <div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
    </div>
  );
};
