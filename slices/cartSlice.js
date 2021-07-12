import { createSlice } from '@reduxjs/toolkit';

import CartItem from '../model/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const productTitle = product.title;
      const productPrice = product.price;
      const currentCart = state.items;

      let updatedCartItem;

      if (currentCart[product.id]) {
        updatedCartItem = new CartItem(
          state.items[product.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[product.id].sum + productPrice
        );
      } else {
        updatedCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      return {
        ...state,
        items: { ...state.items, [product.id]: updatedCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const selectItemsInCart = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
