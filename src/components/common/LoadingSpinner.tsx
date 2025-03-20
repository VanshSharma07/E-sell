import React from 'react';
import { Box, CircularProgress, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 40,
  fullScreen = false,
}) => {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3, 
        duration: 0.5 
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: { 
        duration: 0.2 
      }
    },
  };

  // Custom circuit animation for fullscreen loading
  const CircuitAnimation = () => (
    <Box
      sx={{
        position: 'absolute',
        width: size * 3,
        height: size * 3,
        opacity: 0.2,
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.path
          d="M10,50 L30,50 M30,50 L30,30 M30,30 L50,30 M50,30 L50,10 M50,10 L70,10 M70,10 L70,30 M70,30 L90,30 M90,30 L90,50 M90,50 L70,50 M70,50 L70,70 M70,70 L50,70 M50,70 L50,90 M50,90 L30,90 M30,90 L30,70 M30,70 L10,70 M10,70 L10,50"
          stroke={theme.palette.primary.main}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            transition: { 
              pathLength: { 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.5
              },
              opacity: { duration: 0.5 }
            }
          }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={theme.palette.secondary.main}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.6,
            transition: { 
              pathLength: { 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse",
              },
              opacity: { duration: 0.5 }
            }
          }}
        />
      </motion.svg>
    </Box>
  );

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: theme.zIndex.modal + 1,
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.default, 0.9)
            : alpha(theme.palette.background.default, 0.7),
          backdropFilter: 'blur(5px)',
        }),
      }}
    >
      {fullScreen && <CircuitAnimation />}
      
      <Box position="relative" sx={{ mb: 2 }}>
        <CircularProgress
          size={size}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            ...(fullScreen && {
              boxShadow: `0 0 20px ${theme.palette.primary.main}`,
            }),
          }}
        />
        
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            transition: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
        >
          <Box
            sx={{
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: '50%',
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary.main, 0.2)
                : alpha(theme.palette.primary.main, 0.1),
              filter: `blur(${size / 5}px)`,
            }}
          />
        </Box>
      </Box>
      
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          sx={{
            fontWeight: 500,
            ...(fullScreen && {
              fontSize: '1rem',
              mt: 2,
            }),
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
