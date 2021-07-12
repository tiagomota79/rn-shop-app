import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../slices/productsSlice';
import cartReducer from '../slices/cartSlice';
import orderReducer from '..//slices/orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
