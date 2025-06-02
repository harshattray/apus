/**
 * @file RadarChartRenderer.tsx
 * @description Handles the SVG rendering for the RadarChart component.
 */
import React from 'react';
import { lineRadial, curveCardinalClosed } from 'd3-shape';
import * as d3 from 'd3';
import { HoveredDataInfo, RadarChartProps } from './types';
export interface RadarChartRendererProps
  extends Pick<
    RadarChartProps,
    | 'data'
    | 'axesLabels'
    | 'showGrid'
    | 'showAxesLabels'
    | 'axisLabelColor'
    | 'axisLabelFontFamily'
    | 'axisLabelFontSize'
    | 'axisLabelOffset'
    | 'axisLineColor'
    | 'axisLineWidth'
    | 'gridStrokeColor'
    | 'gridStrokeWidth'
    | 'seriesFillOpacity'
    | 'seriesStrokeWidth'
    | 'seriesHoverStrokeWidth'
    | 'hoverTargetRadius'
    | 'enableSeriesShadow'
  > {
  radius: number;
  levels: number;
  calculatedMaxValue: number;
  angleSlice: number;
  hoveredData: HoveredDataInfo | null;
  setHoveredData: (data: HoveredDataInfo | null) => void;
  filterId: string;
  chartRef: React.RefObject<HTMLDivElement>;
  showHoverPoints?: boolean;
  hoverPointRadius?: number;
  hoverPointFill?: string;
  hoverPointStroke?: string;
  hoverPointStrokeWidth?: number;
  gridLineStyle?: 'solid' | 'dashed' | 'dotted';
  showAxisLines?: boolean;
  enableSeriesGlow?: boolean;
  seriesGlowColor?: string;
  seriesGlowBlur?: number;
  seriesGlowOffsetX?: number;
  seriesGlowOffsetY?: number;
  seriesGlowOpacity?: number;
  glowFilterId?: string;
  // Highlighting props
  selectedSeriesName?: string | null;
  selectedSeriesFillOpacity?: number;
  selectedSeriesStrokeWidth?: number;
  deselectedSeriesFillOpacity?: number;
  deselectedSeriesStrokeWidth?: number;
}

