import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import RadarChart from './RadarChart';
import type { RadarChartSeries } from './types';
import type { RadarChartRendererProps } from './RadarChartRenderer';

// Mock RadarChartRenderer to inspect props passed to it
const mockRadarChartRenderer = vi.fn();
vi.mock('./RadarChartRenderer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./RadarChartRenderer')>();
  return {
    ...actual,
    default: (props: RadarChartRendererProps) => {
      mockRadarChartRenderer(props);
      return <g data-testid="mock-radar-chart-renderer" />;
    },
  };
});

// Mock data for tests
const mockAxesLabels = ['Combat', 'Durability', 'Intelligence', 'Power', 'Speed', 'Strength'];
const mockRadarChartData: RadarChartSeries[] = [
  {
    name: 'Hero A',
    color: 'rgba(255, 99, 132, 0.7)',
    dataPoints: [
      { axis: 'Combat', value: 80 },
      { axis: 'Durability', value: 70 },
      { axis: 'Intelligence', value: 90 },
      { axis: 'Power', value: 100 },
      { axis: 'Speed', value: 75 },
      { axis: 'Strength', value: 60 },
    ],
  },
  {
    name: 'Hero B',
    color: 'rgba(54, 162, 235, 0.7)',
    dataPoints: [
      { axis: 'Combat', value: 70 },
      { axis: 'Durability', value: 95 },
      { axis: 'Intelligence', value: 75 },
      { axis: 'Power', value: 80 },
      { axis: 'Speed', value: 90 },
      { axis: 'Strength', value: 85 },
    ],
  },
];

// Mock ResizeObserver - JSDOM doesn't have it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Define mocks for tooltip functions at a higher scope
const mockShowTooltip = vi.fn();
const mockHideTooltip = vi.fn();
const mockTooltipRef = React.createRef<HTMLDivElement>();

// Mock the useTooltip hook
vi.mock('../hooks/useTooltip', () => ({
  useTooltip: vi.fn(() => ({
    showTooltip: mockShowTooltip,
    hideTooltip: mockHideTooltip,
    tooltipRef: mockTooltipRef,
  })),
}));

