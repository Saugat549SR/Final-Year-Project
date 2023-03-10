import { ADD_To_CART } from '../constants/cartConstants';
import axios from 'axios';

export const addItemsToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_To_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};