import { Navbar } from './Homepage/Navbar';
import { Box } from '@mui/material';
import { Feed } from './Homepage/Feed';
import Footer from './Homepage/Footer';
import Product from './Products/Product';
import '../Main/Products/product.css';
import MetaData from './Products/MetaData';
import { getProductHome } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Loader from './Loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

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
    dispatch(getProductHome());
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
          <div className="view">
            <Link to="/products">View Products</Link>
          </div>

          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Main;
