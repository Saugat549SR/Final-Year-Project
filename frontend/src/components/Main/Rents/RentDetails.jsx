import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './RentDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getRentDetails } from '../../../actions/rentAction';
import { useParams } from 'react-router-dom';

import { Navbar } from '../Homepage/Navbar';
import { useAlert } from 'react-alert';

export const RentDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { rent, loading, error } = useSelector((state) => state.rentDetails);
  const params = useParams();

  useEffect(() => {
    dispatch(getRentDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <Fragment>
      <Navbar />
      <div className="single-product-main-content">
        <div className="single-product-page">
          <div className="left">
            <Carousel>
              {rent.images &&
                rent.images.map((item, i) => (
                  <img
                    key={item.url}
                    className="carousel-image"
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div className="right">
            <h1 className="product-title">{rent.name}</h1>
            <h2 className="product-price">{`Rs ${rent.price}`} per/hour</h2>
            <p className="product-description">{rent.description}</p>
            <p>
              Status:
              <b className={rent.stock < 1 ? 'redColor' : 'greenColor'}>
                {rent.stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>

            <div className="cart-buttons">
              <button className="add-to-cart-button">CheckOut</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
