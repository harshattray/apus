import React from 'react';
import { RangeChart } from 'apus';

type RangeChartExamplesProps = {
  isDarkMode: boolean;
};

const RangeChartExamples: React.FC<RangeChartExamplesProps> = ({ isDarkMode }) => {
  const data = [
    { day: 'Wed', range1: { min: 120, max: 140 }, range2: { min: 70, max: 90 } },
    { day: 'Thu', range1: { min: 115, max: 135 }, range2: { min: 65, max: 85 } },
    { day: 'Fri', range1: { min: 125, max: 145 }, range2: { min: 75, max: 95 } },
    { day: 'Sat', range1: { min: 130, max: 150 }, range2: { min: 80, max: 100 } },
    { day: 'Sun', range1: { min: 110, max: 130 }, range2: { min: 60, max: 80 } },
    { day: 'Mon', range1: { min: 135, max: 155 }, range2: { min: 85, max: 105 } },
    { day: 'Tue', range1: { min: 128, max: 148 }, range2: { min: 78, max: 98 } },
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
          Blood Pressure Range Chart
        </h3>
        <RangeChart
          data={data}
          width={500}
          height={300}
          color1="#a78bfa"
          color2="#475569"
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
          Custom Colors
        </h3>
        <RangeChart
          data={data}
          width={500}
          height={300}
          color1="#f472b6"
          color2="#60a5fa"
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
          No Axis or Grid Lines
        </h3>
        <RangeChart
          data={data}
          width={500}
          height={300}
          showXAxis={false}
          showYAxis={false}
          showGridLines={false}
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
          Custom Margins
        </h3>
        <RangeChart
          data={data}
          width={500}
          height={300}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
          axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
        />
      </div>
    </>
  );
};

export default RangeChartExamples;
