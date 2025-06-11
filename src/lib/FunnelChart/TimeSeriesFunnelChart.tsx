import React from 'react';
import { TimeSeriesFunnelChartProps } from './types';
import FunnelChart from './FunnelChartRenderer'; // Assuming FunnelChartRenderer is the default export

const TimeSeriesFunnelChart: React.FC<TimeSeriesFunnelChartProps> = ({
  seriesData,
  chartWidth = 300, // Default width for each small chart
  chartHeight = 250, // Default height for each small chart
  spacing = 20, // Default spacing between charts
  chartTitleColor,
  chartTitleFontSize = '16px',
  chartTitleFontFamily = 'sans-serif',
  // Pass through other FunnelChartProps
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
  showLegend,
  legendPosition,
  legendTitle,
  legendItemColor,
  legendSwatchSize,
  legendGap,
  clickableLegend,
  onLegendItemClick,
  legendTitleColor: legendTitleColorProp, // Rename to avoid conflict with chartTitleColor
  legendTitleFontSize: legendTitleFontSizeProp, // Rename to avoid conflict
  legendTitleFontFamily: legendTitleFontFamilyProp, // Rename to avoid conflict
  legendSwatchBorderWidth,
  legendSwatchBorderColor,
  isDarkMode,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing,
        justifyContent: 'center',
        padding: '10px',
      }}
    >
      {seriesData.map((series, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
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
            data={series.data}
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
            showLegend={showLegend}
            legendPosition={legendPosition}
            legendTitle={legendTitle}
            legendItemColor={legendItemColor}
            legendSwatchSize={legendSwatchSize}
            legendGap={legendGap}
            clickableLegend={clickableLegend}
            onLegendItemClick={onLegendItemClick}
            legendTitleColor={legendTitleColorProp}
            legendTitleFontSize={legendTitleFontSizeProp}
            legendTitleFontFamily={legendTitleFontFamilyProp}
            legendSwatchBorderWidth={legendSwatchBorderWidth}
            legendSwatchBorderColor={legendSwatchBorderColor}
            isDarkMode={isDarkMode}
          />
        </div>
      ))}
    </div>
  );
};

export default TimeSeriesFunnelChart;
