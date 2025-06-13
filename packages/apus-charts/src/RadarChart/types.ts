/**
 * @file types.ts
 * @description Type definitions for RadarChart component
 */

export interface RadarChartDataPoint {
  axis: string;
  value: number;
}

export interface RadarChartRendererProps {
  chartRef: React.RefObject<HTMLDivElement>;
  data: RadarChartSeries[];
  radius: number;
  levels: number;
  axesLabels: string[];
  calculatedMaxValue: number;
  angleSlice: number;
  showGrid: boolean;
  showAxesLabels: boolean;
  gridStrokeColor: string;
  gridStrokeWidth: number;
  gridLineStyle: 'solid' | 'dashed' | 'dotted';
  axisLineColor: string;
  axisLineWidth: number;
  axisLabelFontFamily: string;
  axisLabelFontSize: string;
  axisLabelColor: string;
  axisLabelOffset: number;
  seriesFillOpacity: number;
  seriesStrokeWidth: number;
  seriesHoverStrokeWidth: number;
  enableSeriesShadow: boolean;
  filterId: string;
  hoverTargetRadius: number;
  enableSeriesGlow: boolean;
  seriesGlowColor?: string;
  seriesGlowBlur: number;
  seriesGlowOffsetX: number;
  seriesGlowOffsetY: number;
  seriesGlowOpacity: number;
  glowFilterId: string;
  showAxisLines: boolean;
  hoveredData: HoveredDataInfo | null;
  setHoveredData: (data: HoveredDataInfo | null) => void;
  showHoverPoints?: boolean;
  hoverPointRadius?: number;
  hoverPointFill?: string;
  hoverPointStroke?: string;
  hoverPointStrokeWidth?: number;
  selectedSeriesName?: string | null; // For highlighting
}

export interface RadarChartSeries {
  name: string;
  dataPoints: RadarChartDataPoint[];
  color?: string; // Optional: color for this series
}

export interface HoveredDataInfo {
  seriesName: string;
  axisLabel: string;
  value: number;
  x: number; // SVG x position of the data point (relative to center)
  y: number; // SVG y position of the data point (relative to center)
  tooltipX: number; // X coordinate for HTML tooltip, relative to chart container
  tooltipY: number; // Y coordinate for HTML tooltip, relative to chart container
  color?: string; // Color of the hovered series
}

export interface RadarChartProps {
  data: RadarChartSeries[];
  size?: number; // Overall size of the chart
  axesLabels: string[]; // Labels for each axis, e.g., ['Strength', 'Dexterity', ...]
  maxValue?: number; // The maximum value any data point can take (for scaling)
  levels?: number; // Number of concentric circles/polygons for the grid
  className?: string; // Optional className for the main SVG container
  showGrid?: boolean;
  showAxesLabels?: boolean;
  showTooltips?: boolean;
  enableSeriesShadow?: boolean;
  seriesShadowColor?: string;
  seriesShadowBlur?: number;
  seriesShadowOffsetX?: number;
  seriesShadowOffsetY?: number;

  // --- Series Glow Effect (alternative to shadow) ---
  enableSeriesGlow?: boolean;
  seriesGlowColor?: string; // Defaults to series color if not provided, with opacity
  seriesGlowBlur?: number;
  seriesGlowOffsetX?: number;
  seriesGlowOffsetY?: number;
  seriesGlowOpacity?: number;

  // --- Tooltip Customization (for HTML Tooltip) ---
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  tooltipOffsetX?: number; // Additional X offset for HTML tooltip
  tooltipOffsetY?: number; // Additional Y offset for HTML tooltip (e.g., to appear above cursor)
  tooltipFormat?: (data: HoveredDataInfo) => string; // Custom function to format tooltip HTML content

  // --- Hover Points Customization ---
  showHoverPoints?: boolean;
  hoverPointRadius?: number;
  hoverPointFill?: string; // Defaults to series color if not provided
  hoverPointStroke?: string;
  hoverPointStrokeWidth?: number;

  // --- Grid Customization ---
  gridStrokeColor?: string;
  gridStrokeWidth?: number;
  gridLevels?: number;
  gridLineStyle?: 'solid' | 'dashed' | 'dotted';

  // --- Axes Lines Customization ---
  axisLineColor?: string;
  axisLineWidth?: number;
  axisStrokeColor?: string; // For the radial axis lines
  axisStrokeWidth?: number; // For the radial axis lines
  showAxisLines?: boolean; // To show/hide radial axis lines

  // --- Axes Labels Customization ---
  axisLabelFontFamily?: string;
  axisLabelFontSize?: string;
  axisLabelColor?: string;
  axisLabelOffset?: number; // Distance of label from axis end point

  // --- Data Series Customization ---
  seriesFillOpacity?: number;
  seriesStrokeWidth?: number;
  seriesHoverStrokeWidth?: number; // Stroke width on hover for the series path
  seriesPointRadius?: number; // Radius of actual visible points if we decide to draw them
  seriesPointColor?: string; // Color of actual visible points
  seriesPointStrokeColor?: string;
  seriesPointStrokeWidth?: number;

  // --- Interactivity ---
  hoverTargetRadius?: number; // Radius of invisible hover circles
  responsive?: boolean;

  // Legend Props
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'right' | 'left'; // Default: 'bottom'
  legendTitle?: string;
  legendTitleColor?: string;
  legendTitleFontSize?: string;
  legendTitleFontFamily?: string;
  legendItemColor?: string;
  legendItemFontSize?: string;
  legendItemFontFamily?: string;
  legendSwatchSize?: number;
  legendSwatchBorderColor?: string;
  legendSwatchBorderWidth?: number;
  legendGap?: number;
  legendPadding?: string | number;

  // --- Interactive Legend & Highlighting ---
  clickableLegend?: boolean;
  selectedSeriesFillOpacity?: number; // Opacity for the selected series area
  selectedSeriesStrokeWidth?: number; // Stroke width for the selected series path
  deselectedSeriesFillOpacity?: number; // Opacity for non-selected series areas (optional)
  deselectedSeriesStrokeWidth?: number; // Stroke width for non-selected series paths (optional)
  onLegendItemClick?: (seriesName: string | null) => void; // Callback when a legend item is clicked
}
