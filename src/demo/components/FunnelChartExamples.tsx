import React, { useState } from 'react';
import { FunnelChart } from '../../lib';
import {
  FunnelData,
  TimeSeriesFunnelData,
  SegmentedFunnelStage,
} from '../../lib/FunnelChart/types';
import TimeSeriesFunnelChart from '../../lib/FunnelChart/TimeSeriesFunnelChart';
import SegmentedFunnelChart from '../../lib/FunnelChart/SegmentedFunnelChart';

interface FunnelChartExamplesProps {
  isDarkMode: boolean;
}

const sampleData: FunnelData[] = [
  { label: 'Website Visits', value: 10000 },
  { label: 'Sign-ups', value: 5000 },
  { label: 'Free Trials', value: 2000 },
  { label: 'Paid Subscriptions', value: 500 },
];

const customColorsData: FunnelData[] = [
  { label: 'Leads', value: 1000, color: '#FF6B6B' },
  { label: 'Qualified', value: 800, color: '#4ECDC4' },
  { label: 'Proposals', value: 500, color: '#45B7D1' },
  { label: 'Negotiations', value: 200, color: '#96CEB4' },
  { label: 'Closed', value: 100, color: '#FFEEAD' },
];

const sampleTimeSeriesData: TimeSeriesFunnelData[] = [
  {
    periodLabel: 'Day 1 (2023-01-01)',
    data: [
      { label: 'Visits', value: 1000, color: '#4287f5' },
      { label: 'Sign-ups', value: 500, color: '#f5a442' },
      { label: 'Purchases', value: 100, color: '#87f542' },
    ],
  },
  {
    periodLabel: 'Day 2 (2023-01-02)',
    data: [
      { label: 'Visits', value: 1200, color: '#4287f5' },
      { label: 'Sign-ups', value: 600, color: '#f5a442' },
      { label: 'Purchases', value: 150, color: '#87f542' },
    ],
  },
  {
    periodLabel: 'Day 3 (2023-01-03)',
    data: [
      { label: 'Visits', value: 900, color: '#4287f5' },
      { label: 'Sign-ups', value: 400, color: '#f5a442' },
      { label: 'Purchases', value: 80, color: '#87f542' },
    ],
  },
];

