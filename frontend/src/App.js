import { Route, Routes, Navigate } from 'react-router-dom';
import Index from './components/Main/Index';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductDetails } from './components/Main/Products/ProductDetails';
import { ProductsPage } from './components/Main/Products/ProductsPage';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Profile from './components/User/profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Cart from './components/Cart/Cart';
import store from './store';
import { loadUser } from './actions/userAction';
import React from 'react';
import ProtectedRoute from './components/Route/ProtectedRoute';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import { RentDetails } from './components/Main/Rents/RentDetails';
import { RentsPage } from './components/Main/Rents/RentsPage';

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/product/:id" exact element={<ProductDetails />} />
        <Route path="/rent/:id" exact element={<RentDetails />} />
        <Route path="/products" exact element={<ProductsPage />} />
        <Route path="/rents" exact element={<RentsPage />} />
        {/* <Route path="/products/:keyword" exact element={<ProductsPage />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" exact element={<Dashboard />} />
          <Route path="/admin/products" exact element={<ProductList />} />
          <Route path="/admin/product" exact element={<NewProduct />} />
          <Route path="/account" exact element={<Profile />} />
          <Route path="/me/update" exact element={<UpdateProfile />} />
          <Route path="/password/update" exact element={<UpdatePassword />} />
        </Route>
        <Route path="/password/forgot" exact element={<ForgotPassword />} />
        <Route
          path="/password/reset/:token"
          exact
          element={<ResetPassword />}
        />
        <Route path="/cart" exact element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
