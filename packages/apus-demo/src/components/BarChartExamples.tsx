import React from 'react';
import { BarChart } from 'apus';

type BarChartExamplesProps = {
  isDarkMode: boolean;
};

const BarChartExamples: React.FC<BarChartExamplesProps> = ({ isDarkMode }) => {
  // Sample data for bar charts
  const barChartData1 = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 },
  ];

  const barChartData2 = [
    { label: 'Q1', value: 40 },
    { label: 'Q2', value: 60 },
    { label: 'Q3', value: 30 },
  ];

  const gradientBarData = [
    { label: 'Mon', value: 20 },
    { label: 'Tue', value: 40 },
    { label: 'Wed', value: 30 },
    { label: 'Thu', value: 70 },
    { label: 'Fri', value: 50 },
    { label: 'Sat', value: 80 },
    { label: 'Sun', value: 60 },
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
          Bar Chart with Legend
        </h3>
        <BarChart
          data={barChartData1}
          width={400}
          height={300}
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
          Customized Bar Chart with Right Legend
        </h3>
        <BarChart
          data={barChartData2}
          width={400}
          height={300}
          color={['#3b82f6', '#10b981', '#f59e0b']}
          margin={{ top: 30, right: 80, bottom: 50, left: 50 }}
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
          Bar Chart (Axis Styling)
        </h3>
        <BarChart
          data={barChartData1}
          width={400}
          height={300}
          showXAxis={false}
          yAxisTicks={3}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
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
          Bar Chart (Tooltip Styling)
        </h3>
        <BarChart
          data={barChartData2}
          width={400}
          height={300}
          tooltipBackgroundColor={isDarkMode ? '#f87171' : '#ef4444'}
          tooltipTextColor={'#ffffff'}
          tooltipPadding={'6px 10px'}
          tooltipBorderRadius={'3px'}
          tooltipFontSize={'11px'}
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
          Vibrant Gradient Bar Chart
        </h3>
        <BarChart
          data={gradientBarData}
          width={400}
          height={300}
          gradientColors={['#06b6d4', '#8b5cf6', '#ec4899']}
          showGridLines={true}
          yAxisTicks={5}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          tooltipBackgroundColor={isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
        />
      </div>
    </>
  );
};

export default BarChartExamples;
