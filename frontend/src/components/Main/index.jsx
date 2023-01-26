import { Navbar } from './Homepage/Navbar';
import { Box } from '@mui/material';
import { Feed } from './Homepage/Feed';
import Footer from './Homepage/Footer';
import Product from './Products/Product';
import '../Main/Products/product.css';

const product = {
  name: 'Duke',
  images: [
    {
      url: 'https://www.nepbike.com/_next/image?url=https://assets.nepbike.com/20211122/ktm-duke-200-orange-0b72dfca.png&w=640&q=75',
    },
  ],
  Price: 'Rs 300000',
  _id: 'saugat',
};

const Main = () => {
  return (
    <Box>
      <Navbar />
      <Feed />
      <h2 className="homeHeading">Features Products</h2>
      <div className="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
      <Footer />
    </Box>
  );
};

export default Main;
