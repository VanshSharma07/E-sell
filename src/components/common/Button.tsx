import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { LinkProps as RouterLinkProps } from 'react-router-dom';

// Define custom button variants beyond what MUI offers
export type ButtonVariant = 
  | 'neon'          // Neon glowing button 
  | 'circuit'       // Circuit board pattern button
  | 'gradient'      // Gradient background button
  | 'futuristic'    // Outlined with glow effect
  | 'cyber';        // Hard edges and digital style

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: MuiButtonProps['variant'] | ButtonVariant;
  glowColor?: string;
  hoverScale?: number;
  to?: RouterLinkProps['to'];
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  glowColor,
  hoverScale = 1.03,
  ...props
}) => {
  // Define the base MUI variant to use
  let muiVariant: MuiButtonProps['variant'] = 'contained';
  
  // Custom styling based on our variants
  let customSx = {};
  
  // Handle special variants
  switch (variant) {
    case 'neon':
      muiVariant = 'contained';
      customSx = {
        boxShadow: (theme: Theme) => `0 0 10px ${glowColor || theme.palette.primary.main}`,
        '&:hover': {
          boxShadow: (theme: Theme) => `0 0 20px ${glowColor || theme.palette.primary.main}`,
        },
      };
      break;
      
    case 'circuit':
      muiVariant = 'contained';
      customSx = {
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/circuit-pattern.png)',
          backgroundSize: 'cover',
          opacity: 0.1,
          zIndex: 0,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      };
      break;
      
    case 'gradient':
      muiVariant = 'contained';
      customSx = {
        background: color === 'secondary' 
          ? 'linear-gradient(45deg, #00b248 0%, #00e676 100%)'
          : 'linear-gradient(45deg, #0062e6 30%, #33a1fd 90%)',
        '&:hover': {
          background: color === 'secondary'
            ? 'linear-gradient(45deg, #009624 0%, #00c853 100%)'
            : 'linear-gradient(45deg, #0046a6 30%, #0062e6 90%)',
        },
      };
      break;
      
    case 'futuristic':
      muiVariant = 'outlined';
      customSx = {
        borderWidth: '1px',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: 'inherit',
          border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
          opacity: 0.5,
          zIndex: -1,
        },
        '&:hover': {
          borderWidth: '1px',
          '&::after': {
            opacity: 0.8,
            boxShadow: (theme: Theme) => `0 0 8px ${theme.palette.primary.main}`,
          },
        },
      };
      break;
      
    case 'cyber':
      muiVariant = 'contained';
      customSx = {
        clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)',
        borderRadius: 0,
        border: (theme: Theme) => `1px solid ${theme.palette.primary.light}`,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: 'bold',
      };
      break;
      
    default:
      // Use standard MUI variant
      muiVariant = variant as MuiButtonProps['variant'];
  }
  
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
    >
      <MuiButton
        variant={muiVariant}
        color={color}
        sx={{
          ...customSx,
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </MuiButton>
    </motion.div>
  );
};

export default Button;
