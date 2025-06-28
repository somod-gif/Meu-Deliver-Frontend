import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ sidebarOpen, setSidebarOpen, navigation }) {
  const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    navigation,
    currentSection,
    setCurrentSection
  }) => (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:translate-x-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            M
          </div>
          <div>
            <span className="font-bold text-gray-900 text-xl">My Deliver</span>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close menu"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>git 
              <button
                onClick={() => {
                  setCurrentSection(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  currentSection === item.key
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md transform scale-[1.02]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600 hover:translate-x-1'
                }`}
              >
                <item.icon 
                  className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                    currentSection === item.key ? 'text-white' : 'group-hover:scale-110'
                  }`} 
                />
                <span className="flex-1 text-left">{item.name}</span>
                {currentSection === item.key && (
                  <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="text-center">
          <div className="text-xs font-medium text-gray-600 mb-1">
            Fast, Efficient & Secure
          </div>
          <div className="text-xs text-gray-500">
            Everywhere.
          </div>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="w-1 h-1 bg-teal-300 rounded-full"></div>
            <div className="w-1 h-1 bg-teal-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
  return (
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      navigation={navigation}
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
    />
  );
}