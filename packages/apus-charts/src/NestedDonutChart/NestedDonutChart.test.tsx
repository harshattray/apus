import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NestedDonutChart } from './NestedDonutChart';
import '@testing-library/jest-dom';

describe('NestedDonutChart', () => {
  const mockData = [
    // Level 1 (outer ring)
    [
      { label: 'Category A', value: 40 },
      { label: 'Category B', value: 30 },
      { label: 'Category C', value: 30 },
    ],
    // Level 2 (middle ring)
    [
      { label: 'Sub A1', value: 20 },
      { label: 'Sub A2', value: 20 },
      { label: 'Sub B1', value: 15 },
      { label: 'Sub B2', value: 15 },
      { label: 'Sub C1', value: 15 },
      { label: 'Sub C2', value: 15 },
    ],
    // Level 3 (inner ring)
    [
      { label: 'Detail A1.1', value: 10 },
      { label: 'Detail A1.2', value: 10 },
      { label: 'Detail A2.1', value: 10 },
      { label: 'Detail A2.2', value: 10 },
      { label: 'Detail B1.1', value: 7.5 },
      { label: 'Detail B1.2', value: 7.5 },
      { label: 'Detail B2.1', value: 7.5 },
      { label: 'Detail B2.2', value: 7.5 },
      { label: 'Detail C1.1', value: 7.5 },
      { label: 'Detail C1.2', value: 7.5 },
      { label: 'Detail C2.1', value: 7.5 },
      { label: 'Detail C2.2', value: 7.5 },
    ],
  ];

  it('renders an SVG element', () => {
    const { container } = render(<NestedDonutChart levels={mockData} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of arcs for each level', () => {
    const { container } = render(<NestedDonutChart levels={mockData} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      const totalArcs = mockData.reduce((sum, level) => sum + level.length, 0);
      expect(paths.length).toBe(totalArcs);
    }
  });

  it('renders center text when provided', () => {
    const centerLabel = 'Total';
    const centerValue = '100';
    const { container } = render(
      <NestedDonutChart levels={mockData} centerLabel={centerLabel} centerValue={centerValue} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const textElements = svg.querySelectorAll('text');
      expect(textElements.length).toBe(2); // Label and value
      expect(textElements[0]).toHaveTextContent(centerValue);
      expect(textElements[1]).toHaveTextContent(centerLabel);
    }
  });

  it('applies custom colors to arcs', () => {
    const colors = [
      ['#ff0000', '#00ff00', '#0000ff'], // Level 1 colors
      ['#ff00ff', '#00ffff', '#ffff00', '#ff8800', '#00ff88', '#8800ff'], // Level 2 colors
      [
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ff00ff',
        '#00ffff',
        '#ffff00',
        '#ff8800',
        '#00ff88',
        '#8800ff',
        '#ff0000',
        '#00ff00',
        '#0000ff',
      ], // Level 3 colors
    ];
    const { container } = render(<NestedDonutChart levels={mockData} colors={colors} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      let pathIndex = 0;
      mockData.forEach((level, levelIndex) => {
        level.forEach((_, itemIndex) => {
          const path = paths[pathIndex];
          expect(path).toHaveAttribute(
            'fill',
            colors[levelIndex][itemIndex % colors[levelIndex].length],
          );
          pathIndex++;
        });
      });
    }
  });

  it('renders legend when showLegend is true', () => {
    const { container } = render(
      <NestedDonutChart levels={mockData} showLegend={true} legendPosition="top" />,
    );
    // The legend is rendered as a div with specific style properties
    const legend = container.querySelector(
      'div[style*="display: flex"][style*="flex-direction: column"][style*="gap: 0.5rem"][style*="padding: 0.5rem"][style*="background-color: rgb(245, 245, 245)"]',
    );
    expect(legend).toBeInTheDocument();
    // Verify the legend contains level headers
    if (legend) {
      const levelHeaders = legend.querySelectorAll('h4');
      expect(levelHeaders.length).toBe(mockData.length);
    }
  });

  it('does not render legend when showLegend is false', () => {
    const { container } = render(<NestedDonutChart levels={mockData} showLegend={false} />);
    const legend = container.querySelector('.legend');
    expect(legend).not.toBeInTheDocument();
  });

  it('renders with custom inner and outer radius', () => {
    const innerRadius = 50;
    const outerRadius = 100;
    const { container } = render(
      <NestedDonutChart levels={mockData} innerRadius={innerRadius} outerRadius={outerRadius} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        // The path should be an SVG path
        expect(d).toMatch(/^M.*A.*L.*Z$/);
      });
    }
  });

  it('renders with corner radius when specified', () => {
    const cornerRadius = 10;
    const { container } = render(
      <NestedDonutChart levels={mockData} cornerRadius={cornerRadius} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        // The path should be an SVG path
        expect(d).toMatch(/^M.*A.*L.*Z$/);
      });
    }
  });

  it('renders with pad angle when specified', () => {
    const padAngle = 0.05;
    const { container } = render(<NestedDonutChart levels={mockData} padAngle={padAngle} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      expect(paths.length).toBe(mockData.reduce((sum, level) => sum + level.length, 0));
      // Each path should be an SVG path
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        expect(d).toMatch(/^M.*A.*L.*Z$/);
      });
    }
  });

  it('renders with custom tooltip styles', () => {
    const tooltipStyles = {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      textColor: '#ffffff',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
    };
    const { container } = render(
      <NestedDonutChart
        levels={mockData}
        tooltipBackgroundColor={tooltipStyles.backgroundColor}
        tooltipTextColor={tooltipStyles.textColor}
        tooltipPadding={tooltipStyles.padding}
        tooltipBorderRadius={tooltipStyles.borderRadius}
        tooltipFontSize={tooltipStyles.fontSize}
      />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Tooltip styles are applied through CSS, so we just verify the component renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    const width = 500;
    const height = 500;
    const { container } = render(
      <NestedDonutChart levels={mockData} width={width} height={height} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      expect(svg).toHaveAttribute('width', String(width));
      expect(svg).toHaveAttribute('height', String(height));
    }
  });

  it('renders with custom className and style', () => {
    const className = 'custom-nested-donut-chart';
    const style = { margin: '20px' };
    const { container } = render(
      <NestedDonutChart levels={mockData} className={className} style={style} />,
    );
    const chartContainer = container.firstChild as HTMLElement;
    expect(chartContainer).toHaveClass(className);
    expect(chartContainer).toHaveStyle(style);
  });

  it('handles click events on slices', () => {
    const onSliceClick = vi.fn();
    const { container } = render(
      <NestedDonutChart levels={mockData} onSliceClick={onSliceClick} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      fireEvent.click(paths[0]);
      expect(onSliceClick).toHaveBeenCalledWith(0, mockData[0][0]);
    }
  });
});
