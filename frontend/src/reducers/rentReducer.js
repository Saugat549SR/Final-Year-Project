import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  ALL_RENT_REQUEST_HOME,
  ALL_RENT_SUCCESS_HOME,
  ALL_RENT_FAIL_HOME,
  CLEAR_ERRORS,
  RENT_DETAILS_REQUEST,
  RENT_DETAILS_SUCCESS,
  RENT_DETAILS_FAIL,
  RENT_SAVE_SHIPPING_INFO,
} from '../constants/rentConstants';

export const rentReducer = (state = { rents: [] }, action) => {
  switch (action.type) {
    case ALL_RENT_REQUEST:
    case ALL_RENT_REQUEST_HOME:
      return {
        loading: true,
        rents: [],
      };

    case ALL_RENT_SUCCESS:
    case ALL_RENT_SUCCESS_HOME:
      return {
        loading: false,
        rents: action.payload.rents,
        rentsCount: action.payload.rentsCount,
      };

    case ALL_RENT_FAIL:
    case ALL_RENT_FAIL_HOME:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const rentDetailsReducer = (
  state = { rent: {}, rentShippingInfo: {} },
  action
) => {
  switch (action.type) {
    case RENT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case RENT_DETAILS_SUCCESS:
      return {
        loading: false,
        rent: action.payload,
      };

    case RENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RENT_SAVE_SHIPPING_INFO:
      return {
        ...state,
        rentShippingInfo: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
