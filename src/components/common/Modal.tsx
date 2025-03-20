import React, { forwardRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  useTheme,
  Paper,
  PaperProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  children: React.ReactNode;
  showCloseButton?: boolean;
  circuitBackground?: boolean;
}

// Create a custom component that combines Paper with motion.div
const MotionPaper = forwardRef<HTMLDivElement, PaperProps>(({ children, ...props }, ref) => {
  return (
    <Paper component={motion.div} ref={ref} {...props}>
      {children}
    </Paper>
  );
});

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  showCloseButton = true,
  circuitBackground = true,
}) => {
  const theme = useTheme();

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Circuit pattern animation
  const CircuitPattern = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: -1,
        opacity: 0.05,
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <pattern
          id="circuitPattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
          patternTransform="rotate(0)"
        >
          <motion.path
            d="M10,10 L90,10 M10,30 L90,30 M10,50 L90,50 M10,70 L90,70 M10,90 L90,90"
            stroke={theme.palette.primary.main}
            strokeWidth="0.5"
            strokeLinecap="round"
            fill="none"
          />
          <motion.path
            d="M10,10 L10,90 M30,10 L30,90 M50,10 L50,90 M70,10 L70,90 M90,10 L90,90"
            stroke={theme.palette.primary.main}
            strokeWidth="0.5"
            strokeLinecap="round"
            fill="none"
          />
          <motion.circle cx="10" cy="10" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="30" cy="10" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="50" cy="10" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="70" cy="10" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="90" cy="10" r="2" fill={theme.palette.primary.main} />
          
          <motion.circle cx="10" cy="30" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="30" cy="30" r="2" fill={theme.palette.secondary.main} />
          <motion.circle cx="50" cy="30" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="70" cy="30" r="2" fill={theme.palette.secondary.main} />
          <motion.circle cx="90" cy="30" r="2" fill={theme.palette.primary.main} />
          
          <motion.circle cx="10" cy="50" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="30" cy="50" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="50" cy="50" r="2" fill={theme.palette.secondary.main} />
          <motion.circle cx="70" cy="50" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="90" cy="50" r="2" fill={theme.palette.primary.main} />
          
          <motion.circle cx="10" cy="70" r="2" fill={theme.palette.secondary.main} />
          <motion.circle cx="30" cy="70" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="50" cy="70" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="70" cy="70" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="90" cy="70" r="2" fill={theme.palette.secondary.main} />
          
          <motion.circle cx="10" cy="90" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="30" cy="90" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="50" cy="90" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="70" cy="90" r="2" fill={theme.palette.primary.main} />
          <motion.circle cx="90" cy="90" r="2" fill={theme.palette.primary.main} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuitPattern)" />
      </motion.svg>
    </Box>
  );

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={maxWidth}
          fullWidth={fullWidth}
          PaperComponent={MotionPaper}
          PaperProps={{
            initial: 'hidden',
            animate: 'visible',
            exit: 'exit',
            variants: dialogVariants,
            style: {
              borderRadius: '16px',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(30, 30, 30, 0.9)'
                : 'rgba(255, 255, 255, 0.9)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 16px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 98, 230, 0.2)' 
                : '0 16px 32px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 98, 230, 0.1)',
            },
          }}
        >
          {circuitBackground && <CircuitPattern />}
          
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${theme.palette.divider}`,
              px: 3,
              py: 2,
            }}
          >
            <Typography
              variant="h5"
              component={motion.div}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              sx={{ 
                fontWeight: 600,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(45deg, #fff, #c2d8ff)'
                  : 'linear-gradient(45deg, #032153, #0062e6)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Typography>
            
            {showCloseButton && (
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="close"
                size="small"
                edge="end"
                sx={{
                  color: theme.palette.text.secondary,
                  borderRadius: '50%',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </DialogTitle>
          
          <DialogContent
            sx={{
              p: 3,
              position: 'relative',
              overflowX: 'hidden',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {children}
            </motion.div>
          </DialogContent>
          
          {actions && (
            <DialogActions
              sx={{
                justifyContent: 'flex-end',
                p: 2,
                px: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{ display: 'flex', gap: '8px' }}
              >
                {actions}
              </motion.div>
            </DialogActions>
          )}
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// Helper component for the primary action button
export const ModalPrimaryButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <Button onClick={onClick} color="primary" variant="gradient" disabled={disabled}>
    {children}
  </Button>
);

// Helper component for the secondary/cancel button
export const ModalSecondaryButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => (
  <Button onClick={onClick} color="inherit" variant="outlined" disabled={disabled}>
    {children}
  </Button>
);

export default Modal;
