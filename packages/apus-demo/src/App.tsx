import React, { useState } from 'react';
import {
  Header,
  BarChartExamples,
  LineChartExamples,
  StackedBarChartExamples,
  DonutChartExamples,
  RadarChartExamples,
  FunnelChartExamples,
  ResponsiveExamples,
  Installation,
  Sidebar,
} from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel'
  >('line');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
      default:
        return <LineChartExamples isDarkMode={isDarkMode} />;
    }
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

        <section className="flex gap-8">
          <Sidebar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 flex flex-col gap-6">{renderChartExample()}</div>
        </section>
      </main>
    </div>
  );
}

export default App;
