/**
 * @file RangeChart.tsx
 * @description Main component for the RangeChart
 */
import React, { useRef, useState } from 'react';
import { RangeChartProps, RangeChartDataItem } from './types';
import { RangeChartRenderer } from './RangeChartRenderer';
import { useChartDimensions } from '../hooks/useChartDimensions';

const defaultMargin = { top: 20, right: 20, bottom: 30, left: 40 };

export const RangeChart: React.FC<RangeChartProps> = ({
  data,
  width = 600,
  height = 400,
  responsive = true,
  color1 = '#8884d8',
  color2 = '#82ca9d',
  margin = defaultMargin,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  xAxisTextColor = '#333',
  yAxisTextColor = '#333',
  axisLineColor = '#ccc',
  yAxisTicks = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useChartDimensions(containerRef, width, height, responsive);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredData, setHoveredData] = useState<RangeChartDataItem | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: responsive ? undefined : height }}
    >
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
        <RangeChartRenderer
          svgRef={svgRef}
          data={data}
          dimensions={dimensions}
          color1={color1}
          color2={color2}
          margin={margin}
          showXAxis={showXAxis}
          showYAxis={showYAxis}
          showGridLines={showGridLines}
          xAxisTextColor={xAxisTextColor}
          yAxisTextColor={yAxisTextColor}
          axisLineColor={axisLineColor}
          yAxisTicks={yAxisTicks}
          setHoveredData={setHoveredData}
          setTooltipPosition={setTooltipPosition}
        />
      </svg>
      {hoveredData && tooltipPosition && (
        <div
          style={{
            position: 'absolute',
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
          }}
        >
          <strong>{hoveredData.day}</strong>
          <br />
          Sys: {hoveredData.range1.max} mmHg
          <br />
          Dia: {hoveredData.range2.min} mmHg
        </div>
      )}
    </div>
  );
};
