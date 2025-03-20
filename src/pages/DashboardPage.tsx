import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import useTheme from '../hooks/useTheme';
import { fadeIn } from '../animations/fadeVariants';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Mock user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: '/assets/images/avatar.jpg',
  joinDate: 'Member since January 2023',
};

// Mock purchase history
const purchaseHistory = [
  {
    id: '1',
    name: 'iPhone 12',
    date: '2024-01-15',
    price: 499.99,
    status: 'Delivered',
    image: '/assets/images/iphone.jpg',
  },
  {
    id: '2',
    name: 'MacBook Air',
    date: '2023-12-10',
    price: 799.99,
    status: 'Delivered',
    image: '/assets/images/macbook.jpg',
  },
  {
    id: '3',
    name: 'Samsung Galaxy Tab',
    date: '2024-02-28',
    price: 349.99,
    status: 'In Transit',
    image: '/assets/images/galaxy.jpg',
  },
];

// Mock selling history
const sellingHistory = [
  {
    id: '1',
    name: 'iPad Pro',
    date: '2024-01-05',
    price: 450.00,
    status: 'Sold',
    image: '/assets/images/ipad.jpg',
  },
  {
    id: '2',
    name: 'Dell XPS 13',
    date: '2023-11-22',
    price: 620.00,
    status: 'Processing',
    image: '/assets/images/dell.jpg',
  },
];

// Mock saved items
const savedItems = [
  {
    id: '1',
    name: 'Sony WH-1000XM4',
    price: 249.99,
    image: '/assets/images/headphones.jpg',
  },
  {
    id: '2',
    name: 'iPad Air',
    price: 399.99,
    image: '/assets/images/ipad.jpg',
  },
  {
    id: '3',
    name: 'Google Pixel 6',
    price: 399.99,
    image: '/assets/images/pixel.jpg',
  },
];

