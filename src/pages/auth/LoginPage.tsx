import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Divider,
  Stack,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useTheme from '../../hooks/useTheme';

const LoginPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would handle authentication here
    console.log('Login form submitted:', formData);
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue to your account
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
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
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
              sx={{ mb: 1 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link
                component={RouterLink}
                to="/auth/forgot-password"
                variant="body2"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                Forgot Password?
              </Link>
            </Box>

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
                mb: 2,
              }}
            >
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ borderRadius: '8px', py: 1 }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ borderRadius: '8px', py: 1 }}
            >
              Facebook
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/auth/register"
            color="primary"
            fontWeight={600}
            sx={{ textDecoration: 'none' }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoginPage;