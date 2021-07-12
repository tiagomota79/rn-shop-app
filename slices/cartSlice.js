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
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.items[itemId];
      const currentQuantity = cartItem.quantity;

      let updatedCart;

      if (currentQuantity === 1) {
        updatedCart = { ...state.items };
        delete updatedCart[itemId];
      } else {
        const updatedCartItem = new CartItem(
          currentQuantity - 1,
          cartItem.productPrice,
          cartItem.productTitle,
          cartItem.sum - cartItem.productPrice
        );

        updatedCart = { ...state.items, [itemId]: updatedCartItem };
      }

      return {
        ...state,
        items: updatedCart,
        totalAmount: state.totalAmount - cartItem.productPrice,
      };
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectItemsInCart = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
