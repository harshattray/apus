import React from 'react';
import { FunnelChartProps } from './types';
import FunnelChartRenderer from './FunnelChartRenderer';

const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  showValues = true,
  valueFormat = (value) => value.toString(),
  onSliceClick,
  className,
  style,
  isDarkMode,
  tooltipBackgroundColor,
  tooltipTextColor,
  tooltipPadding,
  tooltipBorderRadius,
  tooltipFontSize,
  tooltipOffsetX,
  tooltipOffsetY,
  tooltipFormat,
  showLegend,
  legendPosition,
  legendTitle,
  legendItemColor,
  legendSwatchSize,
  legendGap,
  clickableLegend,
  onLegendItemClick,
  legendTitleColor,
  legendTitleFontSize,
  legendTitleFontFamily,
  legendSwatchBorderWidth,
  legendSwatchBorderColor,
}) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: height,
        ...style,
      }}
    >
      <FunnelChartRenderer
        data={data}
        width={width}
        height={height}
        margin={margin}
        showValues={showValues}
        valueFormat={valueFormat}
        onSliceClick={onSliceClick}
        isDarkMode={isDarkMode}
        tooltipBackgroundColor={tooltipBackgroundColor}
        tooltipTextColor={tooltipTextColor}
        tooltipPadding={tooltipPadding}
        tooltipBorderRadius={tooltipBorderRadius}
        tooltipFontSize={tooltipFontSize}
        tooltipOffsetX={tooltipOffsetX}
        tooltipOffsetY={tooltipOffsetY}
        tooltipFormat={tooltipFormat}
        showLegend={showLegend}
        legendPosition={legendPosition}
        legendTitle={legendTitle}
        legendItemColor={legendItemColor}
        legendSwatchSize={legendSwatchSize}
        legendGap={legendGap}
        clickableLegend={clickableLegend}
        onLegendItemClick={onLegendItemClick}
        legendTitleColor={legendTitleColor}
        legendTitleFontSize={legendTitleFontSize}
        legendTitleFontFamily={legendTitleFontFamily}
        legendSwatchBorderWidth={legendSwatchBorderWidth}
        legendSwatchBorderColor={legendSwatchBorderColor}
      />
    </div>
  );
};

export default FunnelChart;
