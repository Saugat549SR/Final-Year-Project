import { Route, Routes, Navigate } from 'react-router-dom';
import Index from './components/Main/Index';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductDetails } from './components/Main/Products/ProductDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Profile from './components/User/profile';
import UpdateProfile from './components/User/UpdateProfile';
import store from './store';
import { loadUser } from './actions/userAction';
import React from 'react';

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
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/product/:id" exact element={<ProductDetails />} />
        <Route path="/admin/dashboard" exact element={<Dashboard />} />
        <Route path="/admin/products" exact element={<ProductList />} />
        <Route path="/admin/product" exact element={<NewProduct />} />
        <Route path="/account" exact element={<Profile />} />
        <Route path="/update" exact element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
