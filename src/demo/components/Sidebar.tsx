import React from 'react';

interface SidebarProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: 'line' | 'bar' | 'donut' | 'stacked' | 'radar') => void;
}

const chartTabs: { id: 'line' | 'bar' | 'donut' | 'stacked' | 'radar'; name: string }[] = [
  { id: 'line', name: 'Line Charts' },
  { id: 'bar', name: 'Bar Charts' },
  { id: 'donut', name: 'Donut Charts' },
  { id: 'stacked', name: 'Stacked Bar Charts' },
  { id: 'radar', name: 'Radar Charts' },
];

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode, activeTab, setActiveTab }) => {
  return (
    <nav className={`flex-none w-56 px-6 py-8 transition-colors duration-200`}>
      <h3
        className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
      >
        Chart Examples
      </h3>
      <ul className="space-y-2">
        {chartTabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left py-2.5 px-4 rounded-md transition-colors duration-200 text-base font-medium
                ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
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
