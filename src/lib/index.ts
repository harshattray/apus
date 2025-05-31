/**
 * @file index.ts
 * @description Main export file for the chart library
 */

// Export components
export { BarChart } from './BarChart/BarChart';
export type { BarChartProps, BarChartData } from './BarChart/types';

export { LineChart } from './LineChart/LineChart';
export type { LineChartProps, LineChartSeries, LineChartDataPoint } from './LineChart/types';

// Export hooks for advanced usage
export { useChartDimensions } from './hooks/useChartDimensions';
export { useTooltip } from './hooks/useTooltip';

// Export utilities
export { createGradient, addGridLines, addLegend } from './utils/chartUtils';
export type { Margin } from './utils/chartUtils';
