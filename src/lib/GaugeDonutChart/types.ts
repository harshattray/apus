export type GradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

export type GaugeDonutData = {
  label: string;
  value: number;
  color?: string;
  gradient?: GradientStop[];
};

export type GaugeDonutChartProps = {
  data: GaugeDonutData[];
  width?: number;
  height?: number;
  variant?:
    | 'full'
    | 'half-bottom'
    | 'half-top'
    | 'half-left'
    | 'half-right'
    | 'quarter-bottom-right'
    | 'quarter-top-right'
    | 'quarter-bottom-left'
    | 'quarter-top-left';
  centerLabel?: string;
  centerValue?: string | number;
  onSliceClick?: (data: GaugeDonutData) => void;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  showLegend?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendFontSize?: string;
  legendFontColor?: string;
  showTooltip?: boolean;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipBorderRadius?: string;
  tooltipFontSize?: string;
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
};

// GaugeDonutChartRendererProps is the same as GaugeDonutChartProps
export type GaugeDonutChartRendererProps = GaugeDonutChartProps;

export {};
