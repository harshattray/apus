import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SegmentedFunnelChart from './SegmentedFunnelChart';
import '@testing-library/jest-dom';
import { SegmentedFunnelChartProps } from './types';

describe('SegmentedFunnelChart', () => {
  const mockData: SegmentedFunnelChartProps['data'] = [
    {
      label: 'Stage 1',
      segments: [
        {
          channel: 'Segment A',
          value: 100,
          color: '#FF0000',
          analytics: {
            performance: {
              conversionRate: 75.5,
              averageValue: 100,
              peakValue: 120,
              trend: { value: 100, previousValue: 80, change: 20, changePercentage: 25 },
            },
            contribution: { percentageOfTotal: 60, relativeToPrevious: 1.2 },
            correlation: { correlationScore: 0.8, relatedSegments: [] },
          },
        },
        { channel: 'Segment B', value: 50, color: '#00FF00' },
      ],
    },
    {
      label: 'Stage 2',
      segments: [
        { channel: 'Segment A', value: 80, color: '#FF0000' },
        { channel: 'Segment B', value: 40, color: '#00FF00' },
      ],
    },
  ];

  const defaultProps: SegmentedFunnelChartProps = {
    data: mockData,
    width: 600,
    height: 400,
    showValues: true,
    onSliceClick: vi.fn(),
    tooltipBackgroundColor: '#ffffff',
    tooltipTextColor: '#000000',
  };

  it('renders an SVG element', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of stages and segments', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const segments = document.querySelectorAll('.funnel-segment');
    // Each stage has 2 segments, and we have 2 stages
    expect(segments.length).toBe(4);
  });

  it('displays stage labels when showValues is true', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    mockData.forEach((stage) => {
      const labelElement = screen.getByText((content) => content.startsWith(`${stage.label}:`));
      expect(labelElement).toBeInTheDocument();
    });
  });

  it('displays segment values when showValues is true', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    mockData.forEach((stage) => {
      const totalValue = stage.segments.reduce((sum, segment) => sum + segment.value, 0);
      const valueElement = screen.getByText(`${stage.label}: ${totalValue}`);
      expect(valueElement).toBeInTheDocument();
    });
  });

  it('calls onSliceClick when a segment is clicked', () => {
    const { container } = render(<SegmentedFunnelChart {...defaultProps} />);
    const svg = container.querySelector('svg');
    const firstSegment = svg?.querySelector('.funnel-segment path');
    if (firstSegment) {
      firstSegment.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(defaultProps.onSliceClick).toHaveBeenCalled();
    }
  });

  it('applies hover effects when mouse enters a segment', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const firstSegment = document.querySelector('.funnel-segment path');
    if (firstSegment) {
      fireEvent.mouseEnter(firstSegment);
      expect(firstSegment).toHaveStyle({ cursor: 'pointer' });
    }
  });

  it('removes hover effects when mouse leaves a segment', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const firstSegment = document.querySelector('.funnel-segment path');
    if (firstSegment) {
      fireEvent.mouseEnter(firstSegment);
      fireEvent.mouseLeave(firstSegment);
      expect(firstSegment).toHaveStyle({ cursor: 'pointer' });
    }
  });

  it('shows tooltip on hover', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const firstSegment = document.querySelector('.funnel-segment path');
    if (firstSegment) {
      fireEvent.mouseEnter(firstSegment);
      const tooltipDiv = document.querySelector('div[style*="position: absolute"]');
      expect(tooltipDiv).toBeInTheDocument();
      expect(tooltipDiv?.textContent).toContain('Stage 1');
    }
  });

  it('hides tooltip when mouse leaves segment', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const firstSegment = document.querySelector('.funnel-segment path');
    if (firstSegment) {
      fireEvent.mouseEnter(firstSegment);
      fireEvent.mouseLeave(firstSegment);
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeInTheDocument();
    }
  });

  it('applies custom colors to segments', () => {
    render(<SegmentedFunnelChart {...defaultProps} />);
    const segments = document.querySelectorAll('.funnel-segment path');
    segments.forEach((segment, index) => {
      const stageIndex = Math.floor(index / 2);
      const segmentIndex = index % 2;
      const expectedColor = mockData[stageIndex].segments[segmentIndex].color;
      expect(segment).toHaveAttribute('fill', expectedColor);
    });
  });

  it('renders trend indicators when showTrendIndicators is true and data is present', () => {
    const trendData = [
      {
        label: 'Stage 1',
        segments: [
          {
            channel: 'Organic',
            value: 500,
            color: '#4CAF50',
            trend: { value: 500, previousValue: 450, change: 50, changePercentage: 11.1 },
          },
        ],
      },
    ];
    const { container } = render(
      <SegmentedFunnelChart data={trendData} showTrendIndicators={true} />,
    );
    expect(container.querySelector('path[fill="#4CAF50"]')).toBeInTheDocument(); // Check for arrow color
  });

  it('renders mini-charts when showMiniCharts is true and historicalData is present', () => {
    const miniChartData = [
      {
        label: 'Stage 1',
        segments: [
          {
            channel: 'Organic',
            value: 500,
            color: '#4CAF50',
            historicalData: [
              { timestamp: Date.now() - 1000, value: 400 },
              { timestamp: Date.now(), value: 500 },
            ],
          },
        ],
      },
    ];
    const { container } = render(
      <SegmentedFunnelChart data={miniChartData} showMiniCharts={true} />,
    );
    expect(container.querySelector('path[fill="none"]')).toBeInTheDocument(); // Check for mini-chart line
  });

  it('renders analytics inline when showAnalytics is true and analyticsDisplayMode is inline', async () => {
    render(
      <SegmentedFunnelChart {...defaultProps} showAnalytics={true} analyticsDisplayMode="inline" />,
    );
    const analyticsGroup = await screen.findByTestId('analytics-group');
    expect(analyticsGroup).toBeInTheDocument();
    expect(analyticsGroup.textContent).toContain('Conv: 75.5%');
  });
});
