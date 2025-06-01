import React, { useState } from 'react';
import { StackedBarChart } from '../../lib';

interface StackedBarChartExamplesProps {
  isDarkMode: boolean;
}

// Sample data for different chart examples
const monthlySalesData = [
  { month: 'Jan', Electronics: 120, Clothing: 90, Groceries: 150, Books: 75 },
  { month: 'Feb', Electronics: 150, Clothing: 85, Groceries: 140, Books: 80 },
  { month: 'Mar', Electronics: 180, Clothing: 120, Groceries: 160, Books: 90 },
  { month: 'Apr', Electronics: 200, Clothing: 150, Groceries: 180, Books: 100 },
  { month: 'May', Electronics: 170, Clothing: 110, Groceries: 170, Books: 85 },
];

const quarterlyRevenueData = [
  { quarter: 'Q1', ProductA: 250, ProductB: 180, ProductC: 120, ProductD: 90 },
  { quarter: 'Q2', ProductA: 280, ProductB: 200, ProductC: 150, ProductD: 100 },
  { quarter: 'Q3', ProductA: 220, ProductB: 160, ProductC: 180, ProductD: 110 },
  { quarter: 'Q4', ProductA: 300, ProductB: 220, ProductC: 130, ProductD: 120 },
];

const projectStatusData = [
  { task: 'Task 1', Design: 20, Development: 30, Testing: 10, Deployment: 5 },
  { task: 'Task 2', Design: 15, Development: 40, Testing: 15, Deployment: 10 },
  { task: 'Task 3', Design: 25, Development: 20, Testing: 20, Deployment: 15 },
  { task: 'Task 4', Design: 10, Development: 35, Testing: 25, Deployment: 20 },
];

const negativeValuesData = [
  { category: 'Jan', 'Series A': 120, 'Series B': -30, 'Series C': 70 },
  { category: 'Feb', 'Series A': 100, 'Series B': -20, 'Series C': 50 },
  { category: 'Mar', 'Series A': 150, 'Series B': -50, 'Series C': 80 },
  { category: 'Apr', 'Series A': 90, 'Series B': -15, 'Series C': 40 },
];

