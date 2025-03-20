import { PaletteOptions } from '@mui/material';

// Define the palette for light and dark mode
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#0062e6', // Electric blue
    light: '#4d8df7',
    dark: '#0046a6',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#00e676', // Neon green
    light: '#66ffa6',
    dark: '#00b248',
    contrastText: '#000000',
  },
  error: {
    main: '#ff1744',
    light: '#ff4569',
    dark: '#c4001d',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ffb74d',
    light: '#ffd95b',
    dark: '#c88719',
    contrastText: '#000000',
  },
  info: {
    main: '#29b6f6',
    light: '#73e8ff',
    dark: '#0086c3',
    contrastText: '#000000',
  },
  success: {
    main: '#00e676',
    light: '#66ffa6',
    dark: '#00b248',
    contrastText: '#000000',
  },
  background: {
    default: '#f7f9fc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1c2331',
    secondary: '#4f5b6a',
    disabled: '#a0aec0',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4d8df7', // Electric blue
    light: '#8bbcff',
    dark: '#0062e6',
    contrastText: '#000000',
  },
  secondary: {
    main: '#00e676', // Neon green
    light: '#66ffa6',
    dark: '#00b248',
    contrastText: '#000000',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: '#000000',
  },
  success: {
    main: '#00e676',
    light: '#00e676',
    dark: '#00c853',
    contrastText: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0bec5',
    disabled: '#6c7a89',
  },
};

// Accent colors for cyberpunk aesthetics
export const accentColors = {
  neonPurple: '#9c27b0',
  neonOrange: '#ff3d00',
  neonYellow: '#ffea00',
  neonPink: '#f50057',
  neonTeal: '#1de9b6',
  
  // Circuit board colors
  circuitGreen: '#00e676',
  circuitBlue: '#2196f3',
  circuitRed: '#f44336',
  
  // Gradient bases
  gradientBlue: 'linear-gradient(45deg, #0062e6 0%, #33a1fd 100%)',
  gradientGreen: 'linear-gradient(45deg, #00b248 0%, #00e676 100%)',
  gradientPurple: 'linear-gradient(45deg, #6200ea 0%, #b388ff 100%)',
};

export const getPalette = (mode: 'light' | 'dark'): PaletteOptions => {
  return mode === 'light' ? lightPalette : darkPalette;
};

export default getPalette;
