import React, { useState } from 'react';
import { TimeSeriesFunnelChartProps, FunnelData } from './types';
import FunnelChart from './FunnelChartRenderer';
import ChartLegend from './common/ChartLegend';
import { ChartLegendItem } from './common/types';

const TimeSeriesFunnelChart: React.FC<TimeSeriesFunnelChartProps> = ({
  seriesData,
  chartWidth = 300,
  chartHeight = 250,
  spacing = 20,
  chartTitleColor,
  chartTitleFontSize = '16px',
  chartTitleFontFamily = 'sans-serif',
  margin,
  showValues,
  valueFormat,
  onSliceClick,
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
  legendTitleColor: legendTitleColorProp,
  legendTitleFontSize: legendTitleFontSizeProp,
  legendTitleFontFamily: legendTitleFontFamilyProp,
  legendSwatchBorderWidth,
  legendSwatchBorderColor,
  isDarkMode,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleLegendItemClick = (item: ChartLegendItem | null) => {
    setSelectedItem(item ? item.id : null);
    onLegendItemClick?.(
      item ? (seriesData.flatMap((s) => s.data).find((d) => d.label === item.id) ?? null) : null,
    );
  };

  const allFunnelData: FunnelData[] = seriesData.flatMap((s) => s.data);
  const uniqueLegendItems: ChartLegendItem[] = Array.from(
    new Map(
      allFunnelData.map((item) => [
        item.label,
        {
          id: item.label,
          name: item.label,
          color:
            item.color ||
            `hsl(${(allFunnelData.indexOf(item) * 360) / allFunnelData.length}, 70%, 50%)`,
        },
      ]),
    ).values(),
  );

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
        gap: spacing,
        justifyContent: 'center',
        padding: '10px',
        flexDirection: getFlexDirection(),
        alignItems: 'center',
      }}
    >
      {showLegend && (legendPosition === 'top' || legendPosition === 'left') && (
        <ChartLegend
          legendItems={uniqueLegendItems}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendTitle={legendTitle}
          legendItemColor={legendItemColor}
          legendSwatchSize={legendSwatchSize}
          legendGap={legendGap}
          clickableLegend={clickableLegend}
          onLegendItemClick={handleLegendItemClick}
          selectedItem={selectedItem}
          legendTitleColor={legendTitleColorProp}
          legendTitleFontSize={legendTitleFontSizeProp}
          legendTitleFontFamily={legendTitleFontFamilyProp}
          legendSwatchBorderWidth={legendSwatchBorderWidth}
          legendSwatchBorderColor={legendSwatchBorderColor}
          isDarkMode={isDarkMode}
        />
      )}
      <div
        data-testid="charts-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing,
          justifyContent: 'center',
          flexDirection: legendPosition === 'left' || legendPosition === 'right' ? 'column' : 'row',
          flexGrow: 1,
        }}
      >
        {seriesData.map((series, index) => {
          const filteredSeriesData = selectedItem
            ? series.data.filter((d) => d.label === selectedItem)
            : series.data;

          return (
            <div key={index} id={`funnel-chart-container-${index}`} style={{ textAlign: 'center' }}>
              <h3
                style={{
                  color: chartTitleColor || (isDarkMode ? '#cbd5e0' : '#4a5568'),
                  fontSize: chartTitleFontSize,
                  fontFamily: chartTitleFontFamily,
                  marginBottom: '10px',
                }}
              >
                {series.periodLabel}
              </h3>
              <FunnelChart
                data={filteredSeriesData}
                width={chartWidth}
                height={chartHeight}
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
                tooltipFormat={tooltipFormat}
                isDarkMode={isDarkMode}
              />
            </div>
          );
        })}
      </div>
      {showLegend && (legendPosition === 'bottom' || legendPosition === 'right') && (
        <ChartLegend
          legendItems={uniqueLegendItems}
          showLegend={showLegend}
          legendPosition={legendPosition}
          legendTitle={legendTitle}
          legendItemColor={legendItemColor}
          legendSwatchSize={legendSwatchSize}
          legendGap={legendGap}
          clickableLegend={clickableLegend}
          onLegendItemClick={handleLegendItemClick}
          selectedItem={selectedItem}
          legendTitleColor={legendTitleColorProp}
          legendTitleFontSize={legendTitleFontSizeProp}
          legendTitleFontFamily={legendTitleFontFamilyProp}
          legendSwatchBorderWidth={legendSwatchBorderWidth}
          legendSwatchBorderColor={legendSwatchBorderColor}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default TimeSeriesFunnelChart;
