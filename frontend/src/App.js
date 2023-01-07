// import {Route,Routes,Navigate} from 'react-router-dom';
// import Main from './components/Main';
// import Signup from "./components/Signup";
// import Login from './components/Login';
// import OtpForm from './components/Signup/OtpForm';
// import ForgotPassword from './components/ForgotPassword';
import { Navbar } from './components/Main/Navbar';
import { Box } from '@mui/material';
import { Feed } from './components/Main/Feed';

function App() {
  //const user = localStorage.getItem('token');
  return (
    //  <Routes>
    //  {user && <Route path="/" exact element={<Main />} />}
    // 		<Route path="/signup" exact element={<Signup />} />
    // 		<Route path="/login" exact element={<Login />} />
    // 		<Route path="/" element={<Navigate replace to="/login" />} />
    //     <Route path="/otpform" exact element={<OtpForm />} />
    //     <Route path="/forgot-password" exact element={<ForgotPassword/>}/>

    //  </Routes>
    <Box>
      <Navbar />
      <Feed />
    </Box>
  );
}

export default App;