// Dashboard pages
const Profile = () => {
  const { theme, isDark } = useTheme();
  
  return (
    <Box>
      <Card sx={{ mb: 3, borderRadius: '16px' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar 
              src={userData.avatar} 
              alt={userData.name}
              sx={{ 
                width: 100, 
                height: 100, 
                mb: 2,
                border: `3px solid ${theme.palette.primary.main}`,
              }}
            />
            <Typography variant="h5" fontWeight="bold">{userData.name}</Typography>
            <Typography variant="body2" color="text.secondary">{userData.email}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{userData.joinDate}</Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" fontWeight="bold" gutterBottom>Personal Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Full Name</Typography>
              <Typography variant="body1">{userData.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Email Address</Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Phone Number</Typography>
              <Typography variant="body1">+1 (555) 123-4567</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Location</Typography>
              <Typography variant="body1">San Francisco, CA</Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: '8px' }}
            >
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>Account Settings</Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Notification Preferences" 
                secondary="Manage how and when you receive notifications"
              />
              <Button variant="outlined" size="small" sx={{ borderRadius: '8px' }}>
                Update
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <InventoryIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Payment Methods" 
                secondary="Add or update your payment information"
              />
              <Button variant="outlined" size="small" sx={{ borderRadius: '8px' }}>
                Manage
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Account Security" 
                secondary="Password reset and security settings"
              />
              <Button variant="outlined" color="error" size="small" sx={{ borderRadius: '8px' }}>
                Change
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

const Orders = () => {
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box>
      <Card sx={{ borderRadius: '16px', mb: 3, overflow: 'visible' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            pt: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '.MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 120,
            },
          }}
        >
          <Tab label="Purchases" />
          <Tab label="Sold Items" />
        </Tabs>
        <CardContent sx={{ p: 3 }}>
          {activeTab === 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Purchase History
              </Typography>
              
              {purchaseHistory.map((item) => (
                <Card 
                  key={item.id}
                  sx={{ 
                    mb: 2, 
                    borderRadius: '12px',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={2}>
                        <Box 
                          component="img" 
                          src={item.image}
                          alt={item.name}
                          sx={{ 
                            width: '100%', 
                            borderRadius: '8px',
                            aspectRatio: '1',
                            objectFit: 'contain',
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(0, 0, 0, 0.2)'
                              : 'rgba(255, 255, 255, 0.9)',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Order Date: {new Date(item.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontWeight: 600,
                            mb: 1,
                            backgroundColor: item.status === 'Delivered' 
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.info.main, 0.1),
                            color: item.status === 'Delivered'
                              ? theme.palette.success.main
                              : theme.palette.info.main,
                          }}
                        >
                          {item.status}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            sx={{ mr: 1, borderRadius: '8px' }}
                          >
                            Details
                          </Button>
                          <Button 
                            size="small"
                            color="secondary"
                            sx={{ borderRadius: '8px' }}
                          >
                            Support
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          
          {activeTab === 1 && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Selling History
              </Typography>
              
              {sellingHistory.map((item) => (
                <Card 
                  key={item.id}
                  sx={{ 
                    mb: 2, 
                    borderRadius: '12px',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={2}>
                        <Box 
                          component="img" 
                          src={item.image}
                          alt={item.name}
                          sx={{ 
                            width: '100%', 
                            borderRadius: '8px',
                            aspectRatio: '1',
                            objectFit: 'contain',
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(0, 0, 0, 0.2)'
                              : 'rgba(255, 255, 255, 0.9)',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sell Date: {new Date(item.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontWeight: 600,
                            mb: 1,
                            backgroundColor: item.status === 'Sold' 
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                            color: item.status === 'Sold'
                              ? theme.palette.success.main
                              : theme.palette.warning.main,
                          }}
                        >
                          {item.status}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            sx={{ mr: 1, borderRadius: '8px' }}
                          >
                            Details
                          </Button>
                          <Button 
                            size="small"
                            component={RouterLink}
                            to="/sell"
                            color="primary"
                            sx={{ borderRadius: '8px' }}
                          >
                            Sell Again
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const Favorites = () => {
  const { theme } = useTheme();

  return (
    <Box>
      <Card sx={{ borderRadius: '16px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Saved Items
          </Typography>
          
          <Grid container spacing={2}>
            {savedItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[5],
                    },
                    position: 'relative',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      zIndex: 1 
                    }}
                  >
                    <Box
                      component="button"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(4px)',
                        cursor: 'pointer',
                        color: theme.palette.error.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        },
                      }}
                    >
                      <FavoriteIcon fontSize="small" />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 140,
                        objectFit: 'contain',
                        borderRadius: '8px',
                        mb: 2,
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(0, 0, 0, 0.2)'
                          : 'rgba(255, 255, 255, 0.9)',
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
                    >
                      ${item.price.toFixed(2)}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={`/products/${item.id}`}
                      fullWidth
                      sx={{ borderRadius: '8px' }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <Box>
      <Card sx={{ borderRadius: '16px', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Theme Settings
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="body1" fontWeight="medium">
                Dark Mode
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toggle between light and dark themes
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={toggleTheme}
              sx={{ borderRadius: '8px' }}
            >
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Account Settings
          </Typography>
          
          <List sx={{ width: '100%' }}>
            <ListItem 
              sx={{ 
                px: 3, 
                py: 2,
                borderRadius: '12px',
                mb: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    Profile Information
                  </Typography>
                }
                secondary="Update your personal details"
              />
              <Button variant="outlined" size="small" sx={{ borderRadius: '8px' }}>
                Edit
              </Button>
            </ListItem>
            
            <ListItem 
              sx={{ 
                px: 3, 
                py: 2,
                borderRadius: '12px',
                mb: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    Password & Security
                  </Typography>
                }
                secondary="Manage your password and security settings"
              />
              <Button variant="outlined" size="small" sx={{ borderRadius: '8px' }}>
                Update
              </Button>
            </ListItem>
            
            <ListItem 
              sx={{ 
                px: 3, 
                py: 2,
                borderRadius: '12px',
                mb: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    Sign Out
                  </Typography>
                }
                secondary="Log out from all devices"
              />
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                component={RouterLink}
                to="/auth/login" 
                sx={{ borderRadius: '8px' }}
              >
                Sign Out
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: 'error.main' }}>
            Danger Zone
          </Typography>
          
          <Box sx={{ p: 3, border: `1px solid ${theme.palette.error.main}`, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Delete Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Once deleted, your account cannot be recovered
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="error"
                sx={{ borderRadius: '8px' }}
              >
                Delete Account
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

interface TabOption {
  label: string;
  path: string;
  icon: React.ReactElement;
  component: React.ReactNode;
}

const DashboardPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Define tabs with their icons, paths, and components
  const tabs: TabOption[] = [
    { 
      label: 'Profile', 
      path: '/dashboard/profile', 
      icon: <PersonIcon />, 
      component: <Profile />
    },
    { 
      label: 'Orders', 
      path: '/dashboard/orders', 
      icon: <ShoppingBagIcon />, 
      component: <Orders />
    },
    { 
      label: 'Favorites', 
      path: '/dashboard/favorites', 
      icon: <FavoriteIcon />, 
      component: <Favorites />
    },
    { 
      label: 'Settings', 
      path: '/dashboard/settings', 
      icon: <SettingsIcon />, 
      component: <Settings />
    },
  ];
  
  // Find current active tab
  const currentTab = tabs.findIndex(tab => 
    location.pathname === tab.path || location.pathname === tab.path + '/'
  );
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component={motion.div}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ 
              fontWeight: 700,
              mb: 1,
              background: isDark
                ? 'linear-gradient(90deg, #4d8df7, #1de9b6)'
                : 'linear-gradient(90deg, #0062e6, #00b248)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: isDark
                ? '0 0 20px rgba(0, 98, 230, 0.3)'
                : 'none',
            }}
          >
            My Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your orders, saved items, and account settings
          </Typography>
        </Box>
        
        <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}`, mb: 3 }}>
          <Tabs 
            value={currentTab >= 0 ? currentTab : 0}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : undefined}
            allowScrollButtonsMobile={isMobile}
            sx={{
              '.MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minHeight: 48,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab 
                key={tab.label}
                label={!isMobile ? tab.label : undefined}
                icon={tab.icon}
                iconPosition="start"
                sx={{ 
                  minWidth: 90,
                  '& .MuiSvgIcon-root': {
                    mr: !isMobile ? 1 : 0
                  },
                  px: !isMobile ? 2 : 1
                }}
              />
            ))}
          </Tabs>
        </Box>
        
        <Box>
          <Routes>
            {tabs.map((tab) => (
              <Route key={tab.path} path={tab.path.replace('/dashboard/', '')} element={tab.component} />
            ))}
            <Route path="*" element={<Navigate to="/dashboard/profile" replace />} />
          </Routes>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;