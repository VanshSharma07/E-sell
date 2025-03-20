import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  alpha,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useTheme from '../../hooks/useTheme';

const ResetPasswordPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  // In a real app, you would get the token from URL params
  const token = new URLSearchParams(location.search).get('token') || 'mock-token';
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // In a real app, would send the new password to the server
    console.log('Reset password form submitted:', { token, newPassword: formData.password });
    navigate('/auth/login', { state: { passwordReset: true } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          Create New Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please enter your new password
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
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              variant="outlined"
              required
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              variant="outlined"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              }}
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResetPasswordPage;