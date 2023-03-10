import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../../actions/productAction';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from '../../../actions/cartAction';
export const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const params = useParams();
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id));
    alert.success('Item Added to Cart');
  };

  return (
    <Fragment>
      <div className="ProductDetails">
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-3">
            <h1>{`Rs ${product.price}`}</h1>

            <button onClick={addToCartHandler}>Add to Cart</button>
          </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
