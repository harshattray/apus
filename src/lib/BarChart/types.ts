/**
 * @file types.ts
 * @description Type definitions for the BarChart component
 */

export type BarChartData = {
  label: string;
  value: number;
};

export type BarChartProps = {
  ariaLabel?: string;
  data: BarChartData[];
  width?: number;
  height?: number;
  color?: string | string[];
  gradientColors?: string[];
  margin?: { top: number; right: number; bottom: number; left: number };
  responsive?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  xAxisTextColor?: string;
  yAxisTextColor?: string;
  axisLineColor?: string;
  yAxisTicks?: number;
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
};
