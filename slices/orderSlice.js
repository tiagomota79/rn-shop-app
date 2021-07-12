import { createSlice } from '@reduxjs/toolkit';

import Order from '../model/order';

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
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

export const { addOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
