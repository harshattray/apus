import React from 'react';
import { LineChart } from 'apus';

type LineChartExamplesProps = {
  isDarkMode: boolean;
};

const LineChartExamples: React.FC<LineChartExamplesProps> = ({ isDarkMode }) => {
  // Sample data for line charts
  const lineChartData1 = [
    {
      name: 'Series 1',
      values: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 40 },
        { label: 'Mar', value: 35 },
        { label: 'Apr', value: 50 },
        { label: 'May', value: 45 },
        { label: 'Jun', value: 60 },
      ],
    },
  ];

  const lineChartData2 = [
    {
      name: 'Series 2',
      values: [
        { label: 'Jan', value: 20 },
        { label: 'Feb', value: 35 },
        { label: 'Mar', value: 25 },
        { label: 'Apr', value: 40 },
        { label: 'May', value: 30 },
        { label: 'Jun', value: 45 },
      ],
    },
  ];

  const multiLineData = [
    {
      name: 'Series 1',
      values: [
        { label: 'Jan', value: 50 },
        { label: 'Feb', value: 60 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 65 },
      ],
    },
    {
      name: 'Series 2',
      values: [
        { label: 'Jan', value: 80 },
        { label: 'Feb', value: 70 },
        { label: 'Mar', value: 85 },
        { label: 'Apr', value: 90 },
        { label: 'May', value: 88 },
      ],
    },
  ];

  const multiLineNoAreaData = [
    {
      name: 'Revenue',
      values: [
        { label: 'Jan', value: 50 },
        { label: 'Feb', value: 60 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 65 },
      ],
    },
    {
      name: 'Expenses',
      values: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 40 },
        { label: 'Mar', value: 35 },
        { label: 'Apr', value: 50 },
        { label: 'May', value: 45 },
      ],
    },
  ];

  const gradientLineData = [
    {
      name: 'Gradient Series',
      values: [
        { label: 'Mon', value: 20 },
        { label: 'Tue', value: 40 },
        { label: 'Wed', value: 30 },
        { label: 'Thu', value: 70 },
        { label: 'Fri', value: 50 },
        { label: 'Sat', value: 80 },
        { label: 'Sun', value: 60 },
      ],
    },
  ];

  return (
    <>
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Multi-series Line Chart with Legend
        </h3>
        <LineChart
          data={multiLineData}
          width={400}
          height={300}
          showGridLines={true}
          lineColors={['#3b82f6', '#f59e0b']}
          showLegend={true}
          legendPosition="right"
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Basic Line Chart
        </h3>
        <LineChart
          data={lineChartData1}
          width={400}
          height={300}
          areaColor="rgba(59, 130, 246, 0.1)"
          showLegend={true}
          legendPosition="bottom"
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Gradient Line Chart
        </h3>
        <LineChart
          data={lineChartData2}
          width={400}
          height={300}
          areaGradientColors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0)']}
          showGridLines={true}
          yAxisTicks={7}
          tooltipBackgroundColor="rgba(30, 41, 59, 0.9)"
          tooltipTextColor="#fff"
          tooltipPadding="8px"
          tooltipBorderRadius="6px"
          tooltipFontSize="13px"
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Minimal Line Chart
        </h3>
        <LineChart
          data={lineChartData1}
          width={400}
          height={300}
          areaColor="rgba(245, 158, 11, 0.1)"
          lineColors={'#f59e0b'}
          showXAxis={false}
          showYAxis={false}
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Multi-series with Points
        </h3>
        <LineChart
          data={multiLineData}
          width={400}
          height={300}
          lineColors={['#3b82f6', '#10b981']}
          pointColor="#fff"
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Gradient Line
        </h3>
        <LineChart
          data={gradientLineData}
          width={400}
          height={300}
          lineGradientColors={['#3b82f6', '#6366f1']}
          areaColor="rgba(99, 102, 241, 0.1)"
          pointColor="#6366f1"
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Multi-series without Area
        </h3>
        <LineChart
          data={multiLineNoAreaData}
          width={400}
          height={300}
          showArea={false}
          lineColors={['#3b82f6', '#f59e0b']}
          pointColor="#fff"
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
          showLegend={true}
          legendPosition="top"
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
        />
      </div>
    </>
  );
};

export default LineChartExamples;
