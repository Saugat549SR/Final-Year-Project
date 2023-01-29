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
import Loader from './Loader/Loader';
import { useAlert } from 'react-alert';

const Main = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <MetaData title="Bike Barn" />
          <Navbar />
          <Feed />
          <h2 className="homeHeading">Features Products</h2>
          <div className="container">
            {products &&
              products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Main;
