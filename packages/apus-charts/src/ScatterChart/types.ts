import { CSSProperties } from 'react';

export interface ScatterDataPoint {
  x: number | Date;
  y: number;
  category: string;
  label?: string;
  size?: number; // Optional size value for bubble chart functionality
  xError?: number | [number, number] | number[]; // Optional x-axis error (symmetric or [negative, positive])
  yError?: number | [number, number] | number[]; // Optional y-axis error (symmetric or [negative, positive])
}

export interface ScatterHoveredData extends ScatterDataPoint {
  eventX: number;
  eventY: number;
  seriesId?: string; // ID of the series this point belongs to
  seriesName?: string; // Display name of the series
}

export type LegendPosition = 'top' | 'right' | 'bottom' | 'left';

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AxisProps {
  show?: boolean;
  label?: string;
  tickFormat?: (d: any) => string;
  stroke?: string;
  tickColor?: string;
  labelColor?: string;
  fontSize?: number;
  labelFontSize?: number;
  tickCount?: number;
}

export interface GridProps {
  horizontal?: boolean;
  vertical?: boolean;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface TrendLineProps {
  show?: boolean;
  color?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

export interface BubbleChartConfig {
  enabled?: boolean; // Whether to use variable point sizes (bubble chart mode)
  minSize?: number; // Minimum point size in pixels
  maxSize?: number; // Maximum point size in pixels
  sizeScale?: 'linear' | 'sqrt' | 'log'; // Scaling method for size values
  valueField?: 'size' | string; // Field in data to use for size (defaults to 'size')
}

export interface ErrorBarConfig {
  enabled?: boolean; // Whether to show error bars
  color?: string; // Color of error bars
  strokeWidth?: number; // Width of error bar lines
  capWidth?: number; // Width of the cap at the end of error bars
  opacity?: number; // Opacity of error bars
  xAxis?: boolean; // Show error bars on x-axis
  yAxis?: boolean; // Show error bars on y-axis
  showCaps?: boolean; // Whether to show caps at the end of error bars
}

export interface SeriesConfig {
  id: string; // Unique identifier for the series
  data: ScatterDataPoint[];
  name?: string; // Display name for the series (used in legend and tooltip)
  colors?: string[] | Record<string, string>; // Colors specific to this series
  pointSize?: number; // Point size specific to this series
  bubbleChart?: Partial<BubbleChartConfig>; // Bubble chart config specific to this series
  errorBars?: Partial<ErrorBarConfig>; // Error bars config specific to this series
  trendLine?: Partial<TrendLineProps>; // Trend line config specific to this series
  visible?: boolean; // Whether the series is visible (default: true)
}

export interface ScatterChartProps {
  // Single dataset mode
  data?: ScatterDataPoint[];
  // Multiple series mode
  series?: SeriesConfig[];
  // Common props
  width: number;
  height: number;
  colors?: string[] | Record<string, string>; // Default colors
  style?: CSSProperties;
  className?: string;
  xAxis?: Partial<AxisProps>;
  yAxis?: Partial<AxisProps>;
  grid?: Partial<GridProps>;
  showLegend?: boolean;
  legendPosition?: LegendPosition;
  clickableLegend?: boolean;
  onLegendItemClick?: (category: string | null, seriesId?: string) => void;
  showTooltip?: boolean;
  tooltipFormat?: (data: ScatterHoveredData) => string;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipOffsetX?: number;
  tooltipOffsetY?: number;
  trendLine?: Partial<TrendLineProps>; // Default trend line config
  pointSize?: number; // Default point size
  bubbleChart?: Partial<BubbleChartConfig>; // Default bubble chart config
  errorBars?: Partial<ErrorBarConfig>; // Default error bars config
  visibleSeries?: Record<string, boolean>; // Track which series are visible
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
}

export interface RendererProps extends Omit<ScatterChartProps, 'style' | 'className'> {
  selectedCategory: string | null;
  selectedSeries?: string | null;
  visibleSeries?: Record<string, boolean>; // Track which series are visible
  onPointHover: (
    event: MouseEvent,
    dataPoint: ScatterDataPoint,
    color: string,
    mouseX: number,
    mouseY: number,
    seriesId?: string,
    seriesName?: string,
  ) => void;
  onPointLeave: () => void;
  onLegendItemClick?: (category: string | null, seriesId?: string) => void;
  onSeriesToggle?: (seriesId: string, visible: boolean) => void;
  onPointClick?: (event: MouseEvent, dataPoint: ScatterDataPoint, seriesId?: string) => void;
}
