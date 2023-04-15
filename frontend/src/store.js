import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  newProductReducer,
  productDetailsReducer,
  productReducer,
  DeleteProductReducer,
} from './reducers/productReducer';
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { rentDetailsReducer, rentReducer } from './reducers/rentReducer';
import {
  allOrderReducer,
  orderReducer,
  orderDetailsReducer,
} from './reducers/orderReducer';
import { createCategoryReducer } from './reducers/categoryReducer';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  deleteProduct: DeleteProductReducer,
  user: userReducer,
  cart: cartReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  rents: rentReducer,
  rentDetails: rentDetailsReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  createCategory: createCategoryReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
