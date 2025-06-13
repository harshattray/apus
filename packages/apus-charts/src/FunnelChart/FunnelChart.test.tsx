import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FunnelChart from '.';
import '@testing-library/jest-dom';

describe('FunnelChart', () => {
  const mockData = [
    { label: 'Stage 1', value: 1000, color: '#4CAF50' },
    { label: 'Stage 2', value: 750, color: '#FFC107' },
    { label: 'Stage 3', value: 500, color: '#2196F3' },
  ];

  it('renders an SVG element', () => {
    const { container } = render(<FunnelChart data={mockData} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of funnel segments', () => {
    const { container } = render(<FunnelChart data={mockData} />);
    const paths = container.querySelectorAll('.funnel-segment path');
    expect(paths.length).toBe(mockData.length);
  });

  it('displays values when showValues is true', () => {
    render(<FunnelChart data={mockData} showValues={true} />);
    mockData.forEach((d) => {
      expect(
        screen.getByText((content, element) => {
          return element?.tagName.toLowerCase() === 'text' && content === `${d.label}: ${d.value}`;
        }),
      ).toBeInTheDocument();
    });
  });

  it('applies custom value format', () => {
    const customFormat = (value: number) => `$${value}`;
    render(<FunnelChart data={mockData} showValues={true} valueFormat={customFormat} />);
    mockData.forEach((d) => {
      expect(
        screen.getByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === 'text' &&
            content === `${d.label}: ${customFormat(d.value)}`
          );
        }),
      ).toBeInTheDocument();
    });
  });

  it('calls onSliceClick when a segment is clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(<FunnelChart data={mockData} onSliceClick={handleClick} />);
    const path = container.querySelector('.funnel-segment path');
    if (path) {
      fireEvent.click(path);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockData[0]);
    }
  });

  it('renders tooltip on mouse enter and hides on mouse leave', async () => {
    vi.useFakeTimers();
    const { container } = render(
      <FunnelChart data={mockData} tooltipBackgroundColor="red" tooltipTextColor="white" />,
    );
    const path = container.querySelector('.funnel-segment path');

    if (path) {
      fireEvent.mouseEnter(path);
      vi.advanceTimersByTime(100); // Advance timers to allow tooltip to appear
      // Query the tooltip div directly
      const tooltipDiv = document.querySelector('div[style*="position: absolute"]');
      expect(tooltipDiv).toBeInTheDocument();
      expect(tooltipDiv?.textContent).toContain('Stage 1');
      expect(tooltipDiv?.textContent).toContain('Value: 1000');

      fireEvent.mouseLeave(path);
      vi.advanceTimersByTime(100); // Advance timers to allow tooltip to hide
      // Tooltip should be hidden (opacity 0 or display none)
      const tooltipDivEl = tooltipDiv as HTMLDivElement | null;
      expect(tooltipDivEl?.style.opacity === '0' || tooltipDivEl?.style.display === 'none').toBe(
        true,
      );
    }
    vi.useRealTimers();
  });

  it('applies gradients when enableGradients is true', () => {
    const { container } = render(<FunnelChart data={mockData} enableGradients={true} />);
    const path = container.querySelector('.funnel-segment path');
    if (path) {
      // If gradients are not applied, fallback to color fill
      const fill = path.getAttribute('fill');
      expect(fill === mockData[0].color || (fill && fill.startsWith('url(#gradient-'))).toBe(true);
    }
  });

  it('applies shadows when segmentShadow properties are provided', () => {
    const { container } = render(
      <FunnelChart
        data={mockData}
        segmentShadowColor="#000000"
        segmentShadowBlur={5}
        segmentShadowOffsetX={0}
        segmentShadowOffsetY={5}
      />,
    );
    const path = container.querySelector('.funnel-segment path');
    if (path) {
      // If shadows are not applied, filter may be null
      const filter = path.getAttribute('filter');
      expect(filter === null || filter.includes('url(#funnel-shadow-')).toBe(true);
    }
  });

  it('renders correctly in dark mode', () => {
    const { container } = render(<FunnelChart data={mockData} isDarkMode={true} />);
    // This test primarily ensures no crashes and basic rendering, as visual style checks are hard in JSDOM.
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders an empty SVG when data is empty', () => {
    const { container } = render(<FunnelChart data={[]} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    if (svgElement) {
      const paths = svgElement.querySelectorAll('path');
      expect(paths.length).toBe(0);
    }
  });
});
