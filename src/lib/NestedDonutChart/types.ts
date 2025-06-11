export type NestedDonutDataPoint = {
  label: string;
  value: number;
  color?: string;
};

export type NestedDonutLevelData = NestedDonutDataPoint[];

export type NestedDonutChartProps = {
  levels: NestedDonutLevelData[];
  width?: number;
  height?: number;
  colors?: string[][];
  centerLabel?: string;
  centerValue?: string | number;
  onSliceClick?: (levelIndex: number, data: NestedDonutDataPoint) => void;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
  // Added glow effect props
  enableGlow?: boolean;
  glowColor?: string; // defaults to slice color
  glowBlur?: number; // Gaussian blur standard deviation
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
};

// NestedDonutChartRendererProps is the same as NestedDonutChartProps
export type NestedDonutChartRendererProps = NestedDonutChartProps;

export {};
