import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from '../slices/productsSlice';
import cartReducer from '../slices/cartSlice';
import orderReducer from '..//slices/orderSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
