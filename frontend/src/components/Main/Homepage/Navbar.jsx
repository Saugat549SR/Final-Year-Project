import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  InputBase,
  Badge,
  MenuItem,
  Button,
  Select,
} from '@mui/material';
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone';
import { ShoppingCart, Login } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#5783db',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: '#DADBDD',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));
const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.user);
  const logoutHand = () => {
    dispatch(logout());
    alert.success('Logged out Successfully');
  };
  const firstName = `${user && user.firstName}`;
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" style={{ maxHeight: '50px' }}>
      <StyledToolbar>
        <Text
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          onClick={() => navigate('/')}
        >
          BIKE BARN
        </Text>
        <TwoWheelerTwoToneIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Search>
          <InputBase placeholder="search" />
        </Search>
        <Icons>
          <Badge>
            <Link to="/cart">
              <ShoppingCart />
            </Link>
          </Badge>
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}></UserBox>

        {user ? (
          <Select
            sx={{
              backgroundColor: 'white',
              width: '150px',
              borderRadius: '0.25rem',
              p: '0.25rem 1rem',
              '& .MuiSvgIcon-root': {
                pr: '0.25rem',
                width: '3rem',
              },
              '& .MuiSelect-select:focus': {
                backgroundColor: 'white',
              },
            }}
            input={<InputBase />}
          >
            <MenuItem>{user.firstName}</MenuItem>
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
          </Select>
        ) : (
          !loading && (
            <Button
              variant="contained"
              endIcon={<Login />}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )
        )}
      </StyledToolbar>
    </AppBar>
  );
};
