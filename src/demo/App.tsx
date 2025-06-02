import React, { useState } from 'react';
import {
  Header,
  Installation,
  ResponsiveExamples,
  LineChartExamples,
  BarChartExamples,
  StackedBarChartExamples,
  RadarChartExamples,
} from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'line' | 'bar' | 'stacked' | 'radar'>('line');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-8">
        {/* Getting Started Section */}
        <Installation isDarkMode={isDarkMode} />

        {/* Responsive Test Section */}
        <ResponsiveExamples isDarkMode={isDarkMode} />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-lg font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}
            >
              Chart Examples
            </h2>
            <div
              className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
            >
              <button
                onClick={() => setActiveTab('line')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'line'
                    ? isDarkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Line Charts
              </button>
              <button
                onClick={() => setActiveTab('bar')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'bar'
                    ? isDarkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Bar Charts
              </button>
              <button
                onClick={() => setActiveTab('stacked')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'stacked'
                    ? isDarkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Stacked Bar Charts
              </button>
              <button
                onClick={() => setActiveTab('radar')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'radar'
                    ? isDarkMode
                      ? 'bg-slate-700 text-white'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Radar Charts
              </button>
            </div>
          </div>

          {activeTab === 'stacked' && <StackedBarChartExamples isDarkMode={isDarkMode} />}
          {activeTab === 'radar' && <RadarChartExamples isDarkMode={isDarkMode} />}
          {(activeTab === 'line' || activeTab === 'bar') && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activeTab === 'line' && <LineChartExamples isDarkMode={isDarkMode} />}
              {activeTab === 'bar' && <BarChartExamples isDarkMode={isDarkMode} />}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
