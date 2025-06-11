import React, { useRef } from 'react';
import { ChartLegendProps, ChartLegendItem } from './types';

const ChartLegend: React.FC<ChartLegendProps> = ({
  legendItems,
  showLegend = true,
  legendPosition = 'bottom',
  legendTitle,
  legendTitleColor,
  legendTitleFontSize = '14px',
  legendTitleFontFamily = 'sans-serif',
  legendItemColor,
  legendItemFontSize = '12px',
  legendItemFontFamily = 'sans-serif',
  legendSwatchSize = 10,
  legendSwatchBorderColor = '#FFF',
  legendSwatchBorderWidth = 1,
  legendGap = 10,
  legendPadding = '8px',
  clickableLegend = false,
  onLegendItemClick,
  selectedItem = null,
  isDarkMode = false,
}) => {
  const legendRef = useRef<HTMLDivElement>(null);

  if (!showLegend || !legendItems || legendItems.length === 0) {
    return null;
  }

  const legendContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: typeof legendPadding === 'number' ? `${legendPadding}px` : legendPadding,
    fontFamily: legendItemFontFamily,
    fontSize: legendItemFontSize,
    color: legendItemColor || (isDarkMode ? '#cbd5e0' : '#4a5568'),
  };

  const legendTitleStyle: React.CSSProperties = {
    color: legendTitleColor || (isDarkMode ? '#e2e8f0' : '#1a202c'),
    fontSize: legendTitleFontSize,
    fontFamily: legendTitleFontFamily,
    marginBottom:
      legendTitle && (legendPosition === 'top' || legendPosition === 'bottom') ? '8px' : '0',
    marginRight:
      legendTitle && (legendPosition === 'left' || legendPosition === 'right') ? '8px' : '0',
  };

  const onItemClick = (item: ChartLegendItem) => {
    if (clickableLegend && onLegendItemClick) {
      onLegendItemClick(item.id === selectedItem ? null : item);
    }
  };

  return (
    <div ref={legendRef} style={legendContainerStyle}>
      {legendTitle && <div style={legendTitleStyle}>{legendTitle}</div>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: legendGap,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: legendPosition === 'left' || legendPosition === 'right' ? 'column' : 'row',
        }}
      >
        {legendItems.map((item) => {
          const isSelected = selectedItem === item.id;
          const itemStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            cursor: clickableLegend ? 'pointer' : 'default',
            opacity: clickableLegend && selectedItem && !isSelected ? 0.5 : 1,
          };

          const swatchStyle: React.CSSProperties = {
            width: legendSwatchSize,
            height: legendSwatchSize,
            backgroundColor: item.color,
            border: `${legendSwatchBorderWidth}px ${legendSwatchBorderColor} solid`,
            borderRadius: '2px',
            marginRight: '6px',
          };

          return (
            <div key={item.id} style={itemStyle} onClick={() => onItemClick(item)}>
              <div style={swatchStyle} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartLegend;
