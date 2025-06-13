import React from 'react';
import { BarChart, LineChart } from 'apus';

type ResponsiveExamplesProps = {
  isDarkMode: boolean;
};

const ResponsiveExamples: React.FC<ResponsiveExamplesProps> = ({ isDarkMode }) => {
  // Sample data for charts
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

  const barChartData = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 },
  ];

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2
          className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}
        >
          Responsive Examples
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h3
              className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Responsive Line Chart
            </h3>
            <LineChart
              data={multiLineData}
              responsive={true}
              lineColors={['#3b82f6', '#10b981']}
              showGridLines={true}
              tooltipBackgroundColor={
                isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'
              }
              tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
              tooltipBorderRadius="6px"
              tooltipPadding="8px"
              showLegend={true}
              legendPosition="top"
              legendFontColor={isDarkMode ? '#e2e8f0' : '#334155'}
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
              Responsive Bar Chart
            </h3>
            <BarChart
              data={barChartData}
              responsive={true}
              color={['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899']}
              tooltipBackgroundColor={
                isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)'
              }
              tooltipTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
              tooltipBorderRadius="6px"
              tooltipPadding="8px"
              showGridLines={true}
              yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
              xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
              axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveExamples;
