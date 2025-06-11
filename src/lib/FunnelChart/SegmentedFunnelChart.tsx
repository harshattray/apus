import React from 'react';
import { SegmentedFunnelChartProps } from './types';
import SegmentedFunnelChartRenderer from './SegmentedFunnelChartRenderer';

const SegmentedFunnelChart: React.FC<SegmentedFunnelChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  showValues,
  valueFormat,
  onSliceClick,
  tooltipBackgroundColor = '#000000',
  tooltipTextColor = '#FFFFFF',
  tooltipPadding = '8px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  tooltipOffsetX = 10,
  tooltipOffsetY = 10,
  tooltipSegmentFormat,
  isDarkMode = false,
}) => {
  return (
    <SegmentedFunnelChartRenderer
      data={data}
      width={width}
      height={height}
      margin={margin}
      showValues={showValues}
      valueFormat={valueFormat}
      onSliceClick={onSliceClick}
      tooltipBackgroundColor={tooltipBackgroundColor}
      tooltipTextColor={tooltipTextColor}
      tooltipPadding={tooltipPadding}
      tooltipBorderRadius={tooltipBorderRadius}
      tooltipFontSize={tooltipFontSize}
      tooltipOffsetX={tooltipOffsetX}
      tooltipOffsetY={tooltipOffsetY}
      tooltipSegmentFormat={tooltipSegmentFormat}
      isDarkMode={isDarkMode}
    />
  );
};

export default SegmentedFunnelChart;
