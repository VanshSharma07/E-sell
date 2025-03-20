import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useTheme from '../../hooks/useTheme';

const Footer: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Mission', path: '/mission' },
        { name: 'Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Products',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'Phones & Tablets', path: '/products/category/phones' },
        { name: 'Computers', path: '/products/category/computers' },
        { name: 'Accessories', path: '/products/category/accessories' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Sell Your Device', path: '/sell' },
        { name: 'Corporate Recycling', path: '/corporate' },
        { name: 'Device Repair', path: '/repair' },
        { name: 'Data Destruction', path: '/data-destruction' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Return Policy', path: '/returns' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 5,
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(18, 18, 18, 0.9)'
          : 'rgba(247, 249, 252, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Circuit pattern background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          zIndex: 0,
          background: 'url(/circuit-pattern.png)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main footer content */}
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={3}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <RecyclingIcon
                sx={{
                  fontSize: '2rem',
                  color: theme.palette.primary.main,
                  mr: 1,
                  filter: isDark
                    ? 'drop-shadow(0 0 5px rgba(0, 98, 230, 0.5))'
                    : 'none',
                }}
              />
              <Typography
                variant="h5"
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

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Transforming electronic waste into sustainable value. We're committed to extending the lifecycle of electronics and reducing e-waste through responsible recycling and reselling.
            </Typography>

            {/* Social media links */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      color: 'primary.main',
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.03)',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </Stack>
          </Grid>

          {/* Footer links */}
          {!isMobile ? (
            footerLinks.map((section) => (
              <Grid item xs={6} md={2} key={section.title}>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ mb: 2, fontWeight: 700 }}
                >
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                  {section.links.map((link) => (
                    <Box component="li" key={link.name} sx={{ mb: 1 }}>
                      <Link
                        component={RouterLink}
                        to={link.path}
                        color="text.secondary"
                        sx={{
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'none',
                          },
                        }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {footerLinks.map((section) => (
                  <Grid item xs={6} key={section.title}>
                    <Typography
                      variant="subtitle2"
                      color="text.primary"
                      sx={{ mb: 1, fontWeight: 700 }}
                    >
                      {section.title}
                    </Typography>
                    <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                      {section.links.slice(0, 2).map((link) => (
                        <Box component="li" key={link.name} sx={{ mb: 1 }}>
                          <Link
                            component={RouterLink}
                            to={link.path}
                            color="text.secondary"
                            sx={{
                              textDecoration: 'none',
                              fontSize: '0.875rem',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {link.name}
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Bottom footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} E-Cycle. All rights reserved.
          </Typography>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 3 }}
            alignItems="center"
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            <Link
              component={RouterLink}
              to="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/cookies"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;