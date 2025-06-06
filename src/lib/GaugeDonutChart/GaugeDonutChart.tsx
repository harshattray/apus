import React from 'react';
import { GaugeDonutChartProps } from './types';
import { GaugeDonutChartRenderer } from './GaugeDonutChartRenderer';

// The main GaugeDonutChart component that acts as a wrapper and passes props to the renderer
const GaugeDonutChart: React.FC<GaugeDonutChartProps> = (props) => {
  return <GaugeDonutChartRenderer {...props} />;
};

// Export the main component.
export { GaugeDonutChart };
