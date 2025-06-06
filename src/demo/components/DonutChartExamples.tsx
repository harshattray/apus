import React, { useState } from 'react';
import { DonutChart } from '../../lib';
import { DonutChartData } from '../../lib/DonutChart/types';
import { NestedDonutChart } from '../../lib/NestedDonutChart';
import { GaugeDonutChart } from '../../lib/GaugeDonutChart';

type DonutChartExamplesProps = {
  isDarkMode: boolean;
};

const DonutChartExamples: React.FC<DonutChartExamplesProps> = ({ isDarkMode }) => {
  const data1 = [
    { label: 'Lighting', value: 77 },
    { label: 'Fans', value: 4 },
    { label: 'Pumps', value: 4 },
    { label: 'Cooling', value: 15 },
  ];

  // Example data: Sales Breakdown
  const salesData = [
    { label: 'Sports Equipment Sales', value: 35 },
    { label: 'Virtual Training Sessions', value: 12 },
    { label: 'Athlete Endorsements', value: 5 },
    { label: 'Fitness Merchandise Sales', value: 21 },
    { label: 'Sponsored Events', value: 13 },
  ];

  // Example data: Project Status
  const projectStatusData = [
    { label: 'Completed', value: 60, color: '#10b981' }, // green
    { label: 'In Progress', value: 30, color: '#3b82f6' }, // blue
    { label: 'Pending', value: 10, color: '#fbbf24' }, // amber
  ];

  // Example data: Survey Responses (Yes/No/Maybe)
  const surveyData = [
    { label: 'Yes', value: 150 },
    { label: 'No', value: 80 },
    { label: 'Maybe', value: 30 },
  ];

  // State to hold data of the clicked slice
  const [clickedSliceData, setClickedSliceData] = useState<DonutChartData | null>(null);

  // Data for Nested Donut Chart Example
  const nestedDonutData = [
    [
      { label: 'Category A', value: 30 },
      { label: 'Category B', value: 50 },
      { label: 'Category C', value: 20 },
    ],
    [
      { label: 'Sub A1', value: 15 },
      { label: 'Sub A2', value: 15 },
      { label: 'Sub B1', value: 25 },
      { label: 'Sub B2', value: 25 },
      { label: 'Sub C1', value: 10 },
      { label: 'Sub C2', value: 10 },
    ],
  ];

  const nestedDonutColors = [
    ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    ['#FFE66D', '#1A535C', '#4ECDC4', '#FF6B6B', '#45B7D1', '#96CEB4'],
  ];

  // Data for Gauge Donut Chart Example
  const gaugeDonutData = [
    { label: 'Completed', value: 75, color: '#4ECDC4' },
    { label: 'Remaining', value: 25, color: '#FF6B6B' },
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
          Basic Donut Chart
        </h3>
        <DonutChart
          data={data1}
          width={320}
          height={320}
          showLegend={true}
          legendPosition="bottom"
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          centerLabel="Lighting"
          centerValue={77}
          extraCenterInfo={<span style={{ fontSize: 12 }}>%</span>}
          innerRadiusRatio={0.6}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Donut Chart: Sales Breakdown (Bottom Legend)</h3>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <DonutChart
            data={salesData}
            width={400}
            height={400}
            showLegend={true}
            legendPosition="bottom"
            onSliceClick={(data) => {
              setClickedSliceData(data);
            }}
            legendFontColor={isDarkMode ? '#e2e8f0' : '#1e293b'}
            centerLabel="Total Sales"
            innerRadiusRatio={0.6}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
        style={{ width: 650 }} // Increased container width to ensure legend fits
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Donut Chart: Project Status (Right Legend)
        </h3>
        <DonutChart
          data={projectStatusData}
          width={900}
          height={500}
          showLegend={true}
          legendPosition="right"
          onSliceClick={(data) => {
            setClickedSliceData(data);
          }}
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          centerLabel="Status"
          centerValue="Active"
          innerRadiusRatio={0.6}
        />
        {clickedSliceData && (
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <h4>Clicked Slice Data:</h4>
            <p>
              <strong>Label:</strong> {clickedSliceData.label}
            </p>
            <p>
              <strong>Value:</strong> {clickedSliceData.value}
            </p>
            {clickedSliceData.color && (
              <p>
                <strong>Color:</strong> {clickedSliceData.color}
              </p>
            )}
          </div>
        )}
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Donut Chart: Survey Responses (No Tooltips)
        </h3>
        <DonutChart
          data={surveyData}
          width={320}
          height={320}
          showLegend={true}
          legendPosition="bottom"
          showTooltip={false}
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          centerLabel="Responses"
          centerValue={surveyData.reduce((sum, d) => sum + d.value, 0)}
          innerRadiusRatio={0.6}
        />
      </div>
      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Nested Donut Chart Example
        </h3>
        <div className="chart-container">
          <NestedDonutChart
            levels={nestedDonutData}
            width={400}
            height={400}
            colors={nestedDonutColors}
            centerLabel="Total"
            centerValue="100"
            legendPosition="right"
            theme={isDarkMode ? 'dark' : 'light'}
            onSliceClick={(level, data) => console.log('Clicked:', level, data)}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Donut Chart with Hover Effect
        </h3>
        <DonutChart
          data={salesData}
          width={320}
          height={320}
          showLegend={true}
          legendPosition="bottom"
          showHoverEffect={true}
          legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
          innerRadiusRatio={0.6}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Gauge Donut Chart (Half)
        </h3>
        <div className="chart-container">
          <GaugeDonutChart
            data={gaugeDonutData}
            width={400}
            height={400}
            variant="quarter-top-right"
            centerLabel="Progress"
            centerValue="75%"
            legendPosition="right"
            theme={isDarkMode ? 'dark' : 'light'}
            onSliceClick={(data) => console.log('Clicked:', data)}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border transition-colors duration-200 mt-8 ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Gauge Donut Chart (Quarter)
        </h3>
        <div className="chart-container">
          <GaugeDonutChart
            data={[
              { label: 'Progress', value: 40, color: isDarkMode ? '#fbbf24' : '#f59e42' },
              { label: 'Remaining', value: 60, color: isDarkMode ? '#334155' : '#f3f4f6' },
            ]}
            width={400}
            height={400}
            variant="half-bottom"
            centerLabel="Quarter"
            centerValue="40%"
            legendPosition="right"
            theme={isDarkMode ? 'dark' : 'light'}
            onSliceClick={(data) => console.log('Clicked:', data)}
          />
        </div>
      </div>
    </>
  );
};

export default DonutChartExamples;
