import { BarChart, LineChart } from 'src/lib'
import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import apusLogo from '/apus.svg';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const barChartData1 = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
    { label: 'E', value: 30 }
  ];

  const barChartData2 = [
    { label: 'X', value: 5 },
    { label: 'Y', value: 12 },
    { label: 'Z', value: 8 }
  ];

  const lineChartData1 = [
    {
      name: 'Single Series',
      values: [
        { label: 'Jan', value: 100 },
        { label: 'Feb', value: 150 },
        { label: 'Mar', value: 120 },
        { label: 'Apr', value: 200 },
        { label: 'May', value: 180 }
      ]
    }
  ];

  const lineChartData2 = [
    {
      name: 'Numeric Labels',
      values: [
        { label: 1, value: 50 },
        { label: 2, value: 75 },
        { label: 3, value: 60 },
        { label: 4, value: 90 },
        { label: 5, value: 80 },
        { label: 6, value: 100 }
      ]
    }
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
      name: 'Series A',
      values: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 40 },
        { label: 'Apr', value: 55 },
        { label: 'May', value: 50 },
      ],
    },
    {
      name: 'Series B',
      values: [
        { label: 'Jan', value: 60 },
        { label: 'Feb', value: 50 },
        { label: 'Mar', value: 65 },
        { label: 'Apr', value: 70 },
        { label: 'May', value: 68 },
      ],
    },
  ];

  const gradientLineData = [
    {
      name: 'Gradient Series',
      values: [
        { label: 'Jan', value: 10 },
        { label: 'Feb', value: 40 },
        { label: 'Mar', value: 20 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 30 },
        { label: 'Jun', value: 70 },
      ],
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      <header className={`border-b transition-colors duration-200 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src={apusLogo} alt="Apus Logo" className="h-8 w-8 mr-2" />
            <h1 className={`text-2xl font-semibold tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Apus Chart Library</h1>
          </div>
          <div>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Interactive and customizable data visualization components built using D3.js</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDarkMode 
                ? 'hover:bg-slate-800 text-slate-200' 
                : 'hover:bg-slate-100 text-slate-900 light-mode-icon-button bg-white'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-slate-200" />
            ) : (
              <MoonIcon className="w-6 h-6" style={{ fill: 'none', stroke: '#475569' }} />
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Responsive Test Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Responsive Examples</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className={`rounded-xl p-6 border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-slate-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <LineChart 
                  data={multiLineData} 
                  responsive={true}
                  lineColors={['#3b82f6', '#10b981']}
                  showGridLines={true}
                />
              </div>
              <div className={`rounded-xl p-6 border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-slate-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <BarChart 
                  data={barChartData1} 
                  responsive={true}
                  color={['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899']}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-lg font-medium mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Chart Examples</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Default Bar Chart</h3>
              <BarChart data={barChartData1} width={400} height={300} />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Customized Bar Chart</h3>
              <BarChart 
                data={barChartData2} 
                width={400} 
                height={300} 
                color={['#3b82f6', '#10b981', '#f59e0b']}
                margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bar Chart (Axis Styling)</h3>
              <BarChart 
                data={barChartData1} 
                width={400} 
                height={300} 
                showXAxis={false} 
                yAxisTicks={3} 
                yAxisTextColor={isDarkMode ? '#94a3b8' : '#334155'}
                axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bar Chart (Tooltip Styling)</h3>
              <BarChart 
                data={barChartData2} 
                width={400} 
                height={300} 
                tooltipBackgroundColor={isDarkMode ? '#f87171' : '#ef4444'}
                tooltipTextColor={'#ffffff'}
                tooltipPadding={'6px 10px'}
                tooltipBorderRadius={'3px'}
                tooltipFontSize={'11px'}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bar Chart (Gradient)</h3>
              <BarChart 
                data={barChartData1} 
                width={400} 
                height={300} 
                gradientColors={['#3b82f6', '#60a5fa', '#1d4ed8']}
                showGridLines={true}
                yAxisTicks={4}
                axisLineColor={isDarkMode ? '#475569' : '#e2e8f0'}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Multi-series Line Chart</h3>
              <LineChart 
                data={multiLineData} 
                width={400} 
                height={300}
                showGridLines={true}
                lineColors={['#3b82f6', '#f59e0b']}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Basic Line Chart</h3>
              <LineChart 
                data={lineChartData1} 
                width={400} 
                height={300} 
                areaColor="rgba(59, 130, 246, 0.1)" 
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gradient Line Chart</h3>
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
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Minimal Line Chart</h3>
              <LineChart 
                data={lineChartData1} 
                width={400} 
                height={300} 
                areaColor="rgba(245, 158, 11, 0.1)" 
                lineColors={'#f59e0b'}
                showXAxis={false}
                showYAxis={false}
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Multi-series with Points</h3>
              <LineChart 
                data={multiLineData} 
                width={400} 
                height={300} 
                lineColors={['#3b82f6', '#10b981']}
                pointColor="#fff"
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gradient Line</h3>
              <LineChart 
                data={gradientLineData} 
                width={400} 
                height={300} 
                lineGradientColors={['#3b82f6', '#6366f1']}
                areaColor="rgba(99, 102, 241, 0.1)"
                pointColor="#6366f1"
              />
            </div>

            <div className={`rounded-xl p-6 border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-slate-900/50 border-slate-800' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Multi-series without Area</h3>
              <LineChart 
                data={multiLineNoAreaData} 
                width={400} 
                height={300} 
                showArea={false}
                lineColors={['#3b82f6', '#f59e0b']}
                pointColor="#fff"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
