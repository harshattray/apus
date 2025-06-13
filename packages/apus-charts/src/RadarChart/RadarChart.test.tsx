import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import RadarChart from './RadarChart';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { useTooltip } from '../hooks/useTooltip';
import { Dimensions } from '../hooks/useChartDimensions';
import { RadarChartRendererProps, RadarChartSeries } from './types';

// Mock the hooks
vi.mock('../hooks/useChartDimensions', () => ({
  useChartDimensions: vi.fn(),
}));

vi.mock('../hooks/useTooltip', () => ({
  useTooltip: vi.fn(),
}));

// Mock the RadarChartRenderer component
vi.mock('./RadarChartRenderer', () => ({
  RadarChartRenderer: (props: RadarChartRendererProps) => {
    return (
      <g data-testid="radar-chart-renderer">
        {props.showGrid && <g data-testid="grid-lines" />}
        {props.showAxesLabels && <g data-testid="axis-labels" />}
        {props.data.map((series: RadarChartSeries) => (
          <g key={series.name} data-testid={`series-${series.name}`}>
            <path data-testid={`path-${series.name}`} />
          </g>
        ))}
      </g>
    );
  },
}));

const mockData = [
  {
    name: 'Series 1',
    color: '#FF0000',
    dataPoints: [
      { axis: 'A', value: 10 },
      { axis: 'B', value: 20 },
      { axis: 'C', value: 30 },
    ],
  },
];

const mockAxesLabels = ['A', 'B', 'C'];

describe('RadarChart', () => {
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
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} />);
    expect(screen.getByRole('graphics-document')).toBeInTheDocument();
  });

  it('renders with correct dimensions when size prop is provided', () => {
    const size = 400;
    (useChartDimensions as Mock).mockReturnValue({
      width: size,
      height: size,
      chartWidth: size,
      chartHeight: size,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    } as Dimensions);

    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} size={size} />);
    const svg = screen.getByRole('graphics-document');
    expect(svg).toHaveAttribute('width', String(size));
    expect(svg).toHaveAttribute('height', String(size));
  });

  it('shows error message when data is empty', () => {
    render(<RadarChart data={[]} axesLabels={mockAxesLabels} />);
    expect(
      screen.getByText('RadarChart: Insufficient data or axes labels provided.'),
    ).toBeInTheDocument();
  });

  it('shows error message when axes labels are empty', () => {
    render(<RadarChart data={mockData} axesLabels={[]} />);
    expect(
      screen.getByText('RadarChart: Insufficient data or axes labels provided.'),
    ).toBeInTheDocument();
  });

  it('renders grid lines when showGrid is true', () => {
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} showGrid={true} />);
    expect(screen.getByTestId('grid-lines')).toBeInTheDocument();
  });

  it('renders axis labels when showAxesLabels is true', () => {
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} showAxesLabels={true} />);
    expect(screen.getByTestId('axis-labels')).toBeInTheDocument();
  });

  it('renders series paths for each data series', () => {
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} />);
    mockData.forEach((series) => {
      expect(screen.getByTestId(`series-${series.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`path-${series.name}`)).toBeInTheDocument();
    });
  });

  it('applies custom className to the container', () => {
    const className = 'custom-radar-chart';
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} className={className} />);
    expect(screen.getByRole('graphics-document')).toHaveClass(className);
  });

  it('handles responsive prop correctly', () => {
    render(<RadarChart data={mockData} axesLabels={mockAxesLabels} responsive={true} />);
    const container = screen.getByTestId('radar-chart-container');
    expect(container).toHaveStyle({ width: '100%', height: '100%' });
  });

  it('handles non-responsive prop correctly', () => {
    const size = 300;
    render(
      <RadarChart data={mockData} axesLabels={mockAxesLabels} responsive={false} size={size} />,
    );
    const container = screen.getByRole('graphics-document').parentElement;
    expect(container).toHaveStyle({ width: `${size}px`, height: `${size}px` });
  });
});
