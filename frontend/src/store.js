import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  newProductReducer,
  productDetailsReducer,
  productReducer,
} from './reducers/productReducer';
import { profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  user: userReducer,
  cart: cartReducer,
  profile: profileReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
