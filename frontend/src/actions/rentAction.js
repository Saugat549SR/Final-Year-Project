import axios from 'axios';
import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  CLEAR_ERRORS,
} from '../constants/rentConstants';

// get all product --products
export const getRentProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_RENT_REQUEST,
    });
    const { data } = await axios.get('/api/v1/rents');

    dispatch({
      type: ALL_RENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing Erros
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
