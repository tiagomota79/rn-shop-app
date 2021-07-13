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
    deleteProduct: (state, action) => {
      const productId = action.payload;

      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== productId
        ),
      };
    },
  },
});

export const { deleteProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.availableProducts;
export const selectUserProducts = (state) => state.products.userProducts;

export default productsSlice.reducer;
