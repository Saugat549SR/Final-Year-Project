import { Route, Routes, Navigate } from 'react-router-dom';
import Index from './components/Main/Index';
import Signup from './components/Signup';
import Login from './components/Login';
import OtpForm from './components/Signup/OtpForm';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductDetails } from './components/Main/Products/ProductDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/otpform" exact element={<OtpForm />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/product/:id" exact element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
