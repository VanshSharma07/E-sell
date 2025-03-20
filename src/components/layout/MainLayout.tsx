import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Box,
  AppBar,
  Toolbar,
  Container,
  useScrollTrigger,
  useMediaQuery,
  Drawer,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '../../hooks/useTheme';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if user has scrolled down
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with AppBar */}
      <AppBar
        position="sticky"
        elevation={scrollTrigger ? 4 : 0}
        component={motion.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <Header />
          
          {isMobile && (
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ 
                ml: 'auto',
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.03)',
                borderRadius: '8px'
              }}
            >
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          PaperProps={{
            sx: {
              width: '80%',
              maxWidth: '320px',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(18, 18, 18, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderLeft: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.palette.mode === 'dark'
                ? '-5px 0 25px rgba(0, 0, 0, 0.5)'
                : '-5px 0 25px rgba(0, 0, 0, 0.1)',
              padding: 2,
            }
          }}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </Drawer>
      )}

      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          pt: 2,
          pb: 5,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;