import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Divider,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Drawer,
  alpha,
  OutlinedInput,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useTheme from '../hooks/useTheme';
import { staggerGrid, gridItem } from '../animations/staggerVariants';
import { fadeIn } from '../animations/fadeVariants';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Mock products data
const allProducts = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    category: 'Smartphones',
    brand: 'Apple',
    condition: 'Excellent',
    price: 649.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop',
    discount: 0.35,
    rating: 4.7,
    stock: 5,
    featured: true,
  },
  {
    id: 2,
    name: 'MacBook Air M1',
    category: 'Laptops',
    brand: 'Apple',
    condition: 'Good',
    price: 749.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop',
    discount: 0.25,
    rating: 4.9,
    stock: 3,
    featured: true,
  },
  {
    id: 3,
    name: 'Samsung Galaxy Tab S7',
    category: 'Tablets',
    brand: 'Samsung',
    condition: 'Very Good',
    price: 399.99,
    originalPrice: 649.99,
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=800&auto=format&fit=crop',
    discount: 0.38,
    rating: 4.5,
    stock: 8,
    featured: true,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    brand: 'Sony',
    condition: 'Like New',
    price: 199.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    discount: 0.43,
    rating: 4.8,
    stock: 12,
    featured: true,
  },
  {
    id: 5,
    name: 'Dell XPS 13',
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Good',
    price: 849.99,
    originalPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    discount: 0.35,
    rating: 4.4,
    stock: 2,
    featured: false,
  },
  {
    id: 6,
    name: 'Samsung Galaxy S21',
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Very Good',
    price: 499.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    discount: 0.38,
    rating: 4.6,
    stock: 7,
    featured: false,
  },
  {
    id: 7,
    name: 'iPad Pro 11-inch',
    category: 'Tablets',
    brand: 'Apple',
    condition: 'Excellent',
    price: 649.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    discount: 0.28,
    rating: 4.7,
    stock: 4,
    featured: false,
  },
  {
    id: 8,
    name: 'Bose QuietComfort 45',
    category: 'Audio',
    brand: 'Bose',
    condition: 'Excellent',
    price: 229.99,
    originalPrice: 329.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    discount: 0.3,
    rating: 4.6,
    stock: 9,
    featured: false,
  },
  {
    id: 9,
    name: 'Google Pixel 6 Pro',
    category: 'Smartphones',
    brand: 'Google',
    condition: 'Like New',
    price: 549.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae324e?q=80&w=800&auto=format&fit=crop',
    discount: 0.39,
    rating: 4.5,
    stock: 6,
    featured: false,
  },
  {
    id: 10,
    name: 'Lenovo ThinkPad X1',
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Good',
    price: 899.99,
    originalPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop',
    discount: 0.4,
    rating: 4.7,
    stock: 3,
    featured: false,
  },
  {
    id: 11,
    name: 'Microsoft Surface Pro 8',
    category: 'Tablets',
    brand: 'Microsoft',
    condition: 'Very Good',
    price: 749.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1617125169688-8656d34bbd8c?q=80&w=800&auto=format&fit=crop',
    discount: 0.32,
    rating: 4.6,
    stock: 5,
    featured: false,
  },
  {
    id: 12,
    name: 'Apple Watch Series 7',
    category: 'Wearables',
    brand: 'Apple',
    condition: 'Excellent',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop',
    discount: 0.25,
    rating: 4.8,
    stock: 8,
    featured: false,
  },
];

// Get unique categories, brands, and conditions for filters
const categories = [...new Set(allProducts.map(product => product.category))];
const brands = [...new Set(allProducts.map(product => product.brand))];
const conditions = [...new Set(allProducts.map(product => product.condition))];

interface ProductProps {
  id: number;
  name: string;
  category: string;
  brand: string;
  condition: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  rating: number;
  stock: number;
  featured: boolean;
}

interface FilterState {
  search: string;
  category: string;
  brand: string;
  condition: string;
  priceRange: [number, number];
  sortBy: string;
}

const ProductsPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  const maxPrice = Math.max(...allProducts.map(p => p.price));
  const minPrice = Math.min(...allProducts.map(p => p.price));
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    brand: '',
    condition: '',
    priceRange: [minPrice, maxPrice],
    sortBy: 'featured',
  });
  
  // Simulate loading products
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                           product.category.toLowerCase().includes(filters.search.toLowerCase());
    
    // Category filter
    const matchesCategory = filters.category === '' || product.category === filters.category;
    
    // Brand filter
    const matchesBrand = filters.brand === '' || product.brand === filters.brand;
    
    // Condition filter
    const matchesCondition = filters.condition === '' || product.condition === filters.condition;
    
    // Price range filter
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });
  
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const handleToggleFavorite = (productId: number) => {
    if (favoriteProducts.includes(productId)) {
      setFavoriteProducts(favoriteProducts.filter(id => id !== productId));
    } else {
      setFavoriteProducts([...favoriteProducts, productId]);
    }
  };
  
  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      condition: '',
      priceRange: [minPrice, maxPrice],
      sortBy: 'featured',
    });
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  
  const renderFilters = () => (
    <Box sx={{ p: isMobile ? 2 : 0 }}>
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <IconButton onClick={toggleFilterDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      
      {/* Search input */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <OutlinedInput
          id="search-products"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          }
          endAdornment={
            filters.search && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={() => handleFilterChange('search', '')}
                  edge="end"
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }
          sx={{
            borderRadius: '8px',
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
            },
          }}
        />
      </FormControl>
      
      {/* Category filter */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          label="Category"
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Brand filter */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel>Brand</InputLabel>
        <Select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          label="Brand"
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="">All Brands</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Condition filter */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel>Condition</InputLabel>
        <Select
          value={filters.condition}
          onChange={(e) => handleFilterChange('condition', e.target.value)}
          label="Condition"
          sx={{ borderRadius: '8px' }}
        >
          <MenuItem value="">All Conditions</MenuItem>
          {conditions.map((condition) => (
            <MenuItem key={condition} value={condition}>
              {condition}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Price range filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Price Range
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[0].toFixed(0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[1].toFixed(0)}
          </Typography>
        </Box>
        <Slider
          value={filters.priceRange}
          onChange={(_, value) => handleFilterChange('priceRange', value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={minPrice}
          max={maxPrice}
          step={10}
          sx={{ 
            color: 'primary.main',
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
              },
            },
          }}
        />
      </Box>
      
      {/* Reset filters button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={resetFilters}
        fullWidth
        sx={{ borderRadius: '8px' }}
      >
        Reset Filters
      </Button>
    </Box>
  );

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
        {/* Page Header */}
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
            Browse Products
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Quality refurbished electronics at unbeatable prices
          </Typography>
        </Box>

        {/* Mobile sort and filter buttons */}
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<TuneIcon />}
              onClick={toggleFilterDrawer}
              fullWidth
              sx={{ borderRadius: '8px' }}
            >
              Filters
            </Button>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                displayEmpty
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Best Rated</MenuItem>
                <MenuItem value="discount">Biggest Discounts</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Filter sidebar for desktop */}
          {!isMobile && (
            <Grid item xs={12} md={3} lg={2.5}>
              <Card
                sx={{
                  borderRadius: '16px',
                  position: 'sticky',
                  top: '100px',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(8px)',
                  p: 3,
                  border: `1px solid ${theme.palette.divider}`,
                }}
                elevation={0}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Filters
                  </Typography>
                  <Divider />
                </Box>
                {renderFilters()}
              </Card>
            </Grid>
          )}

          {/* Products grid */}
          <Grid item xs={12} md={9} lg={9.5}>
            {/* Sort controls - Desktop */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body1">
                  Showing <strong>{filteredProducts.length}</strong> products
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Sort by:
                  </Typography>
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                    <Select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      displayEmpty
                      sx={{ borderRadius: '8px' }}
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-asc">Price: Low to High</MenuItem>
                      <MenuItem value="price-desc">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Best Rated</MenuItem>
                      <MenuItem value="discount">Biggest Discounts</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            )}

            {/* Products */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <LoadingSpinner message="Loading products..." />
              </Box>
            ) : filteredProducts.length === 0 ? (
              <Box 
                sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 3,
                  borderRadius: '16px',
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                  Try changing your search criteria or filters
                </Typography>
                <Button variant="contained" color="primary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </Box>
            ) : (
              <Grid
                container
                spacing={3}
                component={motion.div}
                variants={staggerGrid}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                          {/* Discount badge */}
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
                              }}
                            />
                          )}
                          
                          {/* Favorite button */}
                          <IconButton
                            onClick={() => handleToggleFavorite(product.id)}
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              backgroundColor: alpha(theme.palette.background.paper, 0.7),
                              backdropFilter: 'blur(5px)',
                              zIndex: 1,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              },
                            }}
                            size="small"
                          >
                            {favoriteProducts.includes(product.id) ? (
                              <FavoriteIcon fontSize="small" color="error" />
                            ) : (
                              <FavoriteBorderIcon fontSize="small" />
                            )}
                          </IconButton>
                          
                          <CardMedia
                            component="img"
                            height="180"
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
                            <Box sx={{ mb: 1 }}>
                              <Typography 
                                variant="overline" 
                                color="primary" 
                                sx={{ fontSize: '0.75rem' }}
                              >
                                {product.brand} • {product.category}
                              </Typography>
                            </Box>
                            <Typography 
                              gutterBottom 
                              variant="h6" 
                              component="h3" 
                              sx={{ 
                                fontWeight: 600,
                                height: '3rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
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
                              <Typography 
                                variant="h6" 
                                component="span" 
                                sx={{ fontWeight: 700, color: 'primary.main' }}
                              >
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
                            
                            {/* Stock indicator */}
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 1,
                                color: product.stock <= 2 ? 'error.main' : 'success.main',
                              }}
                            >
                              {product.stock <= 2
                                ? `Only ${product.stock} left in stock!`
                                : 'In Stock'}
                            </Typography>
                          </CardContent>
                          <Box sx={{ p: 2, pt: 0 }}>
                            <Button
                              component={RouterLink}
                              to={`/products/${product.id}`}
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={{ borderRadius: '8px', mb: 1 }}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              fullWidth
                              sx={{ borderRadius: '8px' }}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Filter drawer for mobile */}
        <Drawer
          anchor="left"
          open={filterDrawerOpen && isMobile}
          onClose={toggleFilterDrawer}
          PaperProps={{
            sx: {
              width: '85%',
              maxWidth: '350px',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              p: 2,
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.95)
                : alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)',
            },
          }}
        >
          {renderFilters()}
        </Drawer>
      </Box>
    </Container>
  );
};

export default ProductsPage;