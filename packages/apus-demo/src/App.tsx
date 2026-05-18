import React, { useState } from 'react';
import {
  Header,
  BarChartExamples,
  LineChartExamples,
  StackedBarChartExamples,
  DonutChartExamples,
  RadarChartExamples,
  FunnelChartExamples,
  ScatterChartExamples,
  ResponsiveExamples,
  Installation,
  Sidebar,
  RangeChartExamples,
} from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel' | 'scatter' | 'range'
  >('line');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderChartExample = () => {
    switch (activeTab) {
      case 'line':
        return <LineChartExamples isDarkMode={isDarkMode} />;
      case 'bar':
        return <BarChartExamples isDarkMode={isDarkMode} />;
      case 'donut':
        return <DonutChartExamples isDarkMode={isDarkMode} />;
      case 'stacked':
        return <StackedBarChartExamples isDarkMode={isDarkMode} />;
      case 'radar':
        return <RadarChartExamples isDarkMode={isDarkMode} />;
      case 'funnel':
        return <FunnelChartExamples isDarkMode={isDarkMode} />;
      case 'scatter':
        return <ScatterChartExamples />;
      case 'range':
        return <RangeChartExamples isDarkMode={isDarkMode} />;
      default:
        return <LineChartExamples isDarkMode={isDarkMode} />;
    }
  };

  const chartTabs = [
    { id: 'line', name: 'Line Charts' },
    { id: 'bar', name: 'Bar Charts' },
    { id: 'donut', name: 'Donut Charts' },
    { id: 'stacked', name: 'Stacked Bar Charts' },
    { id: 'radar', name: 'Radar Charts' },
    { id: 'funnel', name: 'Funnel Charts' },
    { id: 'scatter', name: 'Scatter Charts' },
    { id: 'range', name: 'Range Charts' },
  ] as const;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
      }`}
    >
      <a
        href="https://harshattray.github.io/apus/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
      >
        <span>📖</span>
        <span>Looking for the full API reference & component docs?</span>
        <span className="underline underline-offset-2 font-semibold">View Documentation →</span>
      </a>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Getting Started Section */}
        <Installation isDarkMode={isDarkMode} />

        {/* Responsive Test Section */}
        <ResponsiveExamples isDarkMode={isDarkMode} />

        <section className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSelect={() => setIsMobileMenuOpen(false)}
              chartTabs={chartTabs}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <Sidebar
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSelect={() => setIsMobileMenuOpen(false)}
              chartTabs={chartTabs}
            />
          </div>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden mb-6">
            <div className="flex flex-wrap gap-2">
              {chartTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      activeTab === tab.id
                        ? isDarkMode
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-200 text-slate-900'
                        : isDarkMode
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">{renderChartExample()}</div>
        </section>
      </main>
    </div>
  );
}

export default App;
