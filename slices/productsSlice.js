import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '@env';

import PRODUCTS from '../data/dummy-data';
import Product from '../model/product';
import { firebaseObjectToArray } from '../utils';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export const setProducts = createAsyncThunk(
  'get/products',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}products.json`);

      const productsToSet = firebaseObjectToArray(response.data);

      dispatch(setProductsAction(productsToSet));
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const createProduct = createAsyncThunk(
  'post/product',
  async (params, { dispatch, rejectWithValue }) => {
    const productToCreate = {
      title: params.title,
      imageUrl: params.imageUrl,
      price: params.price,
      description: params.description,
    };

    try {
      const response = await axios.post(
        `${API_URL}products.json`,
        productToCreate
      );

      if (response.status === 200) {
        const id = response.data.name;
        dispatch(
          createProductAction({
            ...productToCreate,
            id,
          })
        );
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  'patch/product',
  async (params, { dispatch, rejectWithValue }) => {
    const id = params.id;

    const productToUpdate = {
      title: params.title,
      imageUrl: params.imageUrl,
      description: params.description,
    };

    try {
      const response = await axios.patch(
        `${API_URL}products/${id}.json`,
        productToUpdate
      );

      if (response.status === 200) {
        const { title, description, imageUrl } = await response.data;
        dispatch(updateProductAction({ id, title, description, imageUrl }));
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'delete/product',
  async (params, { dispatch, rejectWithValue }) => {
    const id = params;

    try {
      const response = await axios.delete(`${API_URL}products/${id}.json`);

      if (response.status === 200) {
        dispatch(deleteProductAction(id));
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsAction: (state, action) => {
      return {
        availableProducts: action.payload,
        userProducts: action.payload.filter(
          (product) => product.ownerId === 'u1'
        ),
      };
    },
    deleteProductAction: (state, action) => {
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
    createProductAction: (state, action) => {
      const { id, title, imageUrl, price, description } = action.payload;

      const newProduct = new Product(
        id,
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
    updateProductAction: (state, action) => {
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

export const {
  setProductsAction,
  deleteProductAction,
  createProductAction,
  updateProductAction,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.availableProducts;
export const selectUserProducts = (state) => state.products.userProducts;

export default productsSlice.reducer;
