import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimeSeriesFunnelChart from './TimeSeriesFunnelChart';
import '@testing-library/jest-dom';

describe('TimeSeriesFunnelChart', () => {
  const mockSeriesData = [
    {
      periodLabel: 'Jan 2023',
      data: [
        { label: 'Stage 1', value: 100, color: 'red' },
        { label: 'Stage 2', value: 50, color: 'blue' },
      ],
    },
    {
      periodLabel: 'Feb 2023',
      data: [
        { label: 'Stage 1', value: 120, color: 'red' },
        { label: 'Stage 2', value: 60, color: 'blue' },
      ],
    },
  ];

  it('renders the correct number of individual funnel charts', () => {
    const { container } = render(<TimeSeriesFunnelChart seriesData={mockSeriesData} />);
    const funnelCharts = container.querySelectorAll('h3'); // Check for titles, assuming each chart has one
    expect(funnelCharts.length).toBe(mockSeriesData.length);
  });

  it('displays chart titles for each period', () => {
    render(<TimeSeriesFunnelChart seriesData={mockSeriesData} />);
    mockSeriesData.forEach((series) => {
      expect(screen.getByText(series.periodLabel)).toBeInTheDocument();
    });
  });

  it('passes props down to individual FunnelChart components', () => {
    const chartWidth = 250;
    const chartHeight = 200;
    const { container } = render(
      <TimeSeriesFunnelChart
        seriesData={mockSeriesData}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        showValues={true}
      />,
    );

    const svgElements = container.querySelectorAll('svg');
    svgElements.forEach((svg) => {
      expect(svg).toHaveAttribute('width', String(chartWidth));
      expect(svg).toHaveAttribute('height', String(chartHeight));
    });

    mockSeriesData.forEach((series) => {
      series.data.forEach((d) => {
        expect(
          screen.getByText((content, element) => {
            return (
              element?.tagName.toLowerCase() === 'text' && content === `${d.label}: ${d.value}`
            );
          }),
        ).toBeInTheDocument();
      });
    });
  });

  it('calls onSliceClick when a segment is clicked in an individual chart', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <TimeSeriesFunnelChart seriesData={mockSeriesData} onSliceClick={handleClick} />,
    );
    // Find the first segment of the first chart
    const firstSegmentPath = container.querySelector(
      '#funnel-chart-container-0 .funnel-segment path',
    ); // Assuming an ID for containers
    if (firstSegmentPath) {
      fireEvent.click(firstSegmentPath);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockSeriesData[0].data[0]);
    }
  });

  it('applies custom value format to individual charts', () => {
    const customFormat = (value: number) => `Value: ${value}`;
    render(
      <TimeSeriesFunnelChart
        seriesData={mockSeriesData}
        showValues={true}
        valueFormat={customFormat}
      />,
    );
    mockSeriesData.forEach((series) => {
      series.data.forEach((d) => {
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
  });

  it('renders an empty div when seriesData is empty', () => {
    render(<TimeSeriesFunnelChart seriesData={[]} />);
    const chartsContainer = screen.getByTestId('charts-container');
    expect(chartsContainer).toBeEmptyDOMElement();
  });
});
