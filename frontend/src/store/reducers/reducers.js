import { createSlice } from '@reduxjs/toolkit';

// @desc create cart Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const cartItems = state.cartItems;
      const findItemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );
      if (findItemIndex !== -1) {
        cartItems[findItemIndex].quantity += 1;
      } else {
        cartItems.push({
          product,
          quantity: 1,
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    },
    removeItem: (state, action) => {
      const product = action.payload;
      const cartItems = state.cartItems;
      const findItemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );
      if (findItemIndex !== -1) {
        cartItems.splice(findItemIndex, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    removeAllCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeItem, removeAllCart } = cartSlice.actions;
