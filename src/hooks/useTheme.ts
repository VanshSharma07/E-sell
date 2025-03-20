import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';

// Custom hook to access theme context
const useTheme = () => {
  const { mode, toggleTheme, isInitialized } = useContext(ThemeContext);
  const theme = useMuiTheme();
  
  return {
    mode,
    toggleTheme,
    isInitialized,
    theme,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
};

export default useTheme;
