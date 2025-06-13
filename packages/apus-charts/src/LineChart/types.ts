/**
 * @file types.ts
 * @description Type definitions for the LineChart component
 */

export type LineChartDataPoint = {
  label: string | number;
  value: number;
};

export type LineChartSeries = {
  name: string;
  values: LineChartDataPoint[];
};

export type LineChartProps = {
  ariaLabel?: string;
  data: LineChartSeries[];
  width?: number;
  height?: number;
  lineColors?: string | string[];
  areaColor?: string;
  pointColor?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  yAxisTicks?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  areaGradientColors?: string[];
  lineGradientColors?: string[];
  showArea?: boolean;
  responsive?: boolean;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize?: string;
  legendFontColor?: string;
  // Axis styling properties
  xAxisTextColor?: string;
  yAxisTextColor?: string;
  axisLineColor?: string;
};
