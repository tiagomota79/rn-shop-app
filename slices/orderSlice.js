import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://rn-complete-guide-8706e-default-rtdb.firebaseio.com/';

import Order from '../model/order';
import { firebaseOrderObjectToArray } from '../utils';

const initialState = {
  orders: [],
};

export const setOrders = createAsyncThunk(
  'get/orders',
  async (params, { dispatch }) => {
    const { token, userId } = params;

    try {
      const response = await axios.get(
        `${API_URL}orders/${userId}.json?auth=${token}`
      );

      const ordersToSet = firebaseOrderObjectToArray(response.data);

      if (response.status === 200) {
        dispatch(setOrdersAction(ordersToSet));
      }
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const addOrder = createAsyncThunk(
  'post/order',
  async (params, { dispatch }) => {
    const { token, userId } = params;

    const orderToCreate = {
      cartItems: params.cartItems,
      totalAmount: params.totalAmount,
      date: new Date(),
    };

    try {
      await axios.post(
        `${API_URL}orders/${userId}.json?auth=${token}`,
        orderToCreate
      );
    } catch (error) {
      const errorText = error.response.data;
      console.error(errorText);
      throw error;
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrdersAction: (state, action) => {
      return {
        orders: action.payload,
      };
    },
    addOrderAction: (state, action) => {
      const cartItems = action.payload.cartItems;
      const totalAmount = action.payload.totalAmount;

      const newOrder = new Order(
        new Date().toString(),
        cartItems,
        totalAmount,
        new Date()
      );

      return { ...state, orders: state.orders.concat(newOrder) };
    },
  },
});

export const { addOrderAction, setOrdersAction } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
