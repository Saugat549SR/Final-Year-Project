import axios from 'axios';
import {
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from '../constants/categoryConstants';

export const createCategory = (form) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const env = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(`/api/v1/create/category`, form, env);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
    console.log(error.response.data.message);
  }
};

//clearing Erros
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
