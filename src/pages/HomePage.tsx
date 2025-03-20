import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  alpha,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import DevicesIcon from '@mui/icons-material/Devices';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import useTheme from '../hooks/useTheme';
import { fadeIn, fadeInUp } from '../animations/fadeVariants';
import { staggerContainer, staggerGrid, gridItem } from '../animations/staggerVariants';
import Button from '../components/common/Button';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    category: 'Phones',
    condition: 'Excellent',
    price: 649.99,
    discount: 0.2, // 20% off original price
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop',
    originalPrice: 799.99,
  },
  {
    id: 2,
    name: 'MacBook Air M1',
    category: 'Laptops',
    condition: 'Good',
    price: 749.99,
    discount: 0.25, // 25% off original price
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
    originalPrice: 999.99,
  },
  {
    id: 3,
    name: 'Samsung Galaxy Tab S7',
    category: 'Tablets',
    condition: 'Very Good',
    price: 399.99,
    discount: 0.33, // 33% off original price
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=800&auto=format&fit=crop',
    originalPrice: 599.99,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    condition: 'Like New',
    price: 199.99,
    discount: 0.4, // 40% off original price
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    originalPrice: 349.99,
  },
];

// Product categories
const categories = [
  { name: 'Smartphones', icon: 'https://cdn-icons-png.flaticon.com/512/545/545245.png', path: '/products/category/smartphones' },
  { name: 'Laptops', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png', path: '/products/category/laptops' },
  { name: 'Tablets', icon: 'https://cdn-icons-png.flaticon.com/512/2329/2329087.png', path: '/products/category/tablets' },
  { name: 'Monitors', icon: 'https://cdn-icons-png.flaticon.com/512/689/689396.png', path: '/products/category/monitors' },
  { name: 'Audio', icon: 'https://cdn-icons-png.flaticon.com/512/860/860388.png', path: '/products/category/audio' },
  { name: 'Accessories', icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105768.png', path: '/products/category/accessories' },
];

// Features list
const features = [
  {
    title: 'Quality Refurbished Products',
    description: 'All devices undergo rigorous testing and refurbishment by certified technicians.',
    icon: <DevicesIcon fontSize="large" />,
    color: 'primary',
  },
  {
    title: 'Reduce E-Waste',
    description: 'Extending the life of electronics helps reduce the 50 million tons of e-waste produced annually.',
    icon: <RecyclingIcon fontSize="large" />,
    color: 'success',
  },
  {
    title: '12-Month Warranty',
    description: 'All our refurbished products come with our comprehensive 12-month warranty.',
    icon: <VerifiedIcon fontSize="large" />,
    color: 'info',
  },
  {
    title: 'Fast & Free Shipping',
    description: 'Free carbon-neutral shipping on all orders over $50 within the continental US.',
    icon: <LocalShippingIcon fontSize="large" />,
    color: 'secondary',
  },
];

const HomePage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '85vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          mb: 8,
        }}
      >
        {/* Background circuit animation */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.default, 0.8)
              : alpha(theme.palette.background.default, 0.85),
            zIndex: -1,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            alt="Circuit background"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: theme.palette.mode === 'dark' ? 0.2 : 0.1,
              filter: 'blur(2px)',
            }}
          />
        </Box>
        
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: isDark
                      ? 'linear-gradient(90deg, #4d8df7, #00e676)'
                      : 'linear-gradient(90deg, #0062e6, #00b248)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    textShadow: isDark
                      ? '0 0 20px rgba(0, 98, 230, 0.4)'
                      : 'none',
                  }}
                >
                  Recycle Tech. <br /> Save Earth.
                </Typography>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    maxWidth: '600px',
                  }}
                >
                  Buy and sell refurbished electronics at a fraction of their original cost. Save money while reducing electronic waste.
                </Typography>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 6 }}
                >
                  <Button
                    component={RouterLink}
                    to="/products"
                    variant="gradient"
                    color="primary"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                  >
                    Buy Refurbished
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/sell"
                    variant="gradient"
                    color="secondary"
                    size="large"
                    sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                  >
                    Sell Your Device
                  </Button>
                </Stack>
              </motion.div>
              
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
              >
                <Stack direction="row" spacing={4} alignItems="center">
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      10K+
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Devices recycled
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                      $2M+
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Customer savings
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      16K+
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Happy customers
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop"
                  alt="Recycled electronics"
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    filter: isDark ? 'drop-shadow(0 0 20px rgba(0, 98, 230, 0.3))' : 'none',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component={motion.h2}
            variant="h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Why Choose E-Cycle?
          </Typography>
          <Typography
            component={motion.p}
            variant="h6"
            color="textSecondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            sx={{ maxWidth: '700px', mx: 'auto' }}
          >
            We're on a mission to extend the life of electronics and reduce e-waste through responsible recycling and reselling.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div variants={gridItem}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    },
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette[feature.color as 'primary' | 'secondary' | 'success' | 'info'].main, 0.1),
                        mx: 'auto',
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        sx: { fontSize: 32, color: `${feature.color}.main` },
                      })}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Product Categories */}
      <Box
        sx={{
          py: 8,
          backgroundColor: theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.dark, 0.1)
            : alpha(theme.palette.primary.light, 0.05),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            zIndex: 0,
            background: 'url(https://cdn.pixabay.com/photo/2019/05/10/08/39/circuit-4192636_1280.jpg)',
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              component={motion.h2}
              variant="h2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Browse by Category
            </Typography>
            <Typography
              component={motion.p}
              variant="h6"
              color="textSecondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{ maxWidth: '700px', mx: 'auto' }}
            >
              Discover quality refurbished electronics across all major categories
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            component={motion.div}
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <motion.div variants={gridItem}>
                  <Button
                    component={RouterLink}
                    to={category.path}
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: '16px',
                      backgroundColor: alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(8px)',
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[4],
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={category.icon}
                      alt={category.name}
                      sx={{
                        width: 48,
                        height: 48,
                        mb: 1,
                        filter: isDark
                          ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))'
                          : 'none',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography
              component={motion.h2}
              variant="h2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ fontWeight: 700 }}
            >
              Featured Deals
            </Typography>
            <Typography
              component={motion.p}
              variant="h6"
              color="textSecondary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Top-rated refurbished products at unbeatable prices
            </Typography>
          </Box>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              component={RouterLink}
              to="/products"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: '8px',
                px: 3,
              }}
            >
              View All Products
            </Button>
          </motion.div>
        </Box>

        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <motion.div variants={gridItem}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: theme.shadows[2],
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                    position: 'relative',
                  }}
                >
                  {product.discount > 0 && (
                    <Chip
                      label={`${Math.round(product.discount * 100)}% OFF`}
                      color="secondary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        zIndex: 1,
                        borderRadius: '4px',
                        px: 1,
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: 'contain',
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.9)',
                      p: 2,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="overline" color="primary">
                      {product.category}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Condition:
                      </Typography>
                      <Chip
                        label={product.condition}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 2 }}>
                      <Typography variant="h5" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      {product.originalPrice && (
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.secondary',
                            ml: 1,
                          }}
                        >
                          ${product.originalPrice.toFixed(2)}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ borderRadius: '8px' }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            display: { xs: 'block', sm: 'none' },
          }}
        >
          <Button
            component={RouterLink}
            to="/products"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderRadius: '8px', px: 3 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