const sampleSegmentedData: SegmentedFunnelStage[] = [
  {
    label: 'Website Visits',
    segments: [
      {
        channel: 'Organic',
        value: 5000,
        color: '#4287f5',
        trend: {
          value: 5000,
          previousValue: 4500,
          change: 500,
          changePercentage: 11.1,
        },
        historicalData: [
          { timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 4500 },
          { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 4600 },
          { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 4700 },
          { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 4800 },
          { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 4900 },
          { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 4950 },
          { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 5000 },
        ],
        analytics: {
          performance: {
            conversionRate: 50,
            averageValue: 4750,
            peakValue: 5000,
            trend: {
              value: 5000,
              previousValue: 4500,
              change: 500,
              changePercentage: 11.1,
            },
          },
          contribution: {
            percentageOfTotal: 50,
            relativeToPrevious: 110,
          },
          correlation: {
            correlationScore: 0.85,
            relatedSegments: [
              { segmentId: 'paid', correlationValue: 0.75 },
              { segmentId: 'referral', correlationValue: 0.65 },
            ],
          },
        },
      },
      {
        channel: 'Paid',
        value: 3000,
        color: '#f5a442',
        trend: {
          value: 3000,
          previousValue: 3200,
          change: -200,
          changePercentage: -6.25,
        },
        historicalData: [
          { timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 3200 },
          { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 3150 },
          { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 3100 },
          { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 3080 },
          { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 3050 },
          { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 3020 },
          { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 3000 },
        ],
        analytics: {
          performance: {
            conversionRate: 30,
            averageValue: 3080,
            peakValue: 3200,
            trend: {
              value: 3000,
              previousValue: 3200,
              change: -200,
              changePercentage: -6.25,
            },
          },
          contribution: {
            percentageOfTotal: 30,
            relativeToPrevious: 93.75,
          },
          correlation: {
            correlationScore: 0.75,
            relatedSegments: [
              { segmentId: 'organic', correlationValue: 0.75 },
              { segmentId: 'referral', correlationValue: 0.55 },
            ],
          },
        },
      },
      {
        channel: 'Referral',
        value: 2000,
        color: '#87f542',
        trend: {
          value: 2000,
          previousValue: 1800,
          change: 200,
          changePercentage: 11.1,
        },
        historicalData: [
          { timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, value: 1800 },
          { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 1850 },
          { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 1900 },
          { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 1920 },
          { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 1950 },
          { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 1980 },
          { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 2000 },
        ],
        analytics: {
          performance: {
            conversionRate: 20,
            averageValue: 1920,
            peakValue: 2000,
            trend: {
              value: 2000,
              previousValue: 1800,
              change: 200,
              changePercentage: 11.1,
            },
          },
          contribution: {
            percentageOfTotal: 20,
            relativeToPrevious: 111.1,
          },
          correlation: {
            correlationScore: 0.65,
            relatedSegments: [
              { segmentId: 'organic', correlationValue: 0.65 },
              { segmentId: 'paid', correlationValue: 0.55 },
            ],
          },
        },
      },
    ],
  },
  {
    label: 'Sign-ups',
    segments: [
      { channel: 'Organic', value: 2500, color: '#4287f5' },
      { channel: 'Paid', value: 1500, color: '#f5a442' },
      { channel: 'Referral', value: 1000, color: '#87f542' },
    ],
  },
  {
    label: 'Free Trials',
    segments: [
      { channel: 'Organic', value: 1000, color: '#4287f5' },
      { channel: 'Paid', value: 600, color: '#f5a442' },
      { channel: 'Referral', value: 400, color: '#87f542' },
    ],
  },
  {
    label: 'Paid Subscriptions',
    segments: [
      { channel: 'Organic', value: 200, color: '#4287f5' },
      { channel: 'Paid', value: 200, color: '#f5a442' },
      { channel: 'Referral', value: 100, color: '#87f542' },
    ],
  },
];