describe('RadarChart', () => {
  beforeEach(() => {
    mockShowTooltip.mockClear();
    mockHideTooltip.mockClear();
    mockRadarChartRenderer.mockClear();
  });

  const defaultProps = {
    data: mockRadarChartData,
    axesLabels: mockAxesLabels,
    size: 300,
    maxValue: 100,
  };

  it('renders without crashing', () => {
    render(<RadarChart {...defaultProps} />);
    const svgElement = screen.getByRole('graphics-document', { name: /radar chart/i });
    expect(svgElement).toBeInTheDocument();
  });

  it('renders the correct number of series paths', () => {
    render(<RadarChart {...defaultProps} />);
    const seriesPaths = screen.getAllByTestId(/^series-path-/);
    expect(seriesPaths.length).toBe(mockRadarChartData.length);
    expect(screen.getByTestId(`series-path-${mockRadarChartData[0].name}`)).toBeInTheDocument();
  });

  describe('Grid Lines', () => {
    it('renders grid lines by default', () => {
      render(<RadarChart {...defaultProps} levels={3} />);
      const gridCircles = screen.getAllByTestId(/^grid-level-/);
      expect(gridCircles.length).toBe(3);
    });

    it('does not render grid lines when showGrid is false', () => {
      render(<RadarChart {...defaultProps} showGrid={false} />);
      const gridCircles = screen.queryAllByTestId(/^grid-level-/);
      expect(gridCircles.length).toBe(0);
    });

    it('renders grid lines with specified style (e.g., dashed)', () => {
      render(<RadarChart {...defaultProps} gridLineStyle="dashed" levels={1} />);
      const gridCircle = screen.getByTestId('grid-level-0');
      expect(gridCircle).toHaveAttribute('stroke-dasharray', '4,4');
    });
  });

  describe('Axis Labels', () => {
    it('renders axis labels by default', () => {
      render(<RadarChart {...defaultProps} />);
      mockAxesLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('does not render axis labels when showAxesLabels is false', () => {
      render(<RadarChart {...defaultProps} showAxesLabels={false} />);
      mockAxesLabels.forEach((label) => {
        expect(screen.queryByText(label)).not.toBeInTheDocument();
      });
    });
  });

  describe('Axis Lines', () => {
    it('renders radial axis lines by default', () => {
      render(<RadarChart {...defaultProps} />);
      // Assuming axis lines are <line> elements with a specific key or testid pattern
      const axisLines = screen.getAllByTestId(/^axis-line-/); // Requires data-testid="axis-line-{i}"
      expect(axisLines.length).toBe(mockAxesLabels.length);
    });

    it('does not render radial axis lines when showAxisLines is false', () => {
      render(<RadarChart {...defaultProps} showAxisLines={false} />);
      const axisLines = screen.queryAllByTestId(/^axis-line-/);
      expect(axisLines.length).toBe(0);
    });
  });

  describe('Tooltip Interactions', () => {
    it('shows tooltip on hover target mouse enter and hides on mouse leave', async () => {
      render(<RadarChart {...defaultProps} />);
      const seriesName = mockRadarChartData[0].name;
      const axisLabel = mockAxesLabels[0];
      const dataPoint = mockRadarChartData[0].dataPoints.find((dp) => dp.axis === axisLabel)!;

      const hoverTarget = screen.getByTestId(`hover-target-${seriesName}-${axisLabel}`);
      expect(hoverTarget).toBeInTheDocument();

      fireEvent.mouseEnter(hoverTarget);

      await vi.waitFor(() => {
        expect(mockShowTooltip).toHaveBeenCalledTimes(1);
      });

      const expectedContent = `<strong>${axisLabel}</strong>: ${dataPoint.value}<br /><em>${seriesName}</em>`;
      expect(mockShowTooltip).toHaveBeenCalledWith(
        expectedContent,
        expect.any(Number),
        expect.any(Number),
        10,
        10,
      );

      fireEvent.mouseLeave(hoverTarget);
      await vi.waitFor(() => {
        expect(mockHideTooltip).toHaveBeenCalledTimes(1);
      });
    });

    it('uses custom tooltipFormat function if provided', async () => {
      const customTooltipFormat = vi.fn(
        (data) => `Custom: ${data.seriesName} - ${data.axisLabel}: ${data.value}`,
      );
      render(<RadarChart {...defaultProps} tooltipFormat={customTooltipFormat} />);

      const seriesName = mockRadarChartData[0].name;
      const axisLabel = mockAxesLabels[0];
      const dataPoint = mockRadarChartData[0].dataPoints.find((dp) => dp.axis === axisLabel)!;

      const hoverTarget = screen.getByTestId(`hover-target-${seriesName}-${axisLabel}`);
      fireEvent.mouseEnter(hoverTarget);

      await vi.waitFor(() => {
        expect(customTooltipFormat).toHaveBeenCalledWith(
          expect.objectContaining({
            seriesName: seriesName,
            axisLabel: axisLabel,
            value: dataPoint.value,
            color: mockRadarChartData[0].color,
          }),
        );
      });

      const expectedCustomContent = `Custom: ${seriesName} - ${axisLabel}: ${dataPoint.value}`;
      await vi.waitFor(() => {
        expect(mockShowTooltip).toHaveBeenCalledWith(
          expectedCustomContent,
          expect.any(Number),
          expect.any(Number),
          10,
          10,
        );
      });

      expect(customTooltipFormat).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hover Points', () => {
    it('does not render hover points by default (showHoverPoints is false)', () => {
      render(<RadarChart {...defaultProps} />); // showHoverPoints is undefined, defaults to false
      const hoverPoints = screen.queryAllByTestId(/^visible-hover-point-/);
      expect(hoverPoints.length).toBe(0);
    });

    it('renders hover points with default styles when showHoverPoints is true', () => {
      render(<RadarChart {...defaultProps} showHoverPoints={true} />);
      const seriesCount = mockRadarChartData.length;
      const axesCount = mockAxesLabels.length;
      const hoverPoints = screen.getAllByTestId(/^visible-hover-point-/);
      expect(hoverPoints.length).toBe(seriesCount * axesCount);

      // Check default styles for the first point of the first series
      const firstSeries = mockRadarChartData[0];
      const firstAxis = mockAxesLabels[0];
      const firstPoint = screen.getByTestId(`visible-hover-point-${firstSeries.name}-${firstAxis}`);
      expect(firstPoint).toHaveAttribute('r', '4'); // Default radius
      expect(firstPoint).toHaveAttribute('fill', firstSeries.color); // Default fill from series color
      expect(firstPoint).toHaveAttribute('stroke', 'none'); // Default stroke
    });

    it('renders hover points with custom styles when showHoverPoints is true', () => {
      const customProps = {
        ...defaultProps,
        showHoverPoints: true,
        hoverPointRadius: 6,
        hoverPointFill: 'red',
        hoverPointStroke: 'blue',
      };
      render(<RadarChart {...customProps} />);
      const seriesCount = mockRadarChartData.length;
      const axesCount = mockAxesLabels.length;
      const hoverPoints = screen.getAllByTestId(/^visible-hover-point-/);
      expect(hoverPoints.length).toBe(seriesCount * axesCount);

      const firstSeries = mockRadarChartData[0];
      const firstAxis = mockAxesLabels[0];
      const firstPoint = screen.getByTestId(`visible-hover-point-${firstSeries.name}-${firstAxis}`);
      expect(firstPoint).toHaveAttribute('r', '6');
      expect(firstPoint).toHaveAttribute('fill', 'red');
      expect(firstPoint).toHaveAttribute('stroke', 'blue');
    });

    it('does not render hover points when showHoverPoints is explicitly false, even with styling props', () => {
      const customProps = {
        ...defaultProps,
        showHoverPoints: false,
        hoverPointRadius: 6,
        hoverPointFill: 'red',
        hoverPointStroke: 'blue',
      };
      render(<RadarChart {...customProps} />);
      const hoverPoints = screen.queryAllByTestId(/^visible-hover-point-/);
      expect(hoverPoints.length).toBe(0);
    });
  });

  describe('Series Visual Effects (Shadow and Glow)', () => {
    let useIdSpy: ReturnType<typeof vi.spyOn>;
    let idCounter: number;

    beforeEach(() => {
      idCounter = 0;
      // Spy on React.useId to return predictable IDs for testing filters
      useIdSpy = vi.spyOn(React, 'useId').mockImplementation(() => `:test-id-${idCounter++}:`);
    });

    afterEach(() => {
      useIdSpy.mockRestore(); // Restore original React.useId
    });

    it('applies series shadow filter when enableSeriesShadow is true and glow is false', () => {
      render(<RadarChart {...defaultProps} enableSeriesShadow={true} enableSeriesGlow={false} />);
      const seriesName = mockRadarChartData[0].name;
      const seriesPath = screen.getByTestId(`series-path-${seriesName}`);

      // React.useId calls: 1 for shadowSuffix, 1 for glowSuffix
      const expectedShadowFilterId = 'radar-series-shadow-filter-:test-id-0:';
      expect(seriesPath).toHaveAttribute('filter', `url(#${expectedShadowFilterId})`);

      const filterElement = document.getElementById(expectedShadowFilterId);
      expect(filterElement).toBeInTheDocument();
      expect(filterElement?.tagName.toLowerCase()).toBe('filter');
      expect(filterElement?.querySelector('feDropShadow')).toBeInTheDocument();
    });

    it('applies series glow filter when enableSeriesGlow is true and shadow is false', () => {
      render(<RadarChart {...defaultProps} enableSeriesGlow={true} enableSeriesShadow={false} />);
      const seriesName = mockRadarChartData[0].name;
      const seriesPath = screen.getByTestId(`series-path-${seriesName}`);

      // React.useId calls: 1 for shadowSuffix, 1 for glowSuffix
      const expectedGlowFilterId = 'radar-series-glow-filter-:test-id-1:';
      expect(seriesPath).toHaveAttribute('filter', `url(#${expectedGlowFilterId})`);

      const filterElement = document.getElementById(expectedGlowFilterId);
      expect(filterElement).toBeInTheDocument();
      expect(filterElement?.tagName.toLowerCase()).toBe('filter');
      expect(filterElement?.querySelector('feGaussianBlur')).toBeInTheDocument();
    });

    it('applies glow filter if both enableSeriesShadow and enableSeriesGlow are true (glow takes precedence)', () => {
      render(<RadarChart {...defaultProps} enableSeriesShadow={true} enableSeriesGlow={true} />);
      const seriesName = mockRadarChartData[0].name;
      const seriesPath = screen.getByTestId(`series-path-${seriesName}`);

      const expectedGlowFilterId = 'radar-series-glow-filter-:test-id-1:';
      expect(seriesPath).toHaveAttribute('filter', `url(#${expectedGlowFilterId})`);
      const glowFilterElement = document.getElementById(expectedGlowFilterId);
      expect(glowFilterElement).toBeInTheDocument();

      const shadowFilterId = 'radar-series-shadow-filter-:test-id-0:';
      const shadowFilterElement = document.getElementById(shadowFilterId);
      expect(shadowFilterElement).toBeInTheDocument();
    });

    it('does not apply any filter and defines no filters if both are false', () => {
      render(<RadarChart {...defaultProps} enableSeriesShadow={false} enableSeriesGlow={false} />);
      const seriesName = mockRadarChartData[0].name;
      const seriesPath = screen.getByTestId(`series-path-${seriesName}`);

      expect(seriesPath).not.toHaveAttribute('filter');
      expect(
        document.getElementById('radar-series-shadow-filter-:test-id-0:'),
      ).not.toBeInTheDocument();
      expect(
        document.getElementById('radar-series-glow-filter-:test-id-1:'),
      ).not.toBeInTheDocument();
    });
  });

  // TODO: Add tests for maxValue calculation (auto vs manual)

  describe('MaxValue Calculation', () => {
    it('calculates maxValue automatically from data if not provided', () => {
      const dataWithMax100: RadarChartSeries[] = [
        {
          name: 'SeriesA',
          dataPoints: [
            { axis: 'A', value: 50 },
            { axis: 'B', value: 100 },
          ],
        },
      ];
      render(<RadarChart {...defaultProps} data={dataWithMax100} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(100);
    });

    it('uses provided maxValue for scaling', () => {
      render(<RadarChart {...defaultProps} maxValue={150} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(150);
    });

    it('defaults maxValue to 1 if data is empty and no maxValue is provided', () => {
      render(<RadarChart {...defaultProps} data={[]} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(1);
    });

    it('defaults maxValue to 1 if all data values are zero and no maxValue is provided', () => {
      const dataWithAllZeros: RadarChartSeries[] = [
        {
          name: 'SeriesA',
          dataPoints: [
            { axis: 'A', value: 0 },
            { axis: 'B', value: 0 },
          ],
        },
      ];
      render(<RadarChart {...defaultProps} data={dataWithAllZeros} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(1);
    });

    it('defaults maxValue to 1 if all data values are negative and no maxValue is provided', () => {
      const dataWithAllNegative: RadarChartSeries[] = [
        {
          name: 'SeriesA',
          dataPoints: [
            { axis: 'A', value: -10 },
            { axis: 'B', value: -5 },
          ],
        },
      ];
      render(<RadarChart {...defaultProps} data={dataWithAllNegative} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(1);
    });

    it('uses the max value from data if it is positive and greater than 1, when no maxValue is provided', () => {
      const dataWithPositiveMax: RadarChartSeries[] = [
        {
          name: 'SeriesA',
          dataPoints: [
            { axis: 'A', value: 0.5 },
            { axis: 'B', value: 0.2 },
          ],
        },
      ];
      render(<RadarChart {...defaultProps} data={dataWithPositiveMax} />);
      expect(mockRadarChartRenderer).toHaveBeenCalled();
      expect(mockRadarChartRenderer.mock.calls[0][0].maxVal).toBe(1);

      const dataWithMaxGreaterThanOne: RadarChartSeries[] = [
        {
          name: 'SeriesA',
          dataPoints: [
            { axis: 'A', value: 5 },
            { axis: 'B', value: 2 },
          ],
        },
      ];
      render(<RadarChart {...defaultProps} data={dataWithMaxGreaterThanOne} />);
      expect(mockRadarChartRenderer.mock.calls[1][0].maxVal).toBe(5);
    });
  });

  describe('Legend', () => {
    it('does not render legend by default or if showLegend is false', () => {
      render(<RadarChart {...defaultProps} />); // showLegend is false by default in defaultProps or component
      expect(screen.queryByText(mockRadarChartData[0].name)).not.toBeInTheDocument(); // Check for legend item text
      expect(screen.queryByRole('list', { name: /chart legend/i })).not.toBeInTheDocument(); // More semantic query if legend is a list
    });

    it('renders legend with correct items when showLegend is true', () => {
      render(<RadarChart {...defaultProps} showLegend={true} data={mockRadarChartData} />);
      mockRadarChartData.forEach((series) => {
        expect(screen.getByText(series.name)).toBeInTheDocument();
      });
      // Check for swatches (e.g., by role or a data-testid if added)
      const legendItems = screen
        .getAllByText(/.+/)
        .filter((el) => mockRadarChartData.some((s) => s.name === el.textContent));
      expect(legendItems.length).toBe(mockRadarChartData.length);
    });

    it('renders legend title when provided', () => {
      const legendTitleText = 'Player Stats';
      render(<RadarChart {...defaultProps} showLegend={true} legendTitle={legendTitleText} />);
      expect(screen.getByText(legendTitleText)).toBeInTheDocument();
    });

    it('renders correct number of legend swatches', () => {
      render(<RadarChart {...defaultProps} showLegend={true} data={mockRadarChartData} />);
      // Assuming swatches are spans with a specific style or class, or a data-testid
      // This is a basic check; more specific selectors would be better.
      // For example, if swatches have a data-testid="legend-swatch"
      const legendContainer = screen.getByText(mockRadarChartData[0].name).closest('div'); // Find a legend item
      const swatches = legendContainer?.parentElement?.querySelectorAll(
        'span[style*="border-radius: 50%"]',
      );
      expect(swatches?.length).toBe(mockRadarChartData.length);
    });

    // Note: Testing legendPosition prop's visual effect is complex and better suited for visual regression or E2E tests.
    // We can test that the main container's flex-direction changes if that's how it's implemented.
    // For now, we'll focus on the presence of legend elements.
  });

  describe('Interactive Legend (Clickable & Highlighting)', () => {
    it('does not make legend items clickable if clickableLegend is false or not set', () => {
      render(<RadarChart {...defaultProps} showLegend={true} data={mockRadarChartData} />);
      const legendItem = screen.getByText(mockRadarChartData[0].name);
      // Check if cursor style is not pointer, or if an onClick handler is not effectively present
      // This is a bit indirect; ideally, we'd check for the absence of the click handler logic.
      expect(legendItem).not.toHaveStyle('cursor: pointer');
    });

    it('makes legend items clickable if clickableLegend is true', () => {
      render(
        <RadarChart
          {...defaultProps}
          showLegend={true}
          clickableLegend={true}
          data={mockRadarChartData}
        />,
      );
      const legendItem = screen.getByText(mockRadarChartData[0].name);
      expect(legendItem).toHaveStyle('cursor: pointer');
    });

    it('calls onLegendItemClick with series name when a legend item is clicked', () => {
      const handleClick = vi.fn();
      render(
        <RadarChart
          {...defaultProps}
          showLegend={true}
          clickableLegend={true}
          data={mockRadarChartData}
          onLegendItemClick={handleClick}
        />,
      );
      const legendItem = screen.getByText(mockRadarChartData[0].name);
      fireEvent.click(legendItem);
      expect(handleClick).toHaveBeenCalledWith(mockRadarChartData[0].name);
    });

    it('calls onLegendItemClick with null when a selected legend item is clicked again', () => {
      const handleClick = vi.fn();
      render(
        <RadarChart
          {...defaultProps}
          showLegend={true}
          clickableLegend={true}
          data={mockRadarChartData}
          onLegendItemClick={handleClick}
        />,
      );
      const legendItem = screen.getByText(mockRadarChartData[0].name);
      fireEvent.click(legendItem); // Select
      fireEvent.click(legendItem); // Deselect
      expect(handleClick).toHaveBeenCalledTimes(2);
      expect(handleClick).toHaveBeenLastCalledWith(null);
    });

    it('passes selectedSeriesName and highlight props to RadarChartRenderer', () => {
      const seriesToSelect = mockRadarChartData[0];
      render(
        <RadarChart
          {...defaultProps}
          showLegend={true}
          clickableLegend={true}
          data={mockRadarChartData}
          selectedSeriesFillOpacity={0.9}
          selectedSeriesStrokeWidth={4}
        />,
      );
      const legendItem = screen.getByText(seriesToSelect.name);
      fireEvent.click(legendItem);

      // Check the last call to RadarChartRenderer (it re-renders on state change)
      const rendererProps =
        mockRadarChartRenderer.mock.calls[mockRadarChartRenderer.mock.calls.length - 1][0];
      expect(rendererProps.selectedSeriesName).toBe(seriesToSelect.name);
      expect(rendererProps.selectedSeriesFillOpacity).toBe(0.9);
      expect(rendererProps.selectedSeriesStrokeWidth).toBe(4);
    });

    it('passes null as selectedSeriesName to RadarChartRenderer when deselected', () => {
      const seriesToSelect = mockRadarChartData[0];
      render(
        <RadarChart
          {...defaultProps}
          showLegend={true}
          clickableLegend={true}
          data={mockRadarChartData}
        />,
      );
      const legendItem = screen.getByText(seriesToSelect.name);
      fireEvent.click(legendItem); // Select
      fireEvent.click(legendItem); // Deselect

      const rendererProps =
        mockRadarChartRenderer.mock.calls[mockRadarChartRenderer.mock.calls.length - 1][0];
      expect(rendererProps.selectedSeriesName).toBeNull();
    });
  });
});
