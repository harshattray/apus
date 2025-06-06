import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GaugeDonutChart } from './GaugeDonutChart';
import '@testing-library/jest-dom';

describe('GaugeDonutChart', () => {
  const mockData = [
    { label: 'A', value: 30 },
    { label: 'B', value: 50 },
    { label: 'C', value: 20 },
  ];

  it('renders an SVG element', () => {
    const { container } = render(<GaugeDonutChart data={mockData} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of arcs', () => {
    const { container } = render(<GaugeDonutChart data={mockData} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
    }
  });

  it('renders center text when provided', () => {
    const centerLabel = 'Total';
    const centerValue = '100';
    const { container } = render(
      <GaugeDonutChart data={mockData} centerLabel={centerLabel} centerValue={centerValue} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const textElements = svg.querySelectorAll('text');
      expect(textElements.length).toBe(2); // Label and value
      expect(textElements[0]).toHaveTextContent(centerLabel);
      expect(textElements[1]).toHaveTextContent(centerValue);
    }
  });

  it('applies custom colors to arcs', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    const { container } = render(<GaugeDonutChart data={mockData} colors={colors} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        expect(path).toHaveAttribute('fill', colors[index]);
      });
    }
  });

  it('renders legend when showLegend is true', () => {
    const { container } = render(<GaugeDonutChart data={mockData} showLegend={true} />);
    const legend = container.querySelector('.legend');
    expect(legend).toBeInTheDocument();
    if (legend) {
      const legendItems = legend.querySelectorAll('.legend-item');
      expect(legendItems.length).toBe(mockData.length);
    }
  });

  it('does not render legend when showLegend is false', () => {
    const { container } = render(<GaugeDonutChart data={mockData} showLegend={false} />);
    const legend = container.querySelector('.legend');
    expect(legend).not.toBeInTheDocument();
  });

  it('renders with custom inner and outer radius', () => {
    const innerRadius = 50;
    const outerRadius = 100;
    const { container } = render(
      <GaugeDonutChart data={mockData} innerRadius={innerRadius} outerRadius={outerRadius} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        // The path should contain arcs with the specified radii
        expect(d).toContain(`A${outerRadius}`);
        expect(d).toContain(`A${innerRadius}`);
      });
    }
  });

  it('renders with corner radius when specified', () => {
    const cornerRadius = 10;
    const { container } = render(<GaugeDonutChart data={mockData} cornerRadius={cornerRadius} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        // The path should contain rounded corners
        expect(d).toContain(`A${cornerRadius}`);
      });
    }
  });

  it('renders with pad angle when specified', () => {
    const padAngle = 0.05;
    const { container } = render(<GaugeDonutChart data={mockData} padAngle={padAngle} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const paths = svg.querySelectorAll('path');
      expect(paths.length).toBe(mockData.length);
      // Each path should represent a slice with padding
      paths.forEach((path) => {
        const d = path.getAttribute('d');
        expect(d).toBeTruthy();
        // The path should contain arcs with padding
        expect(d).toContain('A');
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
      <GaugeDonutChart
        data={mockData}
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

  it('renders with dark theme', () => {
    const { container } = render(<GaugeDonutChart data={mockData} theme="dark" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Theme is applied through CSS classes, so we just verify the component renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    const width = 500;
    const height = 500;
    const { container } = render(<GaugeDonutChart data={mockData} width={width} height={height} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      expect(svg).toHaveAttribute('width', String(width));
      expect(svg).toHaveAttribute('height', String(height));
    }
  });

  it('renders with custom legend position', () => {
    const { container } = render(
      <GaugeDonutChart data={mockData} showLegend={true} legendPosition="right" />,
    );
    const legend = container.querySelector('.legend');
    expect(legend).toBeInTheDocument();
    // Legend position is applied through CSS classes, so we just verify the component renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom legend styles', () => {
    const { container } = render(
      <GaugeDonutChart
        data={mockData}
        showLegend={true}
        legendFontSize="14px"
        legendFontColor="#333333"
      />,
    );
    const legend = container.querySelector('.legend');
    expect(legend).toBeInTheDocument();
    // Legend styles are applied through CSS, so we just verify the component renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom className and style', () => {
    const className = 'custom-gauge-chart';
    const style = { margin: '20px' };
    const { container } = render(
      <GaugeDonutChart data={mockData} className={className} style={style} />,
    );
    const chartContainer = container.firstChild as HTMLElement;
    expect(chartContainer).toHaveClass(className);
    expect(chartContainer).toHaveStyle(style);
  });

  it('renders with different arc types', () => {
    const arcTypes = ['half', 'quarter'] as const;
    arcTypes.forEach((arcType) => {
      const { container } = render(<GaugeDonutChart data={mockData} arcType={arcType} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Arc type affects the SVG transform and path generation
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
