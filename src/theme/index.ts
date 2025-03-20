import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import getPalette from './palette';
import typography from './typography';
import getComponents from './components';

// Create the theme
export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  let theme = createTheme({
    palette: getPalette(mode),
    typography,
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    // Use custom breakpoints
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  
  // Apply component overrides
  theme = createTheme(theme, {
    components: getComponents(theme),
  });
  
  // Make fonts responsive
  theme = responsiveFontSizes(theme);
  
  return theme;
};

export default createAppTheme;
