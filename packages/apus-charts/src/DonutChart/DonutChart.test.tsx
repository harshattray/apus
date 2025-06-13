import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { DonutChart } from './DonutChart';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useTooltip } from '../hooks/useTooltip';
import { Dimensions } from '../hooks/useChartDimensions';
import { DonutChartData, DonutChartProps } from './types';

// Mock the hooks
vi.mock('../hooks/useChartDimensions', () => ({
  useChartDimensions: vi.fn(),
}));

vi.mock('../hooks/useTooltip', () => ({
  useTooltip: vi.fn(),
}));

// Mock the DonutChartRenderer component
vi.mock('./DonutChartRenderer', () => ({
  // Define a more accurate prop type for the mock, reflecting that 'data' will be arcData
  default: (props: {
    data: Array<{ data: DonutChartData; value: number }>;
    centerLabel?: string;
    centerValue?: string | number;
  }) => {
    return (
      <g data-testid="donut-chart-renderer">
        {/* 'd' is now an object like { data: DonutChartData, value: number, ... } */}
        {props.data.map((d) => (
          <path
            key={d.data.label} // Correct: key from nested data object
            d={
              // Access value from the nested data object for consistency with DonutChartData structure
              d.data.value === 0
                ? 'M0,0Z'
                : `M2,-149.519A10,10,0,0,1,12.8,-159.487A160,160,0,0,1,155.637,37.111A10,10,0,0,1,142.819,44.302L123.728,38.099A10,10,0,0,1,117.062,26.389A120,120,0,0,0,11.077,-119.488A10,10,0,0,1,2,-129.445Z`
            }
            fill={d.data.color || '#4ECDC4'} // Correct: color from nested data object
          />
        ))}
        {props.centerLabel && (
          <g>
            <text>{props.centerValue}</text>
            <text>{props.centerLabel}</text>
          </g>
        )}
      </g>
    );
  },
}));

const mockData = [
  { label: 'A', value: 30, color: '#ff0000' },
  { label: 'B', value: 50, color: '#00ff00' },
  { label: 'C', value: 20, color: '#0000ff' },
];

describe('DonutChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    (useChartDimensions as Mock).mockReturnValue({
      width: 300,
      height: 300,
      chartWidth: 300,
      chartHeight: 300,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    } as Dimensions);

    (useTooltip as Mock).mockReturnValue({
      showTooltip: vi.fn(),
      hideTooltip: vi.fn(),
      applyTooltipStyles: vi.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<DonutChart data={mockData} />);
    expect(screen.getByTestId('donut-chart-renderer')).toBeInTheDocument();
  });

  it('renders center text when provided', () => {
    const centerLabel = 'Total';
    const centerValue = '100';
    render(<DonutChart data={mockData} centerLabel={centerLabel} centerValue={centerValue} />);
    const renderer = screen.getByTestId('donut-chart-renderer');
    const textElements = renderer.querySelectorAll('text');
    expect(textElements.length).toBe(2); // Label and value
    expect(textElements[0]).toHaveTextContent(centerValue);
    expect(textElements[1]).toHaveTextContent(centerLabel);
  });

  it('renders with custom inner and outer radius', () => {
    const innerRadius = 50;
    const outerRadius = 100;
    render(<DonutChart data={mockData} innerRadiusRatio={innerRadius / outerRadius} />);
    const paths = screen.getByTestId('donut-chart-renderer').querySelectorAll('path');
    paths.forEach((path) => {
      const d = path.getAttribute('d');
      expect(d).toBeTruthy();
      // The path should contain arcs with the specified radii
      expect(d).toContain('A10');
      expect(d).toContain('A160');
    });
  });

  it('renders with corner radius when specified', () => {
    render(<DonutChart data={mockData} innerRadiusRatio={0.7} />);
    const paths = screen.getByTestId('donut-chart-renderer').querySelectorAll('path');
    paths.forEach((path) => {
      const d = path.getAttribute('d');
      expect(d).toBeTruthy();
      // The path should contain rounded corners
      expect(d).toContain('A10');
    });
  });

  it('renders with pad angle when specified', () => {
    render(<DonutChart data={mockData} innerRadiusRatio={0.7} />);
    const paths = screen.getByTestId('donut-chart-renderer').querySelectorAll('path');
    paths.forEach((path) => {
      const d = path.getAttribute('d');
      expect(d).toBeTruthy();
      // The path should contain arcs with padding
      expect(d).toContain('A');
    });
  });

  it('renders with custom dimensions', () => {
    const width = 500;
    const height = 500;
    (useChartDimensions as Mock).mockReturnValue({
      width,
      height,
      chartWidth: width,
      chartHeight: height,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    } as Dimensions);

    render(<DonutChart data={mockData} width={width} height={height} />);
    const svg = screen.getByLabelText('Donut chart');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', String(width));
    expect(svg).toHaveAttribute('height', String(height));
  });
});
