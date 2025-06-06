/**
 * @file types.ts
 * @description Type definitions for the DonutChart component
 */

export type DonutChartData = {
  label: string;
  value: number;
  color?: string;
  extraInfo?: React.ReactNode | string;
};

export type DonutChartLegendItem = {
  label: string;
  color: string;
  value: number;
  percentage: number;
};

export type DonutChartProps = {
  data: DonutChartData[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  innerRadiusRatio?: number; // 0.5 for donut, 0 for pie
  colors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  responsive?: boolean;
  showTooltip?: boolean;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize?: string;
  legendFontColor?: string;
  legendLabels?: string[];
  centerLabel?: string;
  centerValue?: string | number;
  centerIcon?: React.ReactNode;
  extraCenterInfo?: React.ReactNode;
  ariaLabel?: string;
  showHoverEffect?: boolean;
  onSliceClick?: (data: DonutChartData) => void;
  cornerRadius?: number;
  padAngle?: number;
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
};
