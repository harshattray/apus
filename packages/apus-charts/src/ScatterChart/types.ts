import { CSSProperties } from 'react';

export interface ScatterDataPoint {
  x: number | Date;
  y: number;
  category: string;
  label?: string;
}

export interface ScatterHoveredData extends ScatterDataPoint {
  eventX: number;
  eventY: number;
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

export interface ScatterChartProps {
  data: ScatterDataPoint[];
  width: number;
  height: number;
  colors?: string[] | Record<string, string>;
  style?: CSSProperties;
  className?: string;
  xAxis?: Partial<AxisProps>;
  yAxis?: Partial<AxisProps>;
  grid?: Partial<GridProps>;
  showLegend?: boolean;
  legendPosition?: LegendPosition;
  clickableLegend?: boolean;
  onLegendItemClick?: (category: string | null) => void;
  showTooltip?: boolean;
  tooltipFormat?: (data: ScatterHoveredData) => string;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipOffsetX?: number;
  tooltipOffsetY?: number;
  trendLine?: Partial<TrendLineProps>;
  pointSize?: number;
}

export interface RendererProps extends Omit<ScatterChartProps, 'style' | 'className'> {
  selectedCategory: string | null;
  onPointHover: (
    event: MouseEvent,
    dataPoint: ScatterDataPoint,
    color: string,
    mouseX: number,
    mouseY: number,
  ) => void;
  onPointLeave: () => void;
  onPointClick?: (event: MouseEvent, dataPoint: ScatterDataPoint) => void;
}
