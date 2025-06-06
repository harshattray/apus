export type NestedDonutLevelData = { label: string; value: number; color?: string }[];

interface BaseNestedDonutChartProps {
  levels: NestedDonutLevelData[]; // Array of data arrays, one for each ring
  width?: number;
  height?: number;
  colors?: string[][]; // Optional: array of color arrays, one per level
  centerLabel?: string;
  centerValue?: string | number;
  onSliceClick?: (level: number, data: { label: string; value: number; color?: string }) => void;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  legendFontSize?: string;
  legendFontColor?: string;
}

export interface NestedDonutChartRendererProps extends BaseNestedDonutChartProps {
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

// NestedDonutChartProps should be the same as NestedDonutChartRendererProps since the main component now accepts all renderer props
export type NestedDonutChartProps = NestedDonutChartRendererProps;

export {};
