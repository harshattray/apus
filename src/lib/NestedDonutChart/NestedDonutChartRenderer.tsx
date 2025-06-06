import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
// Remove the import of the main component
// import { NestedDonutChart } from './NestedDonutChart';
import { NestedDonutChartProps, NestedDonutLevelData } from './types';

interface NestedDonutChartRendererProps extends NestedDonutChartProps {
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
  enableGlow?: boolean;
  glowColor?: string;
  glowBlur?: number;
}

export const NestedDonutChartRenderer: React.FC<NestedDonutChartRendererProps> = ({
  legendPosition = 'bottom',
  theme = 'light',
  className = '',
  style,
  levels,
  width = 400,
  height = 400,
  colors,
  centerLabel,
  centerValue,
  onSliceClick,
  enableGlow = false,
  glowColor,
  glowBlur = 5,
}) => {
  const [activeSlices, setActiveSlices] = useState<Set<string>>(new Set());
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<null | {
    x: number;
    y: number;
    label: string;
    value: number;
    percent: string;
    level: number;
  }>(null);

  const handleSliceClick = (
    level: number,
    data: { label: string; value: number; color?: string },
  ) => {
    const sliceKey = `${level}-${data.label}`;
    const newActiveSlices = new Set(activeSlices);

    if (newActiveSlices.has(sliceKey)) {
      newActiveSlices.delete(sliceKey);
    } else {
      newActiveSlices.add(sliceKey);
    }

    setActiveSlices(newActiveSlices);
    onSliceClick?.(level, data);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2;

    const ringThickness = radius / (levels.length * 3); // Divide radius by 3 times the number of levels

    // Create pie generators for each level
    const pieGenerators = Array.from({ length: levels.length }, () =>
      d3
        .pie<NestedDonutLevelData[number]>()
        .value((d) => d.value)
        .sort(null)
        .padAngle(0.02),
    );

    // Generate pie data for each level
    const pieData = levels.map((level, index) => pieGenerators[index](level));

    // Clear previous rendering
    svg.select('g').remove();
    svg.selectAll('defs').remove(); // Clear defs as well

    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);
    const defs = svg.append('defs');

    // Add glow filter definition
    if (enableGlow) {
      defs
        .append('filter')
        .attr('id', 'nested-donut-glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%')
        .call((filter) => {
          filter
            .append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', glowBlur)
            .attr('result', 'coloredBlur');
          // Use feFlood to set the color, defaulting to slice color if glowColor is not provided
          filter
            .append('feFlood')
            .attr('flood-color', glowColor || 'currentColor') // Use currentColor or provided color
            .attr('result', 'glowColor');
          filter
            .append('feComposite')
            .attr('in', 'glowColor')
            .attr('in2', 'coloredBlur')
            .attr('operator', 'in')
            .attr('result', 'coloredBlur');
          filter.append('feMerge').call((merge) => {
            merge.append('feMergeNode').attr('in', 'coloredBlur');
            merge.append('feMergeNode').attr('in', 'SourceGraphic');
          });
        });
    }

    pieData.forEach((levelData, levelIndex) => {
      const innerRadius = radius - (levelIndex + 1) * ringThickness * 3;
      const outerRadius = radius - levelIndex * ringThickness * 3;

      const arcGen = d3
        .arc<d3.PieArcDatum<NestedDonutLevelData[number]>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(4);

      g.selectAll(`.arc-${levelIndex}`)
        .data(levelData)
        .join('path')
        .attr('class', `arc-${levelIndex}`)
        .attr('d', arcGen)
        .attr('fill', (d, i) => {
          // Use provided colors or a default D3 color scheme
          if (colors && colors[levelIndex] && colors[levelIndex][i]) {
            return colors[levelIndex][i];
          }
          return d3.schemeCategory10[i % 10]; // Default D3 color scheme
        })
        .attr('stroke', theme === 'dark' ? '#333' : '#fff')
        .attr('stroke-width', 1)
        .style('transition', 'opacity 0.2s')
        .style('opacity', (d) => {
          const sliceKey = `${levelIndex}-${d.data.label}`;
          return activeSlices.size === 0 || activeSlices.has(sliceKey) ? 1 : 0.3;
        })
        .on('mouseover', (event, d) => {
          const totalForLevel = levels[levelIndex].reduce((sum, item) => sum + item.value, 0);
          const percent =
            totalForLevel > 0 ? ((d.data.value / totalForLevel) * 100).toFixed(1) : '0.0';
          setTooltip({
            x: event.clientX,
            y: event.clientY,
            label: d.data.label,
            value: d.data.value,
            percent,
            level: levelIndex + 1,
          });
        })
        .on('mouseout', () => {
          setTooltip(null);
        })
        .on('click', (event, d) => handleSliceClick(levelIndex, d.data))
        .style('cursor', onSliceClick ? 'pointer' : 'default')
        // Apply glow filter if enabled
        .attr('filter', enableGlow ? 'url(#nested-donut-glow)' : null);
    });

    // Center label/value
    if (centerLabel || centerValue) {
      const textGroup = g
        .append('g')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('pointer-events', 'none');

      if (centerValue !== undefined) {
        textGroup
          .append('text')
          .attr('y', -8)
          .style('font-size', 32)
          .style('font-weight', 'bold')
          .style('fill', theme === 'dark' ? '#eee' : '#333')
          .text(centerValue);
      }

      if (centerLabel) {
        textGroup
          .append('text')
          .attr('y', 20)
          .style('font-size', 16)
          .style('fill', theme === 'dark' ? '#aaa' : '#666')
          .text(centerLabel);
      }
    }
  }, [
    levels,
    width,
    height,
    colors,
    centerLabel,
    centerValue,
    onSliceClick,
    activeSlices,
    theme,
    enableGlow,
    glowColor,
    glowBlur,
  ]); // Added glow props to dependencies

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: legendPosition === 'right' || legendPosition === 'left' ? 'row' : 'column',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ...style,
  };

  const chartStyle: React.CSSProperties = {
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
  };

  const legendStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    borderRadius: '4px',
    maxHeight: legendPosition === 'right' || legendPosition === 'left' ? '100%' : '200px',
    overflowY: 'auto',
  };

  const tooltipDiv = tooltip ? (
    <div
      style={{
        position: 'fixed',
        left: tooltip.x + 12,
        top: tooltip.y + 12,
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: 6,
        fontSize: 14,
        pointerEvents: 'none',
        zIndex: 1000,
        minWidth: 100,
      }}
    >
      <div style={{ fontWeight: 600 }}>
        Level {tooltip.level}: {tooltip.label}
      </div>
      <div>Value: {tooltip.value}</div>
      <div>{tooltip.percent}%</div>
    </div>
  ) : null;

  return (
    <div className={`chart-container ${className}`} style={containerStyle}>
      {legendPosition === 'top' && (
        <div style={legendStyle}>
          {/* Legend rendering logic */}
          {levels.map((level, levelIdx) => (
            <div key={levelIdx} style={{ marginBottom: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Level {levelIdx + 1}</h4>
              {level.map((item) => {
                const sliceKey = `${levelIdx}-${item.label}`;
                const isActive = activeSlices.size === 0 || activeSlices.has(sliceKey);
                return (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                    onClick={() => handleSliceClick(levelIdx, item)}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor:
                          item.color ||
                          d3.schemeCategory10[
                            levelIdx * level.length + (level.indexOf(item) % 10)
                          ] ||
                          '#ccc', // Use color from data if available, otherwise default
                        borderRadius: '2px',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        color: isActive ? (theme === 'dark' ? '#fff' : '#000') : '#888',
                        textDecoration: isActive ? 'none' : 'line-through',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="nested-donut-chart"
        style={chartStyle}
      ></svg>
      {legendPosition === 'bottom' && (
        <div style={legendStyle}>
          {/* Legend rendering logic */}
          {levels.map((level, levelIdx) => (
            <div key={levelIdx} style={{ marginBottom: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Level {levelIdx + 1}</h4>
              {level.map((item) => {
                const sliceKey = `${levelIdx}-${item.label}`;
                const isActive = activeSlices.size === 0 || activeSlices.has(sliceKey);
                return (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                    onClick={() => handleSliceClick(levelIdx, item)}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor:
                          item.color ||
                          d3.schemeCategory10[
                            levelIdx * level.length + (level.indexOf(item) % 10)
                          ] ||
                          '#ccc', // Use color from data if available, otherwise default
                        borderRadius: '2px',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        color: isActive ? (theme === 'dark' ? '#fff' : '#000') : '#888',
                        textDecoration: isActive ? 'none' : 'line-through',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {legendPosition === 'left' && (
        <div style={legendStyle}>
          {/* Legend rendering logic */}
          {levels.map((level, levelIdx) => (
            <div key={levelIdx} style={{ marginBottom: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Level {levelIdx + 1}</h4>
              {level.map((item) => {
                const sliceKey = `${levelIdx}-${item.label}`;
                const isActive = activeSlices.size === 0 || activeSlices.has(sliceKey);
                return (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                    onClick={() => handleSliceClick(levelIdx, item)}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor:
                          item.color ||
                          d3.schemeCategory10[
                            levelIdx * level.length + (level.indexOf(item) % 10)
                          ] ||
                          '#ccc', // Use color from data if available, otherwise default
                        borderRadius: '2px',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        color: isActive ? (theme === 'dark' ? '#fff' : '#000') : '#888',
                        textDecoration: isActive ? 'none' : 'line-through',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {legendPosition === 'right' && (
        <div style={legendStyle}>
          {/* Legend rendering logic */}
          {levels.map((level, levelIdx) => (
            <div key={levelIdx} style={{ marginBottom: '0.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Level {levelIdx + 1}</h4>
              {level.map((item) => {
                const sliceKey = `${levelIdx}-${item.label}`;
                const isActive = activeSlices.size === 0 || activeSlices.has(sliceKey);
                return (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem',
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                    onClick={() => handleSliceClick(levelIdx, item)}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor:
                          item.color ||
                          d3.schemeCategory10[
                            levelIdx * level.length + (level.indexOf(item) % 10)
                          ] ||
                          '#ccc', // Use color from data if available, otherwise default
                        borderRadius: '2px',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        color: isActive ? (theme === 'dark' ? '#fff' : '#000') : '#888',
                        textDecoration: isActive ? 'none' : 'line-through',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {tooltipDiv}
    </div>
  );
};
