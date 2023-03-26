import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  CLEAR_ERRORS,
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
