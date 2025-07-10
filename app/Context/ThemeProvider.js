// context/ThemeProvider.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    updateDocumentClass(newMode);
  };

  const updateDocumentClass = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode ?? systemDark;
    
    setDarkMode(initialMode);
    updateDocumentClass(initialMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);