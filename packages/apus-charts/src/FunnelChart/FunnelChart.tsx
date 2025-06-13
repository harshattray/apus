import React, { useState } from 'react';
import { FunnelChartProps } from './types';
import FunnelChartRenderer from './FunnelChartRenderer';
import ChartLegend from './common/ChartLegend';
import { ChartLegendItem } from './common/types';

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
    onLegendItemClick?.(item ? data.find((d) => d.label === item.id) || null : null);
  };

  const filteredData = selectedItem ? data.filter((d) => d.label === selectedItem) : data;

  const legendItems: ChartLegendItem[] = data.map((d) => ({
    id: d.label,
    name: d.label,
    color: d.color || `hsl(${(data.indexOf(d) * 360) / data.length}, 70%, 50%)`,
  }));

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: height,
        display: 'flex',
        flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
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
      <FunnelChartRenderer
        data={filteredData}
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

export default FunnelChart;
