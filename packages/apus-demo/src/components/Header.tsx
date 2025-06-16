import React from 'react';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import apusLogo from '/apus.svg';
import GithubIcon from './icons/GithubIcon';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  toggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const iconClass = `h-6 w-6 ${isDarkMode ? 'invert' : ''}`;

  return (
    <header
      className={`border-b transition-colors duration-200 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}
    >
      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={apusLogo} alt="Apus Logo" className="h-8 lg:h-10 w-8 lg:w-10" />
            <div>
              <h1
                className={`text-xl lg:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}
              >
                Apus Chart Library
              </h1>
              <p
                className={`mt-1 text-sm lg:text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
              >
                Interactive and customizable data visualization components built using D3.js
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://www.npmjs.com/package/apus"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-900'
                }`}
                aria-label="NPM Package"
              >
                <img
                  src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/npm.svg"
                  alt="NPM logo"
                  className={iconClass}
                />
              </a>
              <a
                href="https://yarnpkg.com/package?name=apus"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-900'
                }`}
                aria-label="Yarn Package"
              >
                <img
                  src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-circle.svg"
                  alt="Yarn logo"
                  className={iconClass}
                />
              </a>
              <a
                href="https://github.com/harshattray/apus"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'hover:bg-slate-800 text-slate-200'
                    : 'hover:bg-slate-100 text-slate-900'
                }`}
                aria-label="GitHub Repository"
              >
                <GithubIcon />
              </a>
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
                <SunIcon className="w-5 h-5 lg:w-6 lg:h-6 text-slate-200" />
              ) : (
                <MoonIcon
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  style={{ fill: 'none', stroke: '#475569' }}
                />
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-slate-800 text-slate-200'
                  : 'hover:bg-slate-100 text-slate-900'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
