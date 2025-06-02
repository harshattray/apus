import React, { useState, useRef, useEffect } from 'react';
import { RadarChartProps, HoveredDataInfo } from './types';
import { RadarChartRenderer } from './RadarChartRenderer';
import { useTooltip } from '../hooks/useTooltip';
import { useChartDimensions, Dimensions } from '../hooks/useChartDimensions';

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  axesLabels,
  maxValue,
  levels = 5,
  className = '',
  showGrid = true,
  showAxesLabels = true,
  showTooltips = true,
  enableSeriesShadow = true,
  seriesShadowColor = 'rgba(0,0,0,0.12)',
  seriesShadowBlur = 4,
  seriesShadowOffsetX = 0,
  seriesShadowOffsetY = 0,
  enableSeriesGlow = false,
  seriesGlowColor, // Defaults to series color in renderer if undefined
  seriesGlowBlur = 5,
  seriesGlowOffsetX = 0,
  seriesGlowOffsetY = 0,
  seriesGlowOpacity = 0.75,
  tooltipBackgroundColor = 'rgba(50, 50, 50, 0.85)', // Default to dark background
  tooltipTextColor = '#FFFFFF', // Default to light text
  tooltipPadding = '8px 12px',
  tooltipBorderRadius = '4px',
  tooltipFontSize = '12px',
  tooltipOffsetX = 10,
  tooltipOffsetY = -15,
  tooltipFormat,
  showHoverPoints,
  hoverPointRadius,
  hoverPointFill,
  hoverPointStroke,
  hoverPointStrokeWidth,
  gridStrokeColor = '#CDCDCD',
  gridStrokeWidth = 0.5,
  gridLineStyle = 'solid',
  axisLabelColor = '#333333',
  axisLabelFontSize = '10px',
  axisLabelFontFamily = 'sans-serif', // Added default
  axisLabelOffset = 10,
  axisLineColor = '#B0B0B0',
  axisLineWidth = 1,
  showAxisLines = true,
  seriesFillOpacity = 0.3,
  seriesStrokeWidth = 2,
  seriesHoverStrokeWidth = 2.5, // Added default
  hoverTargetRadius = 8, // Added default
  responsive = true, // Added prop to control responsiveness
  // Legend Props
  showLegend = false,
  legendPosition = 'bottom',
  legendTitle,
  legendTitleColor,
  legendTitleFontSize = '14px',
  legendTitleFontFamily = 'sans-serif',
  legendItemColor,
  legendItemFontSize = '12px',
  legendItemFontFamily = 'sans-serif',
  legendSwatchSize = 12,
  legendSwatchBorderColor = 'transparent',
  legendSwatchBorderWidth = 0,
  legendGap = 8, // Gap between legend items (in px)
  legendPadding = '10px',
  // Interactive Legend & Highlighting Props
  clickableLegend = false,
  selectedSeriesFillOpacity = 0.7,
  selectedSeriesStrokeWidth = 3,
  deselectedSeriesFillOpacity = 0.15,
  deselectedSeriesStrokeWidth = 1,
  onLegendItemClick,
}) => {
  const [hoveredData, _setHoveredData] = useState<HoveredDataInfo | null>(null);
  console.log(
    '[RadarChart] Component rendering/re-rendering. Current hoveredData state:',
    hoveredData,
  );
  const [selectedSeriesName, setSelectedSeriesName] = useState<string | null>(null);

  const handleSetHoveredData = React.useCallback(
    (data: HoveredDataInfo | null) => {
      console.log('[RadarChart] handleSetHoveredData called with:', data);
      _setHoveredData(data);
    },
    [_setHoveredData],
  ); // _setHoveredData from useState is stable
  const filterId = `radar-shadow-${React.useId()}`;
  const glowFilterId = `radar-glow-${React.useId()}`;
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const chartDimensions: Dimensions = useChartDimensions(chartRef, size, size, responsive);
  let effectiveSize: number;
  if (responsive && chartDimensions.width > 0 && chartDimensions.height > 0) {
    effectiveSize = Math.min(chartDimensions.width, chartDimensions.height);
  } else {
    effectiveSize = size;
  }

  const tooltip = useTooltip(tooltipRef, {
    backgroundColor: tooltipFormat ? 'transparent' : tooltipBackgroundColor,
    textColor: tooltipFormat ? 'transparent' : tooltipTextColor,
    padding: tooltipFormat ? '0px' : tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: tooltipFontSize,
  });

  useEffect(() => {
    tooltip.applyTooltipStyles();
  }, [tooltip]);

  useEffect(() => {
    console.log(
      '[RadarChart] Tooltip effect fired. Hovered data:',
      hoveredData,
      'Tooltip Ref Current:',
      tooltipRef.current,
    );
    if (hoveredData && tooltipRef.current && chartRef.current) {
      const content = tooltipFormat
        ? tooltipFormat(hoveredData)
        : `<strong>${hoveredData.seriesName}</strong><br/>${hoveredData.axisLabel}: ${hoveredData.value}`;
      console.log(
        `[RadarChart] Attempting to show tooltip. Content: ${content}. Relative Coords from d3.pointer: ${hoveredData.tooltipX}, ${hoveredData.tooltipY}.`,
      );
      tooltip.showTooltip(
        content,
        hoveredData.tooltipX,
        hoveredData.tooltipY,
        tooltipOffsetX,
        tooltipOffsetY,
      );
    } else if (tooltipRef.current) {
      console.log('[RadarChart] Attempting to hide tooltip.');
      tooltip.hideTooltip();
    }
  }, [hoveredData, tooltip, tooltipOffsetX, tooltipOffsetY, chartRef, tooltipFormat]);

  if (!data || data.length === 0 || !axesLabels || axesLabels.length === 0) {
    return <p>RadarChart: Insufficient data or axes labels provided.</p>;
  }

  const numAxes = axesLabels.length;
  const radius = (effectiveSize / 2) * 0.8;
  const calculatedMaxValue =
    maxValue || Math.max(...data.flatMap((series) => series.dataPoints.map((dp) => dp.value)));

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: typeof legendPadding === 'number' ? `${legendPadding}px` : legendPadding,
    fontFamily: legendItemFontFamily,
    fontSize: legendItemFontSize,
    color: legendItemColor || (tooltipTextColor === '#FFFFFF' ? '#333' : '#FFF'), // Basic auto-color
  };

  const getFlexDirection = () => {
    switch (legendPosition) {
      case 'top':
        return 'column-reverse';
      case 'bottom':
        return 'column';
      case 'left':
        return 'row-reverse';
      case 'right':
        return 'row';
      default:
        return 'column';
    }
  };

  const legendAreaStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: legendPosition === 'top' || legendPosition === 'bottom' ? 'column' : 'row',
    alignItems: 'center',
    gap: `${legendGap}px`,
  };

  if (legendPosition === 'right' || legendPosition === 'left') {
    legendAreaStyle.flexDirection = 'column';
    legendAreaStyle.alignItems = legendPosition === 'left' ? 'flex-end' : 'flex-start';
    legendAreaStyle.justifyContent = 'center';
    legendAreaStyle.height = '100%';
    legendAreaStyle.padding = `0 ${typeof legendPadding === 'number' ? `${legendPadding}px` : legendPadding}`;
  } else {
    legendAreaStyle.width = '100%';
    legendAreaStyle.justifyContent = 'center';
    legendAreaStyle.padding = `${typeof legendPadding === 'number' ? `${legendPadding}px` : legendPadding} 0`;
  }

  const chartAreaContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: responsive ? '100%' : `${size}px`,
    height: responsive ? '100%' : `${size}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: getFlexDirection(),
    width:
      (legendPosition === 'left' || legendPosition === 'right') && showLegend
        ? `calc(100% + ${legendSwatchSize * 10}px)`
        : responsive
          ? '100%'
          : `${size}px`, // Crude width adjustment for side legends
    height:
      (legendPosition === 'top' || legendPosition === 'bottom') && showLegend
        ? `calc(100% + ${legendSwatchSize * 5}px)`
        : responsive
          ? '100%'
          : `${size}px`, // Crude height adjustment
    alignItems: 'center',
    justifyContent: 'center',
  };

  const renderLegend = () => {
    if (!showLegend || !data || data.length === 0) return null;

    return (
      <div style={legendStyle} className="radar-chart-legend">
        {legendTitle && (
          <div
            style={{
              fontSize: legendTitleFontSize,
              fontFamily: legendTitleFontFamily,
              color:
                legendTitleColor ||
                legendItemColor ||
                (tooltipTextColor === '#FFFFFF' ? '#333' : '#FFF'),
              fontWeight: 'bold',
              marginBottom: `${legendGap * 1.5}px`,
              textAlign:
                legendPosition === 'top' || legendPosition === 'bottom'
                  ? 'center'
                  : legendPosition === 'left'
                    ? 'right'
                    : 'left',
            }}
          >
            {legendTitle}
          </div>
        )}
        <div style={legendAreaStyle}>
          {data.map((series, index) => (
            <div
              key={`legend-${series.name}-${index}`}
              onClick={() => {
                if (!clickableLegend) return;
                const newSelectedName = selectedSeriesName === series.name ? null : series.name;
                setSelectedSeriesName(newSelectedName);
                if (onLegendItemClick) {
                  onLegendItemClick(newSelectedName);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight:
                  legendPosition === 'top' || legendPosition === 'bottom' ? `${legendGap}px` : '0',
                marginBottom:
                  legendPosition === 'left' || legendPosition === 'right' ? `${legendGap}px` : '0',
                cursor: clickableLegend ? 'pointer' : 'default',
                padding: '2px 4px', // Add some padding for better click target and visual feedback
                borderRadius: '3px',
                backgroundColor:
                  clickableLegend && selectedSeriesName === series.name
                    ? tooltipTextColor === '#FFFFFF'
                      ? 'rgba(255,255,255,0.2)'
                      : 'rgba(0,0,0,0.07)'
                    : 'transparent',
                transition: 'background-color 0.15s ease-in-out',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: `${legendSwatchSize}px`,
                  height: `${legendSwatchSize}px`,
                  borderRadius: '50%',
                  backgroundColor: series.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
                  border: `${legendSwatchBorderWidth}px solid ${legendSwatchBorderColor}`,
                  marginRight: '8px',
                }}
              ></span>
              <span>{series.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={mainContainerStyle}>
      {(legendPosition === 'top' || legendPosition === 'left') && renderLegend()}
      <div ref={chartRef} style={chartAreaContainerStyle}>
        <svg
          ref={svgRef}
          width={effectiveSize}
          height={effectiveSize}
          className={`radar-chart-svg ${className}`}
          role="graphics-document"
          aria-label="radar chart"
        >
          <defs>
            {enableSeriesShadow && (
              <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx={seriesShadowOffsetX}
                  dy={seriesShadowOffsetY}
                  stdDeviation={seriesShadowBlur}
                  floodColor={seriesShadowColor}
                  floodOpacity="1"
                />
              </filter>
            )}
            {enableSeriesGlow && (
              <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
                {/* Create a blurred, colored shadow using feDropShadow, which will act as the glow base */}
                <feDropShadow
                  dx={seriesGlowOffsetX}
                  dy={seriesGlowOffsetY}
                  stdDeviation={seriesGlowBlur}
                  floodColor={seriesGlowColor || 'currentColor'} // Use seriesGlowColor, fallback to currentColor (though series color is better handled in renderer)
                  floodOpacity={seriesGlowOpacity}
                  result="coloredGlowBase"
                />
                {/*
                To make it a true 'glow' that emanates from the shape rather than just being a colored shadow,
                we often merge this with the original source graphic. 
                A simple approach is to draw the source graphic, then the glow, then the source graphic again on top.
                However, for SVG filters, we can use feComposite or feMerge.
                Let's try feMerge to combine the original SourceGraphic with our coloredGlowBase.
              */}
                <feMerge>
                  <feMergeNode in="coloredGlowBase" />
                  <feMergeNode in="SourceGraphic" />{' '}
                  {/* This puts the source graphic on top of the glow */}
                </feMerge>
              </filter>
            )}
          </defs>
          <g transform={`translate(${effectiveSize / 2}, ${effectiveSize / 2})`}>
            <RadarChartRenderer
              chartRef={chartRef}
              data={data}
              radius={radius}
              levels={levels}
              axesLabels={axesLabels}
              calculatedMaxValue={calculatedMaxValue}
              angleSlice={(Math.PI * 2) / numAxes}
              showGrid={showGrid}
              showAxesLabels={showAxesLabels}
              gridStrokeColor={gridStrokeColor}
              gridStrokeWidth={gridStrokeWidth}
              gridLineStyle={gridLineStyle}
              axisLineColor={axisLineColor}
              axisLineWidth={axisLineWidth}
              axisLabelFontFamily={axisLabelFontFamily}
              axisLabelFontSize={axisLabelFontSize}
              axisLabelColor={axisLabelColor}
              axisLabelOffset={axisLabelOffset}
              seriesFillOpacity={seriesFillOpacity}
              seriesStrokeWidth={seriesStrokeWidth}
              seriesHoverStrokeWidth={seriesHoverStrokeWidth}
              enableSeriesShadow={enableSeriesShadow}
              filterId={filterId}
              hoverTargetRadius={hoverTargetRadius}
              enableSeriesGlow={enableSeriesGlow}
              seriesGlowColor={seriesGlowColor}
              seriesGlowBlur={seriesGlowBlur}
              seriesGlowOffsetX={seriesGlowOffsetX}
              seriesGlowOffsetY={seriesGlowOffsetY}
              seriesGlowOpacity={seriesGlowOpacity}
              glowFilterId={glowFilterId}
              showAxisLines={showAxisLines}
              hoveredData={hoveredData}
              setHoveredData={handleSetHoveredData}
              showHoverPoints={showHoverPoints}
              hoverPointRadius={hoverPointRadius}
              hoverPointFill={hoverPointFill}
              hoverPointStroke={hoverPointStroke}
              hoverPointStrokeWidth={hoverPointStrokeWidth}
              selectedSeriesName={selectedSeriesName}
              selectedSeriesFillOpacity={selectedSeriesFillOpacity}
              selectedSeriesStrokeWidth={selectedSeriesStrokeWidth}
              deselectedSeriesFillOpacity={deselectedSeriesFillOpacity}
              deselectedSeriesStrokeWidth={deselectedSeriesStrokeWidth}
            />
          </g>
        </svg>
        {/* Tooltip div, content and visibility managed by useTooltip hook */}
        {showTooltips && (
          <div
            ref={tooltipRef}
            className="chart-tooltip"
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 1000,
              transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
            }}
          />
        )}
      </div>{' '}
      {/* End of chartAreaContainerStyle div */}
      {(legendPosition === 'bottom' || legendPosition === 'right') && renderLegend()}
    </div> /* End of mainContainerStyle div */
  ); // End of return statement
}; // End of RadarChart component

export default RadarChart;
