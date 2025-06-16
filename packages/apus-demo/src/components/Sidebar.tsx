import React from 'react';

interface SidebarProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: 'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel') => void;
  onSelect?: () => void;
}

const chartTabs: { id: 'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel'; name: string }[] =
  [
    { id: 'line', name: 'Line Charts' },
    { id: 'bar', name: 'Bar Charts' },
    { id: 'donut', name: 'Donut Charts' },
    { id: 'stacked', name: 'Stacked Bar Charts' },
    { id: 'radar', name: 'Radar Charts' },
    { id: 'funnel', name: 'Funnel Charts' },
  ];

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, activeTab, setActiveTab, onSelect }) => {
  const handleTabClick = (tabId: 'line' | 'bar' | 'donut' | 'stacked' | 'radar' | 'funnel') => {
    setActiveTab(tabId);
    onSelect?.();
  };

  return (
    <nav className={`w-full lg:w-56 px-4 lg:px-6 py-4 lg:py-8 transition-colors duration-200`}>
      <h3
        className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
      >
        Chart Examples
      </h3>
      <ul className="space-y-2">
        {chartTabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`w-full text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-base font-medium
                ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'bg-slate-200 text-slate-900 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
