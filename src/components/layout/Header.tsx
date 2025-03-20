import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Typography,
  useMediaQuery,
  alpha,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useTheme from '../../hooks/useTheme';
import ThemeToggle from '../common/ThemeToggle';
import { motion } from 'framer-motion';

// Styled search component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  backdropFilter: 'blur(8px)',
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Header: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // User menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Toggle mobile search
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
    }
  };

  // User menu handlers
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {/* Logo and brand */}
      <Box
        component={RouterLink}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          mr: 3,
        }}
      >
        <RecyclingIcon
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            mr: 1,
            color: theme.palette.primary.main,
            filter: isDark
              ? 'drop-shadow(0 0 5px rgba(0, 98, 230, 0.5))'
              : 'none',
          }}
        />
        <Typography
          variant="h5"
          noWrap
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
            display: { xs: 'none', sm: 'block' },
          }}
        >
          E-Cycle
        </Typography>
      </Box>

      {/* Navigation links - desktop only */}
      {!isMobile && (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Button
            component={RouterLink}
            to="/products"
            color="inherit"
            sx={{ mr: 1 }}
          >
            Products
          </Button>
          <Button
            component={RouterLink}
            to="/sell"
            color="inherit"
            sx={{ mr: 1 }}
          >
            Sell
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
            sx={{ mr: 1 }}
          >
            About
          </Button>
        </Box>
      )}

      {/* Search input */}
      {(!isMobile || (isMobile && isSearchActive)) && (
        <Box 
          component="form" 
          onSubmit={handleSearchSubmit}
          sx={{ 
            flexGrow: isMobile ? 1 : 0,
            display: 'flex',
            position: isMobile ? 'absolute' : 'static',
            left: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            top: isMobile ? 0 : 'auto',
            bottom: isMobile ? 0 : 'auto',
            p: isMobile ? 2 : 0,
            backgroundColor: isMobile ? theme.palette.mode === 'dark' 
              ? 'rgba(18, 18, 18, 0.95)'
              : 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: isMobile ? 'blur(10px)' : 'none',
            zIndex: isMobile ? 1200 : 1,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isMobile && isSearchActive}
            />
          </Search>
          {isMobile && (
            <IconButton onClick={toggleSearch} sx={{ ml: 1 }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}

      {/* Right side actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        {/* Search button (mobile) */}
        {isMobile && !isSearchActive && (
          <IconButton 
            onClick={toggleSearch}
            color="inherit"
            size="large"
            sx={{ ml: 1 }}
          >
            <SearchIcon />
          </IconButton>
        )}

        {/* Theme toggle */}
        <ThemeToggle size={isSmall ? 'small' : 'medium'} />

        {/* Cart button */}
        <IconButton
          color="inherit"
          size={isSmall ? 'small' : 'medium'}
          sx={{ ml: 1 }}
          component={RouterLink}
          to="/cart"
        >
          <Badge badgeContent={3} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* User menu */}
        <Box sx={{ ml: 1 }}>
          <IconButton
            onClick={handleOpenUserMenu}
            size={isSmall ? 'small' : 'medium'}
            sx={{
              ml: 1,
              border: open ? `1px solid ${theme.palette.primary.main}` : 'none',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(25,118,210,0.1))'
                : 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(25,118,210,0.05))',
            }}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1.5,
                p: 1,
                minWidth: 180,
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.9)
                  : alpha(theme.palette.background.paper, 0.9),
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <MenuItem component={RouterLink} to="/account/profile">
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem component={RouterLink} to="/account/favorites">
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              Favorites
            </MenuItem>
            <MenuItem component={RouterLink} to="/account/settings">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem component={RouterLink} to="/auth/login">
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;