const StackedBarChartExamples: React.FC<StackedBarChartExamplesProps> = ({ isDarkMode }) => {
  // State for toggling visibility of data series
  const [visibleKeys1, setVisibleKeys1] = useState<string[]>([
    'Electronics',
    'Clothing',
    'Groceries',
    'Books',
  ]);
  const [visibleKeys2, setVisibleKeys2] = useState<string[]>([
    'ProductA',
    'ProductB',
    'ProductC',
    'ProductD',
  ]);
  const [visibleKeys3, setVisibleKeys3] = useState<string[]>([
    'Design',
    'Development',
    'Testing',
    'Deployment',
  ]);
  const [visibleKeys4, setVisibleKeys4] = useState<string[]>(['Series A', 'Series B', 'Series C']);
  const [visibleKeysHorizontal, setVisibleKeysHorizontal] = useState<string[]>([
    'Electronics',
    'Clothing',
    'Groceries',
    'Books',
  ]);

  // Colors for the charts
  const colors1 = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
  const colors2 = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
  const colors3 = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

  // Chart styles
  const tooltipBg = isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipText = isDarkMode ? '#e2e8f0' : '#1e293b';

  const smallMargins = { top: 40, right: 30, bottom: 60, left: 50 };

  // Custom Tooltip Component
  interface CustomTooltipProps {
    data: { id: string; value: number; indexValue: string };
    color: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ data, color }) => {
    if (!data) return null;

    const { id, value, indexValue } = data;

    return (
      <div
        style={{
          padding: '8px',
          minWidth: '120px',
          backgroundColor: tooltipBg,
          color: tooltipText,
          borderRadius: '4px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '4px', color: color }}>
          {id}: {value}
        </div>
        <div style={{ fontSize: '0.9em' }}>Category: {indexValue}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Monthly Sales by Category
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={monthlySalesData}
            keys={['Electronics', 'Clothing', 'Groceries', 'Books']}
            indexBy="month"
            margin={smallMargins}
            colors={colors1}
            showLegend={true}
            legendPosition="bottom"
            legendFontSize="12px"
            legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
            showGridLines={true}
            showValues={true}
            valuesFontSize="12px"
            valuesFontColor="white"
            barCornerRadius={4}
            barOpacity={0.9}
            xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            tooltipBackgroundColor={tooltipBg}
            tooltipTextColor={tooltipText}
            visibleKeys={visibleKeys1}
            setVisibleKeys={setVisibleKeys1}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Quarterly Revenue by Product
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={quarterlyRevenueData}
            keys={['ProductA', 'ProductB', 'ProductC', 'ProductD']}
            indexBy="quarter"
            margin={smallMargins}
            colors={colors2}
            showLegend={true}
            legendPosition="right"
            legendFontSize="12px"
            legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
            showGridLines={true}
            showValues={true}
            valuesFontSize="12px"
            valuesFontColor="white"
            barCornerRadius={4}
            barOpacity={0.9}
            xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            tooltipBackgroundColor={tooltipBg}
            tooltipTextColor={tooltipText}
            visibleKeys={visibleKeys2}
            setVisibleKeys={setVisibleKeys2}
          />
        </div>
      </div>

      {/* Example 3: Project Timeline (Horizontal) */}
      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Project Timeline (Weeks)
        </h3>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] min-h-[300px]">
            <StackedBarChart
              data={projectStatusData}
              keys={['Design', 'Development', 'Testing', 'Deployment']}
              indexBy="task"
              margin={smallMargins}
              colors={colors3}
              showLegend={true}
              legendPosition="bottom"
              legendFontSize="12px"
              legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
              showGridLines={true}
              showValues={true}
              valuesFontSize="12px"
              valuesFontColor="white"
              barCornerRadius={4}
              barOpacity={0.9}
              xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
              yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
              axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
              tooltipBackgroundColor={tooltipBg}
              tooltipTextColor={tooltipText}
              visibleKeys={visibleKeys3}
              setVisibleKeys={setVisibleKeys3}
            />
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Stacked Bar Chart with Negative Values
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={negativeValuesData}
            keys={['Series A', 'Series B', 'Series C']}
            indexBy="category"
            margin={smallMargins}
            colors={['#4CAF50', '#FFC107', '#F44336']}
            showLegend={true}
            legendPosition="bottom"
            legendFontSize="12px"
            legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
            showGridLines={true}
            showValues={true}
            valuesFontSize="12px"
            valuesFontColor="white"
            barCornerRadius={4}
            barOpacity={0.9}
            xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            tooltipBackgroundColor={tooltipBg}
            tooltipTextColor={tooltipText}
            visibleKeys={visibleKeys4}
            setVisibleKeys={setVisibleKeys4}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Minimalist Design (No Axes, Grid, or Legend)
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={monthlySalesData}
            keys={['Electronics', 'Clothing', 'Groceries', 'Books']}
            indexBy="month"
            margin={smallMargins}
            colors={colors1}
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            showLegend={false}
            showValues={true}
            valuesFontColor={isDarkMode ? '#e0e0e0' : '#111827'}
            barCornerRadius={2}
            tooltipBackgroundColor={tooltipBg}
            tooltipTextColor={tooltipText}
            ariaLabel="Minimalist monthly sales data by category"
            visibleKeys={visibleKeys1}
            setVisibleKeys={setVisibleKeys1}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Stacked Bar Chart with Custom Tooltip
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={monthlySalesData}
            keys={['Electronics', 'Clothing', 'Groceries', 'Books']}
            indexBy="month"
            margin={smallMargins}
            colors={colors1}
            showLegend={true}
            legendPosition="bottom"
            legendFontSize="12px"
            legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
            showGridLines={true}
            showValues={true}
            valuesFontSize="12px"
            valuesFontColor="white"
            barCornerRadius={4}
            barOpacity={0.9}
            xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            tooltipComponent={CustomTooltip}
            visibleKeys={visibleKeys1}
            setVisibleKeys={setVisibleKeys1}
          />
        </div>
      </div>

      <div
        className={`rounded-xl p-6 border w-full ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
      >
        <h3
          className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
        >
          Horizontal Stacked Bar Chart
        </h3>
        <div className="w-full min-h-[400px]">
          <StackedBarChart
            data={monthlySalesData}
            keys={['Electronics', 'Clothing', 'Groceries', 'Books']}
            indexBy={'month'}
            layout="horizontal"
            margin={smallMargins}
            colors={['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']}
            showXAxis
            showYAxis
            showGridLines
            showLegend
            legendPosition="bottom"
            legendFontSize="12px"
            legendFontColor={isDarkMode ? '#cccccc' : '#666666'}
            barCornerRadius={4}
            showValues
            valuesFontColor={isDarkMode ? '#e0e0e0' : '#111827'}
            xAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
            axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
            tooltipBackgroundColor={tooltipBg}
            tooltipTextColor={tooltipText}
            visibleKeys={visibleKeysHorizontal}
            setVisibleKeys={setVisibleKeysHorizontal}
            animationDuration={750}
            ariaLabel="Horizontal stacked bar chart example"
          />
        </div>
      </div>
    </div>
  );
};

export default StackedBarChartExamples;
