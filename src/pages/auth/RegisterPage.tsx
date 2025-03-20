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
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useTheme from '../../hooks/useTheme';

const RegisterPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would handle registration here
    console.log('Registration form submitted:', formData);
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
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Join us to buy and sell refurbished electronics
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  variant="outlined"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant="outlined"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

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
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
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
              sx={{ mb: 1 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  color="primary"
                  required
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link component={RouterLink} to="/terms" color="primary">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link component={RouterLink} to="/privacy" color="primary">
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mt: 1, mb: 2 }}
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
                mb: 2,
              }}
            >
              Sign Up
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Or sign up with
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
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/auth/login"
            color="primary"
            fontWeight={600}
            sx={{ textDecoration: 'none' }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default RegisterPage;