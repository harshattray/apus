import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RangeChart } from '.';
import '@testing-library/jest-dom';

describe('RangeChart', () => {
  const mockData = [
    { day: 'Wed', range1: { min: 120, max: 140 }, range2: { min: 70, max: 90 } },
    { day: 'Thu', range1: { min: 115, max: 135 }, range2: { min: 65, max: 85 } },
    { day: 'Fri', range1: { min: 125, max: 145 }, range2: { min: 75, max: 95 } },
  ];

  it('renders an SVG element', () => {
    const { container } = render(<RangeChart data={mockData} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of range groups', () => {
    const { container } = render(<RangeChart data={mockData} />);
    const rangeGroups = container.querySelectorAll('.range-group');
    expect(rangeGroups.length).toBe(mockData.length);
  });

  it('renders axes by default', () => {
    const { container } = render(<RangeChart data={mockData} />);
    const axes = container.querySelectorAll('.domain');
    expect(axes.length).toBe(2);
  });

  it('does not render axes when showXAxis and showYAxis are false', () => {
    const { container } = render(
      <RangeChart data={mockData} showXAxis={false} showYAxis={false} />,
    );
    const axes = container.querySelectorAll('.domain');
    expect(axes.length).toBe(0);
  });

  it('applies custom colors to the ranges', () => {
    const { container } = render(<RangeChart data={mockData} color1="#ff0000" color2="#00ff00" />);
    const range1Circles = container.querySelectorAll('circle[fill="#ff0000"]');
    const range2Circles = container.querySelectorAll('circle[fill="#00ff00"]');
    expect(range1Circles.length).toBe(mockData.length * 2);
    expect(range2Circles.length).toBe(mockData.length * 2);
  });

  it('shows grid lines when showGridLines is true', () => {
    const { container } = render(<RangeChart data={mockData} showGridLines={true} />);
    const gridLines = container.querySelectorAll('.grid-line');
    expect(gridLines.length).toBeGreaterThan(0);
  });

  it('does not show grid lines when showGridLines is false', () => {
    const { container } = render(<RangeChart data={mockData} showGridLines={false} />);
    const gridLines = container.querySelectorAll('.grid-line');
    expect(gridLines.length).toBe(0);
  });

  it('renders with default dimensions when responsive is false', () => {
    const { container } = render(<RangeChart data={mockData} responsive={false} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '600');
    expect(svgElement).toHaveAttribute('height', '400');
  });

  it('renders an empty SVG when data is empty', () => {
    const { container } = render(<RangeChart data={[]} />);
    const rangeGroups = container.querySelectorAll('.range-group');
    expect(rangeGroups.length).toBe(0);
  });

  it('shows a tooltip on mouseover', () => {
    const { container, getByText } = render(<RangeChart data={mockData} />);
    const tooltipArea = container.querySelector('.range-group rect[pointer-events="all"]');
    if (tooltipArea) {
      fireEvent.mouseOver(tooltipArea);
      expect(getByText('Wed', { selector: 'strong' })).toBeInTheDocument();
      expect(getByText(/Sys: \d+ mmHg/)).toBeInTheDocument();
      expect(getByText(/Dia: \d+ mmHg/)).toBeInTheDocument();
    }
  });
});