// Add new sample data for different scenarios
const marketingFunnelData: SegmentedFunnelStage[] = [
  {
    label: 'Impressions',
    segments: [
      {
        channel: 'Social',
        value: 100000,
        color: '#FF6B6B',
        trend: {
          value: 100000,
          previousValue: 90000,
          change: 10000,
          changePercentage: 11.1,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 90000 + i * 1500,
        })),
        analytics: {
          performance: {
            conversionRate: 2.5,
            averageValue: 95000,
            peakValue: 100000,
            trend: {
              value: 100000,
              previousValue: 90000,
              change: 10000,
              changePercentage: 11.1,
            },
          },
          contribution: {
            percentageOfTotal: 40,
            relativeToPrevious: 110,
          },
          correlation: {
            correlationScore: 0.92,
            relatedSegments: [
              { segmentId: 'search', correlationValue: 0.85 },
              { segmentId: 'email', correlationValue: 0.78 },
            ],
          },
        },
      },
      {
        channel: 'Search',
        value: 80000,
        color: '#4ECDC4',
        trend: {
          value: 80000,
          previousValue: 75000,
          change: 5000,
          changePercentage: 6.7,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 75000 + i * 800,
        })),
        analytics: {
          performance: {
            conversionRate: 3.2,
            averageValue: 77500,
            peakValue: 80000,
            trend: {
              value: 80000,
              previousValue: 75000,
              change: 5000,
              changePercentage: 6.7,
            },
          },
          contribution: {
            percentageOfTotal: 32,
            relativeToPrevious: 106.7,
          },
          correlation: {
            correlationScore: 0.85,
            relatedSegments: [
              { segmentId: 'social', correlationValue: 0.85 },
              { segmentId: 'email', correlationValue: 0.72 },
            ],
          },
        },
      },
      {
        channel: 'Email',
        value: 70000,
        color: '#45B7D1',
        trend: {
          value: 70000,
          previousValue: 65000,
          change: 5000,
          changePercentage: 7.7,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 65000 + i * 700,
        })),
        analytics: {
          performance: {
            conversionRate: 4.1,
            averageValue: 67500,
            peakValue: 70000,
            trend: {
              value: 70000,
              previousValue: 65000,
              change: 5000,
              changePercentage: 7.7,
            },
          },
          contribution: {
            percentageOfTotal: 28,
            relativeToPrevious: 107.7,
          },
          correlation: {
            correlationScore: 0.78,
            relatedSegments: [
              { segmentId: 'social', correlationValue: 0.78 },
              { segmentId: 'search', correlationValue: 0.72 },
            ],
          },
        },
      },
    ],
  },
  {
    label: 'Clicks',
    segments: [
      {
        channel: 'Social',
        value: 2500,
        color: '#FF6B6B',
        trend: {
          value: 2500,
          previousValue: 2200,
          change: 300,
          changePercentage: 13.6,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 2200 + i * 40,
        })),
        analytics: {
          performance: {
            conversionRate: 2.5,
            averageValue: 2350,
            peakValue: 2500,
            trend: {
              value: 2500,
              previousValue: 2200,
              change: 300,
              changePercentage: 13.6,
            },
          },
          contribution: {
            percentageOfTotal: 35,
            relativeToPrevious: 113.6,
          },
          correlation: {
            correlationScore: 0.88,
            relatedSegments: [
              { segmentId: 'search', correlationValue: 0.82 },
              { segmentId: 'email', correlationValue: 0.75 },
            ],
          },
        },
      },
      {
        channel: 'Search',
        value: 2560,
        color: '#4ECDC4',
        trend: {
          value: 2560,
          previousValue: 2400,
          change: 160,
          changePercentage: 6.7,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 2400 + i * 25,
        })),
        analytics: {
          performance: {
            conversionRate: 3.2,
            averageValue: 2480,
            peakValue: 2560,
            trend: {
              value: 2560,
              previousValue: 2400,
              change: 160,
              changePercentage: 6.7,
            },
          },
          contribution: {
            percentageOfTotal: 36,
            relativeToPrevious: 106.7,
          },
          correlation: {
            correlationScore: 0.82,
            relatedSegments: [
              { segmentId: 'social', correlationValue: 0.82 },
              { segmentId: 'email', correlationValue: 0.7 },
            ],
          },
        },
      },
      {
        channel: 'Email',
        value: 2870,
        color: '#45B7D1',
        trend: {
          value: 2870,
          previousValue: 2600,
          change: 270,
          changePercentage: 10.4,
        },
        historicalData: Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 24 * 60 * 60 * 1000,
          value: 2600 + i * 35,
        })),
        analytics: {
          performance: {
            conversionRate: 4.1,
            averageValue: 2735,
            peakValue: 2870,
            trend: {
              value: 2870,
              previousValue: 2600,
              change: 270,
              changePercentage: 10.4,
            },
          },
          contribution: {
            percentageOfTotal: 29,
            relativeToPrevious: 110.4,
          },
          correlation: {
            correlationScore: 0.75,
            relatedSegments: [
              { segmentId: 'social', correlationValue: 0.75 },
              { segmentId: 'search', correlationValue: 0.7 },
            ],
          },
        },
      },
    ],
  },
];

