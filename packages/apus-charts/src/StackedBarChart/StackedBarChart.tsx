/**
 * @file StackedBarChart.tsx
 * @description Main StackedBarChart component
 */
import React, { useRef, useEffect, useState } from 'react';
import { StackedBarChartProps } from './types';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useTooltip } from '../hooks/useTooltip';
import { StackedBarChartRenderer } from './StackedBarChartRenderer';

/**
 * StackedBarChart component for rendering stacked bar charts
 */
export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  keys,
  indexBy,
  width = 600,
  height = 400,
  layout = 'vertical',
  colors = ['#f8a07b', '#ffc5b2', '#ff7c43', '#e34a33', '#b30000', '#7f0000'],
  margin = { top: 30, right: 30, bottom: 50, left: 60 },
  responsive = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  xAxisTextColor = '#666666',
  yAxisTextColor = '#666666',
  axisLineColor = '#cccccc',
  yAxisTicks = 5,
  tooltipBackgroundColor = '#FFFFFF',
  tooltipTextColor = '#333333',
  tooltipPadding = '10px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  ariaLabel = 'Stacked bar chart',
  showLegend = true,
  legendPosition = 'top',
  legendFontSize = '12px',
  legendFontColor = '#666666',
  barCornerRadius = 0,
  showValues = false,
  valuesFontSize = '10px',
  valuesFontColor = '#333333',
  barOpacity = 1,
  animationDuration = 750,
  visibleKeys: externalVisibleKeys,
  setVisibleKeys: externalSetVisibleKeys,
  tooltipComponent, // Keep this if it exists, or remove if not used elsewhere
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // State for tracking visible keys if not controlled from parent
  const [internalVisibleKeys, setInternalVisibleKeys] = useState<string[]>(keys);

  // Use controlled visibleKeys if provided, otherwise use local state
  const visibleKeys = externalVisibleKeys !== undefined ? externalVisibleKeys : internalVisibleKeys;
  const setVisibleKeys = externalSetVisibleKeys || setInternalVisibleKeys;

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

  // Update visible keys when keys prop changes
  useEffect(() => {
    if (!externalSetVisibleKeys) {
      setInternalVisibleKeys(keys);
    }
  }, [keys, externalSetVisibleKeys, setInternalVisibleKeys]);

  const paddingBottom = responsive ? `${(height / width) * 100}%` : undefined;

  return (
    <div
      ref={containerRef}
      style={{
        position: responsive ? 'relative' : undefined,
        width: responsive ? '100%' : width,
        height: responsive ? '0' : height,
        paddingBottom: paddingBottom,
        minHeight:
          showLegend && (legendPosition === 'top' || legendPosition === 'bottom') && responsive
            ? `${dimensions.height + 40}px`
            : undefined,
      }}
    >
      {/* Tooltip element */}
      {/* Tooltip element, styled by useTooltip hook */}
      <div ref={tooltipRef} aria-hidden="true" />

      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: responsive ? 'absolute' : undefined,
          top: 0,
          left: 0,
          overflow: 'visible',
        }}
        aria-label={ariaLabel}
      >
        <StackedBarChartRenderer
          svgRef={svgRef}
          tooltip={tooltip}
          data={data}
          keys={keys}
          indexBy={indexBy}
          dimensions={dimensions}
          margin={margin}
          colors={colors}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showGridLines={showGridLines}
          xAxisTextColor={xAxisTextColor}
          yAxisTextColor={yAxisTextColor}
          axisLineColor={axisLineColor}
          yAxisTicks={yAxisTicks}
          visibleKeys={visibleKeys}
          setVisibleKeys={setVisibleKeys}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendFontSize={legendFontSize}
          legendFontColor={legendFontColor}
          barCornerRadius={barCornerRadius}
          showValues={showValues}
          valuesFontSize={valuesFontSize}
          valuesFontColor={valuesFontColor}
          barOpacity={barOpacity}
          animationDuration={animationDuration}
          layout={layout}
          tooltipComponent={tooltipComponent}
        />
      </svg>
    </div>
  );
};

export default StackedBarChart;
