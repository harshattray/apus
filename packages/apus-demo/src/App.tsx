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
} from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel' | 'scatter'
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
  ] as const;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'
      }`}
    >
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
            />
          </div>

          {/* Mobile Sidebar */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <Sidebar
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSelect={() => setIsMobileMenuOpen(false)}
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
