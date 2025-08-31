export interface RangeChartDataItem {
  day: string;
  range1: {
    min: number;
    max: number;
  };
  range2: {
    min: number;
    max: number;
  };
}

export interface RangeChartProps {
  data: RangeChartDataItem[];
  width?: number;
  height?: number;
  responsive?: boolean;
  color1?: string;
  color2?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  xAxisTextColor?: string;
  yAxisTextColor?: string;
  axisLineColor?: string;
  yAxisTicks?: number;
}
