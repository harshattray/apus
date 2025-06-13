import React, { useState } from 'react';
import { SegmentedFunnelChartProps, SegmentedFunnelSegment } from './types';
import SegmentedFunnelChartRenderer from './SegmentedFunnelChartRenderer';
import ChartLegend from './common/ChartLegend';
import { ChartLegendItem } from './common/types';

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
  showTrendIndicators = true,
  showMiniCharts = true,
  showAnalytics = true,
  miniChartHeight = 30,
  trendIndicatorSize = 12,
  analyticsDisplayMode = 'tooltip',
  showLegend = false,
  legendPosition = 'bottom',
  legendTitle,
  legendItemColor,
  legendSwatchSize,
  legendGap,
  clickableLegend = false,
  onLegendItemClick,
  legendTitleColor,
  legendTitleFontSize,
  legendTitleFontFamily,
  legendSwatchBorderWidth,
  legendSwatchBorderColor,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleLegendItemClick = (item: ChartLegendItem | null) => {
    setSelectedItem(item ? item.id : null);
    if (onLegendItemClick) {
      if (item) {
        // Find all segments matching the selected channel to sum their values
        const segmentsForChannel = data.flatMap((stage) =>
          stage.segments.filter((segment) => segment.channel === item.id),
        );
        const totalValueForChannel = segmentsForChannel.reduce(
          (sum, segment) => sum + segment.value,
          0,
        );
        onLegendItemClick({ label: item.name, value: totalValueForChannel, color: item.color });
      } else {
        onLegendItemClick(null);
      }
    }
  };

  const uniqueSegments: SegmentedFunnelSegment[] = [];
  data.forEach((stage) => {
    stage.segments.forEach((segment) => {
      if (!uniqueSegments.some((s) => s.channel === segment.channel)) {
        uniqueSegments.push(segment);
      }
    });
  });

  const legendItems: ChartLegendItem[] = uniqueSegments.map((s, index) => ({
    id: s.channel,
    name: s.channel,
    color: s.color || `hsl(${(index * 360) / uniqueSegments.length}, 70%, 50%)`,
  }));

  const filteredData = selectedItem
    ? data.map((stage) => ({
        ...stage,
        segments: stage.segments.filter((segment) => segment.channel === selectedItem),
      }))
    : data;

  const getFlexDirection = () => {
    switch (legendPosition) {
      case 'top':
      case 'bottom':
        return 'column';
      case 'left':
      case 'right':
        return 'row';
      default:
        return 'column';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        flexDirection: getFlexDirection(),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showLegend && (legendPosition === 'top' || legendPosition === 'left') && (
        <ChartLegend
          legendItems={legendItems}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendTitle={legendTitle}
          legendItemColor={legendItemColor}
          legendSwatchSize={legendSwatchSize}
          legendGap={legendGap}
          clickableLegend={clickableLegend}
          onLegendItemClick={handleLegendItemClick}
          selectedItem={selectedItem}
          legendTitleColor={legendTitleColor}
          legendTitleFontSize={legendTitleFontSize}
          legendTitleFontFamily={legendTitleFontFamily}
          legendSwatchBorderWidth={legendSwatchBorderWidth}
          legendSwatchBorderColor={legendSwatchBorderColor}
          isDarkMode={isDarkMode}
        />
      )}
      <SegmentedFunnelChartRenderer
        data={filteredData}
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
        showTrendIndicators={showTrendIndicators}
        showMiniCharts={showMiniCharts}
        showAnalytics={showAnalytics}
        miniChartHeight={miniChartHeight}
        trendIndicatorSize={trendIndicatorSize}
        analyticsDisplayMode={analyticsDisplayMode}
      />
      {showLegend && (legendPosition === 'bottom' || legendPosition === 'right') && (
        <ChartLegend
          legendItems={legendItems}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendTitle={legendTitle}
          legendItemColor={legendItemColor}
          legendSwatchSize={legendSwatchSize}
          legendGap={legendGap}
          clickableLegend={clickableLegend}
          onLegendItemClick={handleLegendItemClick}
          selectedItem={selectedItem}
          legendTitleColor={legendTitleColor}
          legendTitleFontSize={legendTitleFontSize}
          legendTitleFontFamily={legendTitleFontFamily}
          legendSwatchBorderWidth={legendSwatchBorderWidth}
          legendSwatchBorderColor={legendSwatchBorderColor}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default SegmentedFunnelChart;
