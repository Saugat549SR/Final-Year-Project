import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './RentDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getRentDetails } from '../../../actions/rentAction';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Homepage/Navbar';
import { useAlert } from 'react-alert';
import { DatePicker } from 'antd';
import { DateTime } from 'luxon';
const { RangePicker } = DatePicker;
export const RentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { rent, loading, error } = useSelector((state) => state.rentDetails);
  const params = useParams();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getRentDetails(params.id));
  }, [dispatch, params.id]);

  const selectTimeSlots = (values) => {
    setFrom(
      DateTime.fromJSDate(values[0].toDate()).toFormat('MMM dd yyyy HH:mm')
    );
    setTo(
      DateTime.fromJSDate(values[1].toDate()).toFormat('MMM dd yyyy HH:mm')
    );
    setTotalDays(values[1].diff(values[0], 'Days'));
  };

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
            <h2 className="product-price">{`Rs ${rent.price}`} per/day</h2>
            <p className="product-description">{rent.description}</p>
            <p>
              Status:
              <b className={rent.stock < 1 ? 'redColor' : 'greenColor'}>
                {rent.stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlots}
            />
            <div>
              <p>Total Days: {totalDays}</p>
            </div>
            <div>
              <h2>Total Amount: {rent.price * totalDays}</h2>
            </div>

            <div className="cart-buttons">
              <button
                className="add-to-cart-button"
                disabled={totalDays ? false : true}
              >
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
