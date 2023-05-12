import * as React from 'react';
import { useState, Fragment } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ShoppingCart, Login } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';

import { Badge, Button, Select } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(65),
    width: 'auto',
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;
export function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.user);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };
  const logoutHand = () => {
    dispatch(logout());
    alert.success('Logged out Successfully');
  };
  const firstName = `${user && user.firstName}`;
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <Fragment>
          {user && user.role !== 'admin' ? (
            <Link
              to="/order"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>Orders</MenuItem>
            </Link>
          ) : (
            <Link
              to="/admin/dashboard"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>Dashboard</MenuItem>
            </Link>
          )}
          <Link
            to="/account"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem>My account</MenuItem>
          </Link>
          <Link
            to="/"
            onClick={logoutHand}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem>Logout</MenuItem>
          </Link>
        </Fragment>
      ) : (
        !loading && (
          <Link to="/login">
            <Login />
          </Link>
        )
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky">
      <Toolbar>
        <Text
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            BIKE BARN
          </Link>
        </Text>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Icons>
            <Badge>
              <Link to="/cart">
                <Badge badgeContent={`${cartItems.length}`} color="secondary">
                  <ShoppingCart sx={{ fontSize: '25px' }} />
                </Badge>
              </Link>
            </Badge>
          </Icons>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
            <MenuItem> {user?.firstName}</MenuItem>
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
}
