import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import apusLogo from '/apus.svg';
import GithubIcon from './icons/GithubIcon';

type HeaderProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header
      className={`border-b transition-colors duration-200 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}
    >
      <div className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={apusLogo} alt="Apus Logo" className="h-10 w-10" />
          <div>
            <h1
              className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}
            >
              Apus Chart Library
            </h1>
            <p
              className={`mt-1.5 text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Interactive and customizable data visualization components built using D3.js
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/harshattray/apus"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-lg transition-colors duration-200 ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-900'
            }`}
            aria-label="GitHub Repository"
          >
            <GithubIcon />
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg transition-colors duration-200 ${
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
      </div>
    </header>
  );
};

export default Header;
