import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search'; // ✅ Fixed import
import useTheme from '../hooks/useTheme'; // ✅ Ensure this hook correctly returns `theme` and `isDark`
import { fadeIn } from '../animations/fadeVariants';

const NotFoundPage: React.FC = () => {
  const { theme, isDark } = useTheme(); // ✅ Ensure `useTheme` returns `theme` and `isDark`

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        component={motion.div}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: '6rem',
            color: 'primary.main',
            mb: 3,
            filter: isDark
              ? 'drop-shadow(0 0 10px rgba(0, 98, 230, 0.5))'
              : 'none',
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: isDark
              ? 'linear-gradient(90deg, #4d8df7, #1de9b6)'
              : 'linear-gradient(90deg, #0062e6, #00b248)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 500,
          }}
        >
          Oops! The page you're looking for seems to have been recycled. Let's get you back on track.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            size="large"
            sx={{
              borderRadius: '12px',
              py: 1.5,
              px: 4,
              fontWeight: 600,
              boxShadow: theme.shadows[8],
            }}
          >
            Back to Home
          </Button>

          <Button
            component={RouterLink}
            to="/products"
            variant="outlined"
            color="primary"
            startIcon={<SearchIcon />}
            size="large"
            sx={{
              borderRadius: '12px',
              py: 1.5,
              px: 4,
              fontWeight: 600,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Browse Products
          </Button>
        </Box>

        <Box
          sx={{
            mt: 8,
            p: 3,
            borderRadius: '16px',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            backdropFilter: 'blur(8px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            If you believe this is a technical error, please{' '}
            <RouterLink
              to="/contact"
              style={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
              }}
            >
              contact our support team
            </RouterLink>
            .
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
