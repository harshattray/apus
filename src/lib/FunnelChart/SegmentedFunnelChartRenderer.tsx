import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  SegmentedFunnelChartProps,
  SegmentedFunnelStage,
  SegmentedFunnelSegment,
  TrendData,
  HistoricalData,
  SegmentAnalytics,
} from './types';
import { useTooltip } from '../hooks/useTooltip';

interface SegmentedFunnelChartRendererProps extends Omit<SegmentedFunnelChartProps, 'data'> {
  data: SegmentedFunnelStage[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  isDarkMode: boolean;
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipPadding: string;
  tooltipBorderRadius: string;
  tooltipFontSize: string;
  tooltipOffsetX: number;
  tooltipOffsetY: number;
  tooltipFormat?: (data: {
    stageLabel: string;
    segment: SegmentedFunnelSegment;
    totalStageValue: number;
  }) => string;
  tooltipSegmentFormat?: (data: {
    stageLabel: string;
    segment: SegmentedFunnelSegment;
    totalStageValue: number;
  }) => string;
  showTrendIndicators?: boolean;
  showMiniCharts?: boolean;
  showAnalytics?: boolean;
  miniChartHeight?: number;
  trendIndicatorSize?: number;
  analyticsDisplayMode?: 'tooltip' | 'inline' | 'both';
}

const SegmentedFunnelChartRenderer: React.FC<SegmentedFunnelChartRendererProps> = ({
  data,
  width,
  height,
  margin,
  showValues,
  valueFormat,
  onSliceClick,
  tooltipBackgroundColor,
  tooltipTextColor,
  tooltipPadding,
  tooltipBorderRadius,
  tooltipFontSize,
  tooltipOffsetX,
  tooltipOffsetY,
  tooltipSegmentFormat,
  isDarkMode,
  enableGradients = false,
  gradientDirection = 'vertical',
  segmentShadowColor = 'rgba(0,0,0,0.2)',
  segmentShadowBlur = 5,
  segmentShadowOffsetX = 0,
  segmentShadowOffsetY = 5,
  showTrendIndicators = true,
  showMiniCharts = true,
  showAnalytics = true,
  miniChartHeight = 30,
  trendIndicatorSize = 12,
  analyticsDisplayMode = 'tooltip',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const filterIdRef = useRef<string>(
    `segmented-funnel-shadow-${Math.random().toString(36).substring(7)}`,
  );

  const tooltip = useTooltip(tooltipRef, {
    backgroundColor: tooltipBackgroundColor,
    textColor: tooltipTextColor,
    padding: tooltipPadding,
    borderRadius: tooltipBorderRadius,
    fontSize: tooltipFontSize,
  });

  useEffect(() => {
    tooltip.applyTooltipStyles();
  }, [
    tooltip,
    tooltipBackgroundColor,
    tooltipTextColor,
    tooltipPadding,
    tooltipBorderRadius,
    tooltipFontSize,
  ]);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Append <defs> for gradients and filters
    const defs = svg.append('defs');

    // Shadow filter
    defs
      .append('filter')
      .attr('id', filterIdRef.current)
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
      .append('feDropShadow')
      .attr('dx', segmentShadowOffsetX)
      .attr('dy', segmentShadowOffsetY)
      .attr('stdDeviation', segmentShadowBlur)
      .attr('flood-color', segmentShadowColor);

    // Gradients
    data.forEach((stage, stageIndex) => {
      stage.segments.forEach((segmentData, segmentIndex) => {
        if (enableGradients && segmentData.color) {
          const gradientId = `gradient-${stage.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${segmentData.channel.replace(/[^a-zA-Z0-9-_]/g, '')}-${stageIndex}-${segmentIndex}`;
          const linearGradient = defs.append('linearGradient').attr('id', gradientId);

          if (gradientDirection === 'vertical') {
            linearGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
          } else {
            // horizontal
            linearGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%');
          }

          linearGradient
            .append('stop')
            .attr('offset', '0%')
            .attr(
              'stop-color',
              d3.color(segmentData.color)?.darker(0.5)?.toString() || segmentData.color,
            );
          linearGradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', segmentData.color);
        }
      });
    });

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Calculate total value for each stage and overall max
    const stageTotals = data.map((stage) => d3.sum(stage.segments, (s) => s.value));
    const maxValue = d3.max(stageTotals) || 0;

    const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, innerWidth]);

    const segmentHeight = innerHeight / data.length;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    let currentY = 0;

