import { createSlice } from '@reduxjs/toolkit';

import PRODUCTS from '../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    products: (state, action) => {
      return state;
    },
  },
});

export const { products } = productsSlice.actions;

export const selectProducts = (state) => state.products.availableProducts;

export default productsSlice.reducer;
