import React from 'react';
import { IconButton, Tooltip, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useTheme from '../../hooks/useTheme';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium',
  showTooltip = true,
}) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === 'dark';

  // Animation variants
  const moonVariants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition: { duration: 0.5 } },
  };

  const sunVariants = {
    initial: { scale: 0.6, rotate: -90 },
    animate: { scale: 1, rotate: 0, transition: { duration: 0.5 } },
  };

  const toggleButton = (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      size={size}
      sx={{
        transition: 'all 0.3s ease-in-out',
        background: theme => alpha(theme.palette.primary.main, isDark ? 0.15 : 0.05),
        '&:hover': {
          background: theme => alpha(theme.palette.primary.main, isDark ? 0.25 : 0.1),
        },
      }}
    >
      {isDark ? (
        <motion.div
          key="moon"
          initial="initial"
          animate="animate"
          variants={moonVariants}
        >
          <Brightness4Icon fontSize={size} />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial="initial"
          animate="animate"
          variants={sunVariants}
        >
          <Brightness7Icon fontSize={size} />
        </motion.div>
      )}
    </IconButton>
  );

  return showTooltip ? (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'} arrow>
      {toggleButton}
    </Tooltip>
  ) : toggleButton;
};

export default ThemeToggle;
