/**
 * @file types.ts
 * @description Type definitions for StackedBarChart component
 */

export type StackedBarChartData = {
  [key: string]: number | string;
};

export type StackedBarChartProps = {
  data: StackedBarChartData[]; // Data format: array of objects, each object is a bar (e.g., month), keys are stack categories
  keys: string[]; // Keys from the data objects to stack (e.g., ['Out of Compliance', 'Ineligible', ...])
  indexBy: string; // The key in data objects to use as the index (e.g., 'month')
  width?: number;
  height?: number;
  layout?: 'vertical' | 'horizontal'; // Orientation of the chart, defaults to 'vertical'
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[]; // Colors for the stacked segments
  showGridLines?: boolean;
  ariaLabel?: string;
  responsive?: boolean;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize?: string;
  legendFontColor?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisTextColor?: string;
  yAxisTextColor?: string;
  axisLineColor?: string;
  yAxisTicks?: number;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  barCornerRadius?: number;
  showValues?: boolean;
  valuesFontSize?: string;
  valuesFontColor?: string;
  barOpacity?: number;
  animationDuration?: number;
  visibleKeys?: string[];
  setVisibleKeys?: React.Dispatch<React.SetStateAction<string[]>>;
  tooltipComponent?: React.ComponentType<{
    data: { id: string; value: number; indexValue: string };
    color: string;
  }>;
};
