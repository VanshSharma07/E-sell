import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';
import { fadeIn } from '../animations/fadeVariants';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import ResetPasswordPage from './auth/ResetPasswordPage';

const AuthPage: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      
      <Container 
        maxWidth="xs" 
        component={motion.div}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 4, md: 8 },
          zIndex: 1
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default AuthPage;