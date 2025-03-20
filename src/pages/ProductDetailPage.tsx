import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Card,
  CardMedia,
  Stack,
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  alpha,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SyncIcon from '@mui/icons-material/Sync';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useTheme from '../hooks/useTheme';
import { fadeIn } from '../animations/fadeVariants';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Mock product data - In a real app this would come from an API
const product = {
  id: 1,
  name: 'iPhone 13 Pro',
  category: 'Smartphones',
  brand: 'Apple',
  condition: 'Excellent',
  price: 649.99,
  originalPrice: 999.99,
  discount: 0.35,
  rating: 4.7,
  reviewCount: 128,
  stock: 5,
  description: 'A lightning-fast chip. A leap in battery life. And all-new photo and video capabilities. iPhone 13 Pro Max lets you do things you never could before.',
  features: [
    'A15 Bionic chip with 6-core CPU',
    'Super Retina XDR display with ProMotion',
    'Pro camera system with 12MP telephoto, wide, and ultrawide',
    'Up to 28 hours video playback',
    'Face ID for secure authentication',
    '5G capable for faster downloads and streaming'
  ],
  specs: {
    display: '6.1" Super Retina XDR display with ProMotion',
    processor: 'A15 Bionic chip',
    memory: '6GB RAM',
    storage: '128GB',
    battery: 'Li-Ion 3095 mAh',
    camera: 'Triple 12MP camera system',
    os: 'iOS 15',
  },
  images: [
    'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop',
  ],
  ecoCertification: 'Gold',
  carbonOffset: '12kg',
  refurbishmentDate: '2023-10-15',
  warranty: '12 months',
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductDetailPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simulate loading product data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const ecoRatingColor = () => {
    switch (product.ecoCertification) {
      case 'Gold':
        return 'success.main';
      case 'Silver':
        return 'info.main';
      case 'Bronze':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <LoadingSpinner message="Loading product details..." />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
        {/* Back navigation */}
        <Box sx={{ mb: 2 }}>
          <Button
            component={RouterLink}
            to="/products"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            Back to Products
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={product.images[selectedImage]}
                  alt={product.name}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.common.black, 0.2)
                      : alpha(theme.palette.common.white, 0.9),
                    p: 4,
                  }}
                />
              </Card>
              
              {/* Thumbnail images */}
              <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                {product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: index === selectedImage
                          ? `2px solid ${theme.palette.primary.main}`
                          : `1px solid ${theme.palette.divider}`,
                        opacity: index === selectedImage ? 1 : 0.7,
                        transition: 'all 0.2s ease-in-out',
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
              
              {/* Sustainability info */}
              <Card
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: '16px',
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <RecyclingIcon sx={{ color: 'success.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Eco-friendly Choice
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This refurbished device saved {product.carbonOffset} of CO2 emissions
                    </Typography>
                  </Box>
                  <Chip
                    label={`${product.ecoCertification} Certified`}
                    sx={{ 
                      ml: 'auto',
                      color: ecoRatingColor(),
                      borderColor: ecoRatingColor(),
                      backgroundColor: alpha(theme.palette.success.main, 0.05),
                    }}
                    variant="outlined"
                  />
                </Stack>
              </Card>
            </motion.div>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Product Header */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Chip 
                    label={product.brand} 
                    size="small" 
                    color="primary" 
                  />
                  <IconButton
                    onClick={handleToggleFavorite}
                    sx={{ 
                      color: isFavorite ? 'error.main' : 'text.secondary',
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Stack>
                
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    my: 1,
                  }}
                >
                  {product.name}
                </Typography>
                
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({product.rating}) • {product.reviewCount} reviews
                  </Typography>
                </Stack>
              </Box>
              
              {/* Price and Discount */}
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="baseline" spacing={2}>
                  <Typography 
                    variant="h4" 
                    component="p" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  
                  {product.originalPrice && (
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      ${product.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                  
                  {product.discount > 0 && (
                    <Chip
                      label={`${Math.round(product.discount * 100)}% OFF`}
                      color="error"
                      size="small"
                    />
                  )}
                </Stack>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Free shipping & 30-day returns
                </Typography>
              </Box>
              
              {/* Condition */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Condition
                </Typography>
                <Chip
                  label={product.condition}
                  color="primary"
                  sx={{ 
                    borderRadius: '8px',
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Refurbished on {new Date(product.refurbishmentDate).toLocaleDateString()}
                </Typography>
              </Box>
              
              {/* Quick Specs */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ScreenshotMonitorIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Display
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      6.1"
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <MemoryIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Processor
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      A15
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <StorageIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Storage
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      128GB
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BatteryChargingFullIcon sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Battery
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      3095 mAh
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Actions */}
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                  }}
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/checkout"
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                  }}
                >
                  Buy Now
                </Button>
              </Stack>
              
              {/* Benefits */}
              <Card
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Benefits
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <VerifiedUserIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="body2">
                        {product.warranty} Warranty
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocalShippingIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="body2">
                        Free Shipping
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SyncIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="body2">
                        30-Day Returns
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="body2">
                        Quality Tested
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </motion.div>
          </Grid>

          {/* Product Details Tabs */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card
                sx={{
                  mt: 2,
                  borderRadius: '20px',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Tabs 
                  value={selectedTab} 
                  onChange={handleTabChange}
                  variant={isMobile ? "fullWidth" : "standard"}
                  sx={{
                    px: { xs: 1, md: 3 },
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '.MuiTab-root': {
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      py: 2,
                    },
                  }}
                >
                  <Tab label="Description" id="product-tab-0" />
                  <Tab label="Features" id="product-tab-1" />
                  <Tab label="Specifications" id="product-tab-2" />
                </Tabs>
                
                <Box sx={{ px: { xs: 2, md: 4 }}}>
                  <TabPanel value={selectedTab} index={0}>
                    <Typography variant="body1" component="div">
                      {product.description}
                    </Typography>
                  </TabPanel>
                  
                  <TabPanel value={selectedTab} index={1}>
                    <List>
                      {product.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                  
                  <TabPanel value={selectedTab} index={2}>
                    <Grid container spacing={3}>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ textTransform: 'capitalize' }}>
                            {key}
                          </Typography>
                          <Typography variant="body1">{value}</Typography>
                          <Divider sx={{ mt: 1 }} />
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;