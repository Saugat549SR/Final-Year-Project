import { Navbar } from './Homepage/Navbar';
import { Box } from '@mui/material';
import { Feed } from './Homepage/Feed';
import Footer from './Homepage/Footer';

const Main = () => {
  return (
    <Box>
      <Navbar />
      <Feed />
      <Footer />
    </Box>
  );
};

export default Main;