const FunnelChartExamples: React.FC<FunnelChartExamplesProps> = ({ isDarkMode }) => {
  const [selectedSegment, setSelectedSegment] = useState<FunnelData | null>(null);
  const [selectedTimeSeriesLegend, setSelectedTimeSeriesLegend] = useState<FunnelData | null>(null);
  const [selectedSegmentedLegend, setSelectedSegmentedLegend] = useState<FunnelData | null>(null);

  const handleSliceClick = (data: FunnelData) => {
    setSelectedSegment(data);
    console.log('Clicked segment:', data);
  };

  const handleTimeSeriesLegendClick = (data: FunnelData | null) => {
    setSelectedTimeSeriesLegend(data);
    console.log('Time Series Legend item clicked:', data);
  };

  const handleSegmentedLegendClick = (data: FunnelData | null) => {
    setSelectedSegmentedLegend(data);
    console.log('Segmented Legend item clicked:', data);
  };

  const toLocaleStringValueFormat = (value: number) => value.toLocaleString();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: isDarkMode ? '#e2e8f0' : '#1a202c', marginBottom: '30px' }}>
        Funnel Chart Examples
      </h2>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Basic Funnel Chart
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <FunnelChart
            data={sampleData}
            width={600}
            height={400}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            showLegend={true}
            legendPosition="bottom"
            legendTitle="Funnel Stages"
            legendItemColor={isDarkMode ? '#e2e8f0' : '#333'}
            legendTitleColor={isDarkMode ? '#94a3b8' : '#64748b'}
            margin={{ top: 20, right: 20, bottom: 30, left: 180 }}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.3)"
            segmentShadowBlur={8}
            segmentShadowOffsetY={10}
          />
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Custom Colors Funnel Chart
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <FunnelChart
            data={customColorsData}
            width={600}
            height={400}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            showLegend={true}
            legendPosition="right"
            legendTitle="Lead Status"
            legendItemColor={isDarkMode ? '#e2e8f0' : '#333'}
            legendTitleColor={isDarkMode ? '#94a3b8' : '#64748b'}
            margin={{ top: 20, right: 20, bottom: 30, left: 180 }}
            enableGradients={true}
            gradientDirection="horizontal"
            segmentShadowColor="rgba(0, 0, 0, 0.4)"
            segmentShadowBlur={10}
            segmentShadowOffsetX={5}
            segmentShadowOffsetY={5}
          />
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Interactive Funnel Chart
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <FunnelChart
            data={sampleData}
            width={600}
            height={400}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            onSliceClick={handleSliceClick}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            showLegend={true}
            legendPosition="bottom"
            legendTitle="Funnel Stages (Interactive)"
            clickableLegend={true}
            onLegendItemClick={handleSegmentedLegendClick}
            legendItemColor={isDarkMode ? '#e2e8f0' : '#333'}
            legendTitleColor={isDarkMode ? '#94a3b8' : '#64748b'}
            margin={{ top: 20, right: 20, bottom: 30, left: 180 }}
            segmentShadowColor="rgba(0, 100, 255, 0.2)"
            segmentShadowBlur={6}
            segmentShadowOffsetY={6}
          />
          {selectedSegment && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                background: isDarkMode ? '#2d3748' : '#f7fafc',
                borderRadius: '4px',
                fontSize: '14px',
                color: isDarkMode ? '#e2e8f0' : '#4a5568',
              }}
            >
              Selected: {selectedSegment.label} - {toLocaleStringValueFormat(selectedSegment.value)}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Compact Funnel Chart
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <FunnelChart
            data={sampleData}
            width={400}
            height={300}
            margin={{ top: 10, right: 10, bottom: 20, left: 150 }}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.25)"
            segmentShadowBlur={4}
            segmentShadowOffsetY={4}
          />
        </div>
      </div>

      {/* Time Series Funnel Chart with Legend */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Time Series Funnel Chart with Legend
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <TimeSeriesFunnelChart
            seriesData={sampleTimeSeriesData}
            chartWidth={300}
            chartHeight={250}
            spacing={30}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            isDarkMode={isDarkMode}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.2)"
            segmentShadowBlur={5}
            segmentShadowOffsetY={5}
            showLegend={true}
            legendPosition="bottom"
            clickableLegend={true}
            onLegendItemClick={handleTimeSeriesLegendClick}
          />
          {selectedTimeSeriesLegend && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                background: isDarkMode ? '#2d3748' : '#f7fafc',
                borderRadius: '4px',
                fontSize: '14px',
                color: isDarkMode ? '#e2e8f0' : '#4a5568',
              }}
            >
              Selected Time Series Legend: {selectedTimeSeriesLegend.label} -{' '}
              {toLocaleStringValueFormat(selectedTimeSeriesLegend.value)}
            </div>
          )}
        </div>
      </div>

      {/* Segmented Funnel Chart with Legend */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Segmented Funnel Chart with Legend
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <SegmentedFunnelChart
            data={sampleSegmentedData}
            width={800}
            height={500}
            margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            isDarkMode={isDarkMode}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.25)"
            segmentShadowBlur={6}
            segmentShadowOffsetY={6}
            showTrendIndicators={true}
            showMiniCharts={true}
            showAnalytics={true}
            miniChartHeight={40}
            trendIndicatorSize={10}
            analyticsDisplayMode="both"
            showLegend={true}
            legendPosition="bottom"
            clickableLegend={true}
            onLegendItemClick={handleSegmentedLegendClick}
          />
          {selectedSegmentedLegend && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                background: isDarkMode ? '#2d3748' : '#f7fafc',
                borderRadius: '4px',
                fontSize: '14px',
                color: isDarkMode ? '#e2e8f0' : '#4a5568',
              }}
            >
              Selected Segmented Legend: {selectedSegmentedLegend.label} -{' '}
              {toLocaleStringValueFormat(selectedSegmentedLegend.value)}
            </div>
          )}
        </div>
      </div>

      {/* Example with Gradients and Shadows */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Funnel Chart with Gradients & Shadows
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <FunnelChart
            data={customColorsData}
            width={600}
            height={400}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            showLegend={true}
            legendPosition="bottom"
            legendTitle="Gradient & Shadow Demo"
            legendItemColor={isDarkMode ? '#e2e8f0' : '#333'}
            legendTitleColor={isDarkMode ? '#94a3b8' : '#64748b'}
            margin={{ top: 20, right: 20, bottom: 30, left: 180 }}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.4)"
            segmentShadowBlur={15}
            segmentShadowOffsetX={0}
            segmentShadowOffsetY={15}
          />
        </div>
      </div>

      {/* Marketing Funnel Example */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Marketing Funnel Analysis
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <SegmentedFunnelChart
            data={marketingFunnelData}
            width={800}
            height={400}
            margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            isDarkMode={isDarkMode}
            enableGradients={true}
            gradientDirection="vertical"
            segmentShadowColor="rgba(0, 0, 0, 0.25)"
            segmentShadowBlur={6}
            segmentShadowOffsetY={6}
            showTrendIndicators={true}
            showMiniCharts={true}
            showAnalytics={true}
            miniChartHeight={25}
            trendIndicatorSize={10}
            analyticsDisplayMode="both"
          />
        </div>
      </div>

      {/* E-commerce Funnel Example */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          E-commerce Conversion Funnel
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <SegmentedFunnelChart
            data={sampleSegmentedData}
            width={800}
            height={500}
            margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
            showValues={true}
            valueFormat={toLocaleStringValueFormat}
            tooltipBackgroundColor={isDarkMode ? '#cbd5e0' : '#333'}
            tooltipTextColor={isDarkMode ? '#333' : '#cbd5e0'}
            isDarkMode={isDarkMode}
            enableGradients={true}
            gradientDirection="horizontal"
            segmentShadowColor="rgba(0, 0, 0, 0.25)"
            segmentShadowBlur={6}
            segmentShadowOffsetY={6}
            showTrendIndicators={true}
            showMiniCharts={true}
            showAnalytics={true}
            miniChartHeight={30}
            trendIndicatorSize={12}
            analyticsDisplayMode="tooltip"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSliceClick={(data) => {
              // console.log('Clicked segment:', data);
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onLegendItemClick={(data) => {
              // console.log('Legend item clicked:', data);
            }}
          />
        </div>
      </div>

      {/* Compact Analytics View */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568', marginBottom: '15px' }}>
          Compact Analytics View
        </h3>
        <div
          style={{
            margin: '20px 0',
            padding: '20px',
            border: `1px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
            borderRadius: '8px',
            background: isDarkMode ? '#1a202c' : 'white',
          }}
        >
          <SegmentedFunnelChart
            data={marketingFunnelData}
            width={700}
            height={450}
            enableGradients
            gradientDirection="vertical"
            showTrendIndicators
            showMiniCharts={false}
            showAnalytics
            analyticsDisplayMode="inline"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSliceClick={(data) => {
              // console.log('Clicked segment:', data);
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onLegendItemClick={(data) => {
              // console.log('Legend item clicked:', data);
            }}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default FunnelChartExamples;
