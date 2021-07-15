import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from '../slices/productsSlice';
import cartReducer from '../slices/cartSlice';
import orderReducer from '../slices/orderSlice';
import authReducer from '../slices/authSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
