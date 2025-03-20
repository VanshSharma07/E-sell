import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  alpha,
  Button,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import DevicesIcon from '@mui/icons-material/Devices';
import SellIcon from '@mui/icons-material/Sell';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CloseIcon from '@mui/icons-material/Close';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useTheme from '../../hooks/useTheme';

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const { theme, isDark } = useTheme();
  
  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  
  // Navigation items
  const mainNavItems = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { name: 'Products', icon: <DevicesIcon />, path: '/products' },
    { name: 'Sell Device', icon: <SellIcon />, path: '/sell' },
    { name: 'About Us', icon: <InfoIcon />, path: '/about' },
    { name: 'Contact', icon: <ContactSupportIcon />, path: '/contact' },
  ];
  
  const secondaryNavItems = [
    { name: 'Support', icon: <SupportAgentIcon />, path: '/support' },
    { name: 'Warranty', icon: <VerifiedUserIcon />, path: '/warranty' },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        position: 'relative',
      }}
    >
      {/* Close button - only show if closeSidebar function is provided */}
      {closeSidebar && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton
            onClick={closeSidebar}
            sx={{
              mb: 1,
              color: theme.palette.text.secondary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      
      {/* Logo and title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          mb: 3,
        }}
      >
        <RecyclingIcon
          sx={{
            fontSize: '2.2rem',
            color: theme.palette.primary.main,
            mr: 2,
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
            letterSpacing: '1px',
          }}
        >
          E-Cycle
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Main navigation */}
      <Typography
        variant="overline"
        sx={{
          ml: 3,
          mb: 1,
          display: 'block',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        Navigation
      </Typography>
      <List component={motion.ul} variants={listVariants} initial="hidden" animate="visible">
        {mainNavItems.map((item) => (
          <ListItem
            key={item.name}
            component={motion.li}
            variants={itemVariants}
            disablePadding
            sx={{ mb: 0.5 }}
          >
            <Button
              component={RouterLink}
              to={item.path}
              onClick={closeSidebar}
              startIcon={item.icon}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                px: 3,
                borderRadius: '10px',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                '&.active': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                },
              }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Secondary navigation */}
      <Typography
        variant="overline"
        sx={{
          ml: 3,
          mb: 1,
          display: 'block',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        Support
      </Typography>
      <List component={motion.ul} variants={listVariants} initial="hidden" animate="visible">
        {secondaryNavItems.map((item) => (
          <ListItem
            key={item.name}
            component={motion.li}
            variants={itemVariants}
            disablePadding
            sx={{ mb: 0.5 }}
          >
            <Button
              component={RouterLink}
              to={item.path}
              onClick={closeSidebar}
              startIcon={item.icon}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                px: 3,
                borderRadius: '10px',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Product Label */}
      <Box
        sx={{
          mt: 'auto',
          mb: 2,
          mx: 2,
          p: 2,
          borderRadius: '12px',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            background: 'url(/circuit-pattern.png)',
            zIndex: 0,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Ready to sell your device?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Get an instant quote for your used electronics
          </Typography>
          <Button
            component={RouterLink}
            to="/sell"
            variant="contained"
            onClick={closeSidebar}
            fullWidth
          >
            Sell Now
          </Button>
        </Box>
      </Box>
      
      {/* Account buttons */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            component={RouterLink}
            to="/auth/login"
            variant="outlined"
            color="primary"
            onClick={closeSidebar}
            startIcon={<AccountCircleIcon />}
            fullWidth
          >
            Sign In
          </Button>
          <Button
            component={RouterLink}
            to="/auth/register"
            variant="contained"
            color="primary"
            onClick={closeSidebar}
            fullWidth
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sidebar;