export const RadarChartRenderer: React.FC<RadarChartRendererProps> = ({
  data,
  radius,
  levels,
  axesLabels,
  calculatedMaxValue,
  angleSlice,
  showGrid,
  showAxesLabels,
  gridStrokeColor,
  gridStrokeWidth,
  axisLineColor,
  axisLineWidth,
  axisLabelFontFamily,
  axisLabelFontSize,
  axisLabelColor,
  axisLabelOffset,
  seriesFillOpacity,
  seriesStrokeWidth,
  seriesHoverStrokeWidth,
  hoverTargetRadius,
  hoveredData,
  setHoveredData,
  filterId,
  chartRef,
  enableSeriesShadow = false, // Default to false if not provided
  // Hover point props with defaults
  showHoverPoints = false,
  hoverPointRadius = 8,
  hoverPointFill,
  hoverPointStroke = 'rgba(0,0,0,0.3)',
  hoverPointStrokeWidth = 1,
  // Grid and Axis defaults
  gridLineStyle = 'solid',
  showAxisLines = true,
  // Glow defaults
  enableSeriesGlow = false,
  glowFilterId,
  // seriesGlowColor, seriesGlowBlur, etc., are used by the filter in RadarChart.tsx or available for future use
  // Highlighting props
  selectedSeriesName,
  selectedSeriesFillOpacity,
  selectedSeriesStrokeWidth,
  deselectedSeriesFillOpacity,
  deselectedSeriesStrokeWidth,
}) => {
  // Default values for props that might not be passed but are used in logic
  const rSeriesFillOpacity = seriesFillOpacity ?? 0.3;
  const rSeriesStrokeWidth = seriesStrokeWidth ?? 2;
  const rSeriesHoverStrokeWidth = seriesHoverStrokeWidth ?? 2.5;
  const rGridStrokeColor = gridStrokeColor ?? '#CDCDCD';
  const rGridStrokeWidth = gridStrokeWidth ?? 0.5;
  const rAxisLineColor = axisLineColor ?? '#B0B0B0';
  const rAxisLineWidth = axisLineWidth ?? 1;
  const rAxisLabelFontFamily = axisLabelFontFamily ?? 'sans-serif';
  const rAxisLabelFontSize = axisLabelFontSize ?? '10px';
  const rAxisLabelColor = axisLabelColor ?? '#333333';
  const rAxisLabelOffset = axisLabelOffset ?? 10;
  const rHoverTargetRadius = hoverTargetRadius ?? 8;

  const lineGenerator = lineRadial<[number, number]>()
    .angle((d) => d[0])
    .radius((d) => d[1])
    .curve(curveCardinalClosed);

  return (
    <>
      {/* Grid lines */}
      {showGrid &&
        [...Array(levels)].map((_, i) => (
          <circle
            data-testid={`grid-level-${i}`}
            key={`grid-level-${i}`}
            r={(radius / levels) * (i + 1)}
            fill="none"
            stroke={rGridStrokeColor}
            strokeWidth={rGridStrokeWidth}
            strokeDasharray={
              gridLineStyle === 'dashed' ? '4,4' : gridLineStyle === 'dotted' ? '1,3' : 'none'
            }
          />
        ))}

      {/* Axes lines */}
      {showAxisLines &&
        axesLabels.map((_, i) => (
          <line
            data-testid={`axis-line-${i}`}
            key={`axis-line-${i}`}
            x1={0}
            y1={0}
            x2={radius * Math.cos(angleSlice * i - Math.PI / 2)}
            y2={radius * Math.sin(angleSlice * i - Math.PI / 2)}
            stroke={rAxisLineColor}
            strokeWidth={rAxisLineWidth}
          />
        ))}

      {/* Axes labels */}
      {showAxesLabels &&
        axesLabels.map((label, i) => (
          <text
            data-testid={`axis-label-${i}`}
            key={`axis-label-${i}`}
            x={(radius + rAxisLabelOffset) * Math.cos(angleSlice * i - Math.PI / 2)}
            y={(radius + rAxisLabelOffset) * Math.sin(angleSlice * i - Math.PI / 2)}
            dy="0.35em" // Vertically center
            textAnchor={
              (angleSlice * i - Math.PI / 2) % (2 * Math.PI) === 0 ||
              Math.abs(((angleSlice * i - Math.PI / 2) % (2 * Math.PI)) - Math.PI) < 0.01
                ? 'middle'
                : angleSlice * i - Math.PI / 2 > Math.PI &&
                    angleSlice * i - Math.PI / 2 < 2 * Math.PI
                  ? 'end'
                  : 'start'
            }
            fontSize={rAxisLabelFontSize}
            fontFamily={rAxisLabelFontFamily}
            fill={rAxisLabelColor}
          >
            {label}
          </text>
        ))}

      {/* Data series paths and hover targets */}
      {data.map((series, seriesIndex) => {
        console.log(`[Renderer] Processing series: ${series.name}`);
        const seriesPoints: Array<[number, number]> = series.dataPoints.map((dp) => {
          const axisIndex = axesLabels.indexOf(dp.axis);
          if (axisIndex === -1) return [0, 0]; // Should not happen with valid data
          const valueRatio = Math.max(0, dp.value / calculatedMaxValue);
          return [angleSlice * axisIndex, radius * valueRatio] as [number, number];
        });

        const pathData = lineGenerator(seriesPoints);
        if (!pathData) return null;

        const isHovered = hoveredData?.seriesName === series.name;
        let currentFillOpacity = isHovered ? rSeriesFillOpacity + 0.15 : rSeriesFillOpacity;
        let currentStrokeWidth = isHovered ? rSeriesHoverStrokeWidth : rSeriesStrokeWidth;

        if (selectedSeriesName) {
          if (series.name === selectedSeriesName) {
            currentFillOpacity = selectedSeriesFillOpacity ?? currentFillOpacity;
            currentStrokeWidth = selectedSeriesStrokeWidth ?? currentStrokeWidth;
          } else {
            currentFillOpacity = deselectedSeriesFillOpacity ?? currentFillOpacity * 0.5; // Example: reduce further if deselected
            currentStrokeWidth = deselectedSeriesStrokeWidth ?? currentStrokeWidth * 0.75;
          }
        }

        return (
          <g
            key={`series-group-key-${series.name}-${seriesIndex}`}
            data-testid={`series-group-${series.name}`}
          >
            <path
              data-testid={`series-path-${series.name}`}
              key={series.name}
              d={pathData || ''}
              stroke={series.color || 'currentColor'}
              strokeWidth={currentStrokeWidth}
              fill={series.color || 'transparent'}
              fillOpacity={currentFillOpacity}
              style={{
                transition: 'stroke-width 0.2s ease-in-out, fill-opacity 0.2s ease-in-out',
                filter:
                  enableSeriesGlow && glowFilterId
                    ? `url(#${glowFilterId})`
                    : enableSeriesShadow && filterId
                      ? `url(#${filterId})`
                      : 'none',
              }}
            />
            {/* Invisible hover targets for individual data points */}
            {seriesPoints.map((pointCoords, pointIndex) => {
              const dp = series.dataPoints[pointIndex];
              if (!dp) return null;
              const angle = pointCoords[0];
              const r = pointCoords[1];
              const x = r * Math.cos(angle - Math.PI / 2);
              const y = r * Math.sin(angle - Math.PI / 2);
              console.log(
                `[Renderer] Hover target for ${series.name} - ${dp.axis}: cx=${x}, cy=${y}, r=${rHoverTargetRadius}`,
              );

              return (
                <circle
                  key={`hover-target-${series.name}-${pointIndex}`}
                  data-testid={`hover-target-${series.name}-${dp.axis}`}
                  cx={x}
                  cy={y}
                  r={rHoverTargetRadius}
                  fill="transparent"
                  stroke="none"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    if (chartRef.current) {
                      const [tooltipX, tooltipY] = d3.pointer(e, chartRef.current);
                      console.log(
                        `[Renderer] MouseEnter: ${series.name} - ${dp.axis}, Relative Coords: ${tooltipX}, ${tooltipY}`,
                      );
                      if (setHoveredData) {
                        setHoveredData({
                          seriesName: series.name,
                          axisLabel: dp.axis,
                          value: dp.value,
                          x: x, // SVG x position
                          y: y, // SVG y position
                          tooltipX: tooltipX, // Relative X for HTML tooltip
                          tooltipY: tooltipY, // Relative Y for HTML tooltip
                          color: series.color, // Pass series color
                        });
                      }
                    } else {
                      console.warn(
                        '[Renderer] chartRef.current is null, cannot calculate d3.pointer',
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    console.log(`[Renderer] MouseLeave: ${series.name} - ${dp.axis}`);
                    setHoveredData(null);
                  }}
                />
              );
            })}
            {/* Visible hover points */}
            {seriesPoints.map((pointCoords, pointIndex) => {
              const dp = series.dataPoints[pointIndex];
              if (!dp) return null;
              const angle = pointCoords[0];
              const r = pointCoords[1];
              const x = r * Math.cos(angle - Math.PI / 2);
              const y = r * Math.sin(angle - Math.PI / 2);
              console.log(
                `[Renderer] Hover target for ${series.name} - ${dp.axis}: cx=${x}, cy=${y}, r=${rHoverTargetRadius}`,
              );

              return (
                <circle
                  key={`visible-hover-point-${series.name}-${pointIndex}`}
                  data-testid={`visible-hover-point-${series.name}-${dp.axis}`}
                  cx={x}
                  cy={y}
                  r={hoverPointRadius}
                  fill={
                    showHoverPoints
                      ? hoverPointFill || series.color || 'rgba(0,0,0,0.1)'
                      : 'transparent'
                  }
                  stroke={showHoverPoints ? hoverPointStroke : 'none'}
                  strokeWidth={showHoverPoints ? hoverPointStrokeWidth : 0}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    if (chartRef.current) {
                      const [tooltipX, tooltipY] = d3.pointer(e, chartRef.current);
                      console.log(
                        `[Renderer] MouseEnter: ${series.name} - ${dp.axis}, Relative Coords: ${tooltipX}, ${tooltipY}`,
                      );
                      if (setHoveredData) {
                        setHoveredData({
                          seriesName: series.name,
                          axisLabel: dp.axis,
                          value: dp.value,
                          x: x, // SVG x position
                          y: y, // SVG y position
                          tooltipX: tooltipX, // Relative X for HTML tooltip
                          tooltipY: tooltipY, // Relative Y for HTML tooltip
                          color: series.color, // Pass series color
                        });
                      }
                    } else {
                      console.warn(
                        '[Renderer] chartRef.current is null, cannot calculate d3.pointer',
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    console.log(`[Renderer] MouseLeave: ${series.name} - ${dp.axis}`);
                    setHoveredData(null);
                  }}
                />
              );
            })}
          </g>
        );
      })}
    </>
  );
};
