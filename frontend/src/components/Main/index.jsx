import { Navbar } from './Homepage/Navbar';
import { Box } from '@mui/material';
import { Feed } from './Homepage/Feed';
import Footer from './Homepage/Footer';
import Product from './Products/Product';
import '../Main/Products/product.css';
import MetaData from './Products/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';

const Main = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        'loading'
      ) : (
        <Box>
          <MetaData title="Bike Barn" />
          <Navbar />
          <Feed />
          <h2 className="homeHeading">Features Products</h2>
          <div className="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Main;
