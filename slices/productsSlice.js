import { createSlice } from '@reduxjs/toolkit';

import PRODUCTS from '../data/dummy-data';
import Product from '../model/product';

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
    createProduct: (state, action) => {
      const { title, imageUrl, price, description } = action.payload;

      const newProduct = new Product(
        new Date().toString(),
        'u1',
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    },
    updateProduct: (state, action) => {
      const { id, title, imageUrl, description } = action.payload;

      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === id
      );

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === id
      );

      const productToUpdate = state.userProducts[userProductIndex];

      const updatedProduct = new Product(
        id,
        productToUpdate.ownerId,
        title,
        imageUrl,
        description,
        productToUpdate.price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    },
  },
});

export const { deleteProduct, createProduct, updateProduct } =
  productsSlice.actions;

export const selectProducts = (state) => state.products.availableProducts;
export const selectUserProducts = (state) => state.products.userProducts;

export default productsSlice.reducer;
