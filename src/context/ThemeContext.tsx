import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from '../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isInitialized: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark', // Default to dark mode for futuristic look
  toggleTheme: () => {},
  isInitialized: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if theme preference is saved in localStorage
  const [isInitialized, setIsInitialized] = useState(false);
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // Use prefers-color-scheme as fallback
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
    setIsInitialized(true);
  }, []);

  // Save theme preference to localStorage when changed
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode, isInitialized]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create a theme based on the mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      isInitialized,
    }),
    [mode, isInitialized]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
