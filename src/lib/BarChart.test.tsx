import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BarChart } from './BarChart';
import '@testing-library/jest-dom';

describe('BarChart', () => {
  const mockData = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
  ];

  it('renders an SVG element', () => {
    render(<BarChart data={mockData} />);
    const svgElement = screen.getByRole('img', { hidden: true }); // SVG is often treated as img role
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of bars', () => {
    render(<BarChart data={mockData} />);
    // A more robust way might be to query the SVG directly
    const svg = screen.getByRole('img', { hidden: true });
    const rects = svg.querySelectorAll('rect');
    expect(rects.length).toBe(mockData.length);
  });

  it('renders axes by default', () => {
    render(<BarChart data={mockData} />);
    const svg = screen.getByRole('img', { hidden: true });
    const axes = svg.querySelectorAll('.domain');
    expect(axes.length).toBe(2); // Expecting both x and y axes lines
  });

  it('does not render axes when showXAxis and showYAxis are false', () => {
    render(<BarChart data={mockData} showXAxis={false} showYAxis={false} />);
    const svg = screen.getByRole('img', { hidden: true });
    const axes = svg.querySelectorAll('.domain');
    expect(axes.length).toBe(0);
  });

  it('applies a single color to all bars', () => {
    render(<BarChart data={mockData} color="blue" />);
    const svg = screen.getByRole('img', { hidden: true });
    const rects = svg.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect).toHaveAttribute('fill', 'blue');
    });
  });

  it('applies an array of colors to bars cyclically', () => {
    const colors = ['red', 'green', 'blue'];
    render(<BarChart data={mockData} color={colors} />);
    const svg = screen.getByRole('img', { hidden: true });
    const rects = svg.querySelectorAll('rect');
    rects.forEach((rect, index) => {
      expect(rect).toHaveAttribute('fill', colors[index % colors.length]);
    });
  });

  it('applies gradient fill to bars when gradientColors are provided', () => {
    render(<BarChart data={mockData} gradientColors={['#ff0000', '#00ff00']} />);
    const svg = screen.getByRole('img', { hidden: true });
    const rects = svg.querySelectorAll('rect');
    rects.forEach((rect) => {
      expect(rect.getAttribute('fill')).toMatch(/url\(#barGradient\)/);
    });
    expect(svg.querySelector('defs linearGradient#barGradient')).toBeInTheDocument();
  });

  it('renders axis text with specified colors', () => {
    render(<BarChart data={mockData} xAxisTextColor="#ff0000" yAxisTextColor="#00ff00" />);
    const texts = screen.getByRole('img', { hidden: true }).querySelectorAll('text');
    let hasXAxisColor = false;
    let hasYAxisColor = false;
    const expectedXColor = '#ff0000'; // Updated to hex
    const expectedYColor = '#00ff00'; // Updated to hex

    texts.forEach((text) => {
      const computedFill = window.getComputedStyle(text).getPropertyValue('fill');
      if (computedFill === expectedXColor) {
        hasXAxisColor = true;
      }
      if (computedFill === expectedYColor) {
        hasYAxisColor = true;
      }
    });

    expect(hasXAxisColor).toBe(true);
    expect(hasYAxisColor).toBe(true);
  });

  it('shows grid lines when showGridLines is true', () => {
    render(<BarChart data={mockData} showGridLines={true} />);
    const svg = screen.getByRole('img', { hidden: true });
    // Grid lines are typically lines within a 'g' element with class 'grid'
    const gridLines = svg.querySelectorAll('.grid line');
    expect(gridLines.length).toBeGreaterThan(0);
  });

  it('does not show grid lines when showGridLines is false', () => {
    render(<BarChart data={mockData} showGridLines={false} />);
    const svg = screen.getByRole('img', { hidden: true });
    const gridLines = svg.querySelectorAll('.grid line');
    expect(gridLines.length).toBe(0);
  });

  it('renders with default dimensions when responsive is false', () => {
    const defaultWidth = 600;
    const defaultHeight = 400;
    render(
      <BarChart data={mockData} responsive={false} width={defaultWidth} height={defaultHeight} />,
    );
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toHaveAttribute('width', String(defaultWidth));
    expect(svgElement).toHaveAttribute('height', String(defaultHeight));
  });

  it('renders and attempts to be responsive initially', () => {
    const mockContainerWidth = 500;
    const mockHeight = 300;
    const mockWidth = 600;

    const mockRef = { current: document.createElement('div') };
    Object.defineProperty(mockRef.current, 'clientWidth', { get: () => mockContainerWidth });

    vi.spyOn(React, 'useRef').mockReturnValueOnce(mockRef); // Mock containerRef
    vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: null }); // Mock svgRef
    vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: null }); // Mock tooltipRef

    render(<BarChart data={mockData} responsive={true} width={mockWidth} height={mockHeight} />);
    const svgElement = screen.getByRole('img', { hidden: true });

    expect(svgElement).toHaveAttribute('width', '100%');

    expect(svgElement).toHaveAttribute('height', '100%');
  });

  it('renders an empty SVG when data is empty', () => {
    render(<BarChart data={[]} />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
    const rects = svgElement.querySelectorAll('rect');
    expect(rects.length).toBe(0);
  });

  it('renders bars correctly with zero values', () => {
    const zeroData = [
      { label: 'A', value: 0 },
      { label: 'B', value: 0 },
    ];
    render(<BarChart data={zeroData} />);
    const svg = screen.getByRole('img', { hidden: true });
    const rects = svg.querySelectorAll('rect');
    expect(rects.length).toBe(zeroData.length);
    rects.forEach((rect) => {
      expect(rect).toBeInTheDocument();
    });
  });
});
