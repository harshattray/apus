import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StackedBarChart } from './StackedBarChart'; // Adjust path if needed
import '@testing-library/jest-dom';

describe('StackedBarChart', () => {
  const mockData = [
    { month: 'Jan', ProductA: 100, ProductB: 50, ProductC: 20 },
    { month: 'Feb', ProductA: 120, ProductB: 60, ProductC: 25 },
    { month: 'Mar', ProductA: 150, ProductB: 70, ProductC: 30 },
  ];
  const mockKeys = ['ProductA', 'ProductB', 'ProductC'];
  const mockIndexBy = 'month';

  it('renders an SVG element', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} />,
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of bar groups (stacks)', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      // Each group of stacked bars is typically a <g> element directly under the main chart <g>
      // Or, more simply, count elements that would represent a stack (e.g., based on a class or structure)
      // For stacked charts, each data point (e.g., 'Jan') results in one stack of bars.
      // Each stack contains multiple <rect> elements (one for each key).
      // We expect one <g> per key for the series, and within each, one <rect> per data item.
      // Each group of stacked bars is typically a <g> element directly under the main chart <g>
      // For stacked charts, each data point (e.g., 'Jan') results in one stack of bars.
      // Each stack contains multiple <rect> elements (one for each key).
      // We expect one <g> per key for the series, and within each, one <rect> per data item.
      const barSeriesContainer = svg.querySelector('.bar-series-container');
      expect(barSeriesContainer).toBeInTheDocument();
      if (barSeriesContainer) {
        // Select direct children 'g' elements with a 'fill' attribute within the container
        const seriesGroups = barSeriesContainer.querySelectorAll(':scope > g[fill]');
        expect(seriesGroups.length).toBe(mockKeys.length); // One group per key
        seriesGroups.forEach((group) => {
          const rectsInGroup = group.querySelectorAll('rect');
          expect(rectsInGroup.length).toBe(mockData.length); // One rect per data item in that series
        });
      }
    }
  });

  it('renders axes by default', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    if (svg) {
      const axes = svg.querySelectorAll('.x-axis .domain, .y-axis .domain'); // Select only domains of actual x and y axes
      expect(axes.length).toBe(2); // Expecting both x and y axes lines
    }
  });

  it('renders the legend by default', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} />,
    );
    const legend = container.querySelector('.legend');
    expect(legend).toBeInTheDocument();
  });

  it('renders the correct number of legend items', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} />,
    );
    const legendItems = container.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(mockKeys.length);
  });

  it('does not render legend when showLegend is false', () => {
    const { container } = render(
      <StackedBarChart data={mockData} keys={mockKeys} indexBy={mockIndexBy} showLegend={false} />,
    );
    const legend = container.querySelector('.legend');
    expect(legend).not.toBeInTheDocument();
  });

  // Add more tests: e.g., for tooltip interaction, different layouts, colors, etc.
});
