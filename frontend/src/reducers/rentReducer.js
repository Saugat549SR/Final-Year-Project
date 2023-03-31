import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  CLEAR_ERRORS,
  RENT_DETAILS_REQUEST,
  RENT_DETAILS_SUCCESS,
  RENT_DETAILS_FAIL,
} from '../constants/rentConstants';

export const rentReducer = (state = { rents: [] }, action) => {
  switch (action.type) {
    case ALL_RENT_REQUEST:
      return {
        loading: true,
        rents: [],
      };

    case ALL_RENT_SUCCESS:
      return {
        loading: false,
        rents: action.payload.rents,
        rentsCount: action.payload.rentsCount,
      };

    case ALL_RENT_FAIL:
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

export const rentDetailsReducer = (state = { rent: {} }, action) => {
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
