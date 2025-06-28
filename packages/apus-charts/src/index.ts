/**
 * @file index.ts
 * @description Main export file for the chart library
 */

// Export components
export { BarChart } from './BarChart/BarChart';
export type { BarChartProps, BarChartData } from './BarChart/types';

export { LineChart } from './LineChart/LineChart';
export type { LineChartProps, LineChartSeries, LineChartDataPoint } from './LineChart/types';

// Export DonutChart and its types
export { DonutChart } from './DonutChart/DonutChart';
export type { DonutChartProps, DonutChartData } from './DonutChart/types';

// Export GaugeDonutChart and its types
export { GaugeDonutChart } from './GaugeDonutChart/GaugeDonutChart';
export type { GaugeDonutChartProps, GaugeDonutData } from './GaugeDonutChart/types';

// Export NestedDonutChart and its types
export * from './NestedDonutChart';
export type { NestedDonutChartProps, NestedDonutLevelData } from './NestedDonutChart/types';

// Export StackedBarChart
export { StackedBarChart } from './StackedBarChart/StackedBarChart';
export type { StackedBarChartProps } from './StackedBarChart/types';

// Export ScatterChart
export { ScatterChart } from './ScatterChart';
export type { ScatterChartProps, ScatterDataPoint, ScatterHoveredData } from './ScatterChart/types';

// Export RadarChart and its types
export { default as RadarChart } from './RadarChart/RadarChart';
export type {
  RadarChartProps,
  RadarChartSeries,
  RadarChartDataPoint,
  HoveredDataInfo,
} from './RadarChart/types';

// Export FunnelChart
export { default as FunnelChart } from './FunnelChart';
export type { FunnelData, FunnelChartProps } from './FunnelChart/types';

// Export TimeSeriesFunnelChart
export { default as TimeSeriesFunnelChart } from './FunnelChart/TimeSeriesFunnelChart';
export type { TimeSeriesFunnelData, TimeSeriesFunnelChartProps } from './FunnelChart/types';

// Export SegmentedFunnelChart
export { default as SegmentedFunnelChart } from './FunnelChart/SegmentedFunnelChart';
export type {
  SegmentedFunnelSegment,
  SegmentedFunnelStage,
  SegmentedFunnelChartProps,
} from './FunnelChart/types';

// Export hooks for advanced usage
export { useChartDimensions } from './hooks/useChartDimensions';
export { useTooltip } from './hooks/useTooltip';

// Export utilities
export { createGradient, addGridLines, addLegend } from './utils/chartUtils';
export type { Margin } from './utils/chartUtils';
