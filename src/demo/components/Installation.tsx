import React, { useState } from 'react';

type InstallationProps = {
  isDarkMode: boolean;
};

const Installation: React.FC<InstallationProps> = ({ isDarkMode }) => {
  const [activeInstallTab, setActiveInstallTab] = useState<'npm' | 'yarn' | 'pnpm'>('npm');

  return (
    <section
      className={`mb-12 p-6 rounded-xl border transition-colors duration-200 ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
        Getting Started
      </h2>

      <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        Apus Chart Library can be easily integrated into your React projects using your favorite
        package manager: npm, Yarn, or pnpm.
      </p>

      <h3
        className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}
      >
        Installation
      </h3>
      <div>
        <div
          className={`flex space-x-1 mb-3 rounded-lg p-1 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}
        >
          {(
            [
              {
                id: 'npm',
                name: 'npm',
                logo: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/npm.svg',
              },
              {
                id: 'yarn',
                name: 'Yarn',
                logo: 'https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-circle.svg',
              },
              {
                id: 'pnpm',
                name: 'pnpm',
                logo: 'https://pnpm.io/img/pnpm-no-name-with-frame.svg',
              },
            ] as const
          ).map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActiveInstallTab(pm.id)}
              className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors duration-150 text-sm font-medium
                ${
                  activeInstallTab === pm.id
                    ? isDarkMode
                      ? 'bg-slate-600 text-white'
                      : 'bg-white text-slate-700 shadow-sm'
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
            >
              <img
                src={pm.logo}
                alt={`${pm.name} logo`}
                className={`h-5 w-5 ${pm.id === 'npm' && isDarkMode ? 'invert' : ''} ${pm.id === 'pnpm' && isDarkMode ? 'bg-white rounded-full' : ''}`}
              />
              <span>{pm.name}</span>
            </button>
          ))}
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
          {activeInstallTab === 'npm' && (
            <div className="flex items-center space-x-3">
              <img
                src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/npm.svg"
                alt="npm logo"
                className={`h-7 w-7 ${isDarkMode ? 'invert' : ''}`}
              />
              <pre
                className={`flex-grow p-2.5 rounded-md text-sm overflow-x-auto ${isDarkMode ? 'bg-slate-700/80 text-slate-200' : 'bg-white text-slate-800 border border-slate-200'}`}
              >
                <code>npm install apus</code>
              </pre>
            </div>
          )}
          {activeInstallTab === 'yarn' && (
            <div className="flex items-center space-x-3">
              <img
                src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-circle.svg"
                alt="Yarn logo"
                className="h-7 w-7"
              />
              <pre
                className={`flex-grow p-2.5 rounded-md text-sm overflow-x-auto ${isDarkMode ? 'bg-slate-700/80 text-slate-200' : 'bg-white text-slate-800 border border-slate-200'}`}
              >
                <code>yarn add apus</code>
              </pre>
            </div>
          )}
          {activeInstallTab === 'pnpm' && (
            <div className="flex items-center space-x-3">
              <img
                src="https://pnpm.io/img/pnpm-no-name-with-frame.svg"
                alt="pnpm logo"
                className={`h-7 w-7 ${isDarkMode ? 'bg-white rounded-full' : ''}`}
              />
              <pre
                className={`flex-grow p-2.5 rounded-md text-sm overflow-x-auto ${isDarkMode ? 'bg-slate-700/80 text-slate-200' : 'bg-white text-slate-800 border border-slate-200'}`}
              >
                <code>pnpm add apus</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Installation;
