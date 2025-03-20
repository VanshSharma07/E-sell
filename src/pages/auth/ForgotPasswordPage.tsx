import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  alpha,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTheme from '../../hooks/useTheme';

const ForgotPasswordPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would handle password reset request here
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <RecyclingIcon
            sx={{
              fontSize: '2.5rem',
              mr: 1,
              color: theme.palette.primary.main,
              filter: isDark
                ? 'drop-shadow(0 0 5px rgba(0, 98, 230, 0.5))'
                : 'none',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(90deg, #4d8df7, #00e676)'
                : 'linear-gradient(90deg, #0062e6, #00b248)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
            }}
          >
            E-Cycle
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email to receive a password reset link
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          borderRadius: '16px',
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Password reset link sent! Please check your email.
              </Alert>
              <Typography variant="body2" paragraph>
                If you don't receive an email within a few minutes, please check your spam folder or try again.
              </Typography>
              <Button
                component={RouterLink}
                to="/auth/login"
                variant="contained"
                color="primary"
                sx={{ mt: 2, borderRadius: '8px', py: 1.5 }}
                fullWidth
              >
                Back to Login
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                variant="outlined"
                required
                value={email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  py: 1.5, 
                  borderRadius: '8px',
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          to="/auth/login"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Back to Login
        </Button>
      </Box>
    </motion.div>
  );
};

export default ForgotPasswordPage;