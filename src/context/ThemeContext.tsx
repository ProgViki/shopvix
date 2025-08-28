// import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'

// type Theme = 'light' | 'dark';

// type ThemeContextType = {
//   theme: Theme;
//   toggle: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | null>(null)

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>('dark')
//   const toggle = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])
//   const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

//   React.useEffect(() => {
//     document.documentElement.style.setProperty('--bg', theme === 'dark' ? '#0b0b0e' : '#ffffff')
//     document.documentElement.style.setProperty('--fg', theme === 'dark' ? '#e7e7ea' : '#0b0b0e')
//     document.documentElement.style.setProperty('--card', theme === 'dark' ? '#16161c' : '#f6f7fb')
//   }, [theme])

//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
// }

// export const useTheme = () => {
//   const ctx = useContext(ThemeContext)
//   if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
//   return ctx
// }

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