    const renderTrendIndicator = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      trend: TrendData,
      x: number,
      y: number,
    ) => {
      const trendGroup = g.append('g').attr('transform', `translate(${x},${y})`);

      const arrowColor = trend.change >= 0 ? '#4CAF50' : '#F44336';
      const arrowPath =
        trend.change >= 0
          ? `M 0 ${trendIndicatorSize} L ${trendIndicatorSize / 2} 0 L ${trendIndicatorSize} ${trendIndicatorSize}`
          : `M 0 0 L ${trendIndicatorSize / 2} ${trendIndicatorSize} L ${trendIndicatorSize} 0`;

      trendGroup.append('path').attr('d', arrowPath).attr('fill', arrowColor);

      trendGroup
        .append('text')
        .attr('x', trendIndicatorSize + 4)
        .attr('y', trendIndicatorSize / 2)
        .attr('dominant-baseline', 'middle')
        .attr('fill', arrowColor)
        .attr('font-size', '10px')
        .text(`${Math.abs(trend.changePercentage).toFixed(1)}%`);
    };

    const renderMiniChart = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      historicalData: HistoricalData[],
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      if (!historicalData || historicalData.length < 2) return;

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(historicalData, (d) => d.timestamp) as [number, number])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(historicalData, (d) => d.value) as number])
        .range([height, 0]);

      const line = d3
        .line<HistoricalData>()
        .x((d) => xScale(d.timestamp))
        .y((d) => yScale(d.value));

      g.append('path')
        .datum(historicalData)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', isDarkMode ? '#a8dadc' : '#4287f5')
        .attr('stroke-width', 1.5);
    };

    const renderAnalytics = (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      analytics: SegmentAnalytics,
      x: number,
      y: number,
    ) => {
      if (!analytics) return;

      const analyticsGroup = g.append('g').attr('transform', `translate(${x},${y})`);

      // Performance metrics
      analyticsGroup
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', isDarkMode ? '#e2e8f0' : '#1a202c')
        .attr('font-size', '10px')
        .text(`Conv: ${analytics.performance.conversionRate.toFixed(1)}%`);

      // Contribution metrics
      analyticsGroup
        .append('text')
        .attr('x', 0)
        .attr('y', 15)
        .attr('fill', isDarkMode ? '#e2e8f0' : '#1a202c')
        .attr('font-size', '10px')
        .text(`Cont: ${analytics.contribution.percentageOfTotal.toFixed(1)}%`);

      // Correlation indicator
      if (analytics.correlation.correlationScore > 0.7) {
        analyticsGroup
          .append('circle')
          .attr('cx', 50)
          .attr('cy', 7)
          .attr('r', 4)
          .attr('fill', '#4CAF50');
      }
    };

    data.forEach((stage, stageIndex) => {
      const totalStageValue = stageTotals[stageIndex];
      const nextStageTotalValue = stageIndex < data.length - 1 ? stageTotals[stageIndex + 1] : 0;

      const topWidth = xScale(totalStageValue);
      const bottomWidth = xScale(nextStageTotalValue);

      const topXStart = (innerWidth - topWidth) / 2;
      const bottomXStart = (innerWidth - bottomWidth) / 2;

      let currentSegmentX = topXStart;
      let currentSegmentBottomX = bottomXStart;

      stage.segments.forEach((segmentData, segmentIndex) => {
        const segmentProportion = segmentData.value / totalStageValue;
        const segmentTopWidth = topWidth * segmentProportion;
        const segmentBottomWidth = bottomWidth * segmentProportion;

        const segmentGroup = g.append('g').attr('class', 'funnel-segment');

        // Draw main segment
        const path = segmentGroup
          .append('path')
          .attr(
            'd',
            `
            M ${currentSegmentX} ${currentY}
            L ${currentSegmentX + segmentTopWidth} ${currentY}
            L ${currentSegmentBottomX + segmentBottomWidth} ${currentY + segmentHeight}
            L ${currentSegmentBottomX} ${currentY + segmentHeight}
            Z
          `,
          )
          .attr(
            'fill',
            enableGradients && segmentData.color
              ? `url(#gradient-${stage.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${segmentData.channel.replace(/[^a-zA-Z0-9-_]/g, '')}-${stageIndex}-${segmentIndex})`
              : segmentData.color ||
                  `hsl(${(stageIndex * 50 + segmentIndex * 20) % 360}, 70%, 50%)`,
          )
          .attr('stroke', '#fff')
          .attr('stroke-width', 1)
          .style('cursor', onSliceClick ? 'pointer' : 'default')
          .style('filter', `url(#${filterIdRef.current})`);

        // Add trend indicator if enabled and data available
        if (showTrendIndicators && segmentData.trend) {
          renderTrendIndicator(
            segmentGroup,
            segmentData.trend,
            currentSegmentX + segmentTopWidth - trendIndicatorSize - 20,
            currentY + 5,
          );
        }

        // Add mini chart if enabled and data available
        if (showMiniCharts && segmentData.historicalData) {
          renderMiniChart(
            segmentGroup,
            segmentData.historicalData,
            currentSegmentX + 5,
            currentY + segmentHeight - miniChartHeight - 5,
            segmentTopWidth - 10,
            miniChartHeight,
          );
        }

        // Add analytics if enabled and data available
        if (showAnalytics && segmentData.analytics && analyticsDisplayMode !== 'tooltip') {
          renderAnalytics(segmentGroup, segmentData.analytics, currentSegmentX + 5, currentY + 5);
        }

        // Enhanced tooltip with analytics
        path
          .on('mouseenter', (event) => {
            if (chartRef.current) {
              const [x, y] = d3.pointer(event, chartRef.current);
              const analyticsContent = segmentData.analytics
                ? `
                <div style="margin-top: 8px; border-top: 1px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}; padding-top: 8px;">
                  <div>Conversion Rate: ${segmentData.analytics.performance.conversionRate.toFixed(1)}%</div>
                  <div>Contribution: ${segmentData.analytics.contribution.percentageOfTotal.toFixed(1)}%</div>
                  <div>Correlation: ${segmentData.analytics.correlation.correlationScore.toFixed(2)}</div>
                </div>
              `
                : '';

              const content = tooltipSegmentFormat
                ? tooltipSegmentFormat({
                    stageLabel: stage.label,
                    segment: segmentData,
                    totalStageValue: totalStageValue,
                  })
                : `
                  <div style="
                    background-color: ${tooltipBackgroundColor};
                    color: ${tooltipTextColor};
                    padding: ${tooltipPadding};
                    border-radius: ${tooltipBorderRadius};
                    font-size: ${tooltipFontSize};
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    text-align: center;
                  ">
                    <div style="font-weight: bold; color: ${segmentData.color || (isDarkMode ? '#a8dadc' : '#4287f5')};">${stage.label}</div>
                    <div>${segmentData.channel}: <span style="font-weight: bold;">${valueFormat?.(segmentData.value) ?? segmentData.value.toString()}</span></div>
                    ${
                      segmentData.trend
                        ? `
                      <div style="color: ${segmentData.trend.change >= 0 ? '#4CAF50' : '#F44336'}">
                        ${segmentData.trend.change >= 0 ? '↑' : '↓'} ${Math.abs(segmentData.trend.changePercentage).toFixed(1)}%
                      </div>
                    `
                        : ''
                    }
                    ${analyticsDisplayMode !== 'inline' ? analyticsContent : ''}
                  </div>
                `;

              tooltip.showTooltip(content, x + tooltipOffsetX, y + tooltipOffsetY);
            }
          })
          .on('mouseleave', () => {
            tooltip.hideTooltip();
          });

        currentSegmentX += segmentTopWidth;
        currentSegmentBottomX += segmentBottomWidth;
      });

      // Add stage label and total value (optional, can be controlled by showValues prop)
      if (showValues) {
        g.append('text')
          .attr('x', innerWidth / 2)
          .attr('y', currentY + segmentHeight / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', isDarkMode ? '#e2e8f0' : '#1a202c')
          .attr('font-size', '14px')
          .text(
            `${stage.label}: ${valueFormat?.(totalStageValue) ?? totalStageValue.toLocaleString()}`,
          );
      }

      currentY += segmentHeight;
    });
  }, [
    data,
    width,
    height,
    margin,
    showValues,
    valueFormat,
    onSliceClick,
    tooltip,
    tooltipOffsetX,
    tooltipOffsetY,
    tooltipSegmentFormat,
    isDarkMode,
    enableGradients,
    gradientDirection,
    segmentShadowColor,
    segmentShadowBlur,
    segmentShadowOffsetX,
    segmentShadowOffsetY,
    showTrendIndicators,
    showMiniCharts,
    showAnalytics,
    miniChartHeight,
    trendIndicatorSize,
    analyticsDisplayMode,
    tooltipBackgroundColor,
    tooltipBorderRadius,
    tooltipFontSize,
    tooltipPadding,
    tooltipTextColor,
  ]);

  return (
    <div
      ref={chartRef}
      style={{
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg ref={svgRef} width={width} height={height} style={{ display: 'block' }}>
        {/* SVG Definitions for Gradients and Filters */}
        <defs>
          {data.map((stage, stageIndex) =>
            stage.segments.map((segmentData, segmentIndex) => {
              if (enableGradients && segmentData.color) {
                const gradientId = `gradient-${stage.label.replace(/[^a-zA-Z0-9-_]/g, '')}-${segmentData.channel.replace(/[^a-zA-Z0-9-_]/g, '')}-${stageIndex}-${segmentIndex}`;
                const darkerColor =
                  d3.color(segmentData.color)?.darker(0.5)?.toString() || segmentData.color;
                return (
                  <linearGradient
                    key={gradientId}
                    id={gradientId}
                    x1={gradientDirection === 'horizontal' ? '0%' : '0%'}
                    y1={gradientDirection === 'horizontal' ? '0%' : '0%'}
                    x2={gradientDirection === 'horizontal' ? '100%' : '0%'}
                    y2={gradientDirection === 'horizontal' ? '0%' : '100%'}
                  >
                    <stop offset="0%" stopColor={darkerColor} />
                    <stop offset="100%" stopColor={segmentData.color} />
                  </linearGradient>
                );
              }
              return null;
            }),
          )}
          <filter id={filterIdRef.current} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx={segmentShadowOffsetX}
              dy={segmentShadowOffsetY}
              stdDeviation={segmentShadowBlur}
              floodColor={segmentShadowColor}
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 1000,
          display: 'none',
        }}
      />
    </div>
  );
};

export default SegmentedFunnelChartRenderer;
