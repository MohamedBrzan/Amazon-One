import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorMessage from '../../utils/ErrorMessage';
import ServerErrorMessage from '../../utils/ServerErrorMessage';

// @desc create userSlice
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {},
  },
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
      toast.success('Login Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
    },
    logout: (state, action) => {
      state.user = {};
      toast.error('Logout Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
    },
  },
});

// @desc create productSlice
export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productInfo: localStorage.getItem('productInfo')
      ? JSON.parse(localStorage.getItem('productInfo'))
      : {},
  },
  reducers: {
    getProduct: (state, action) => {
      state.productInfo = { ...action.payload };
      localStorage.setItem('productInfo', JSON.stringify(state.productInfo));
    },
  },
});

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
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        toast.info('Edit Quantity Successful', {
          position: 'top-right',
          autoClose: 1000,
        });
      } else {
        cartItems.push({
          product,
          quantity: 1,
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        toast.success('added Successful', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    },
    increaseItem: (state, action) => {
      const product = action.payload;
      const cartItems = state.cartItems;
      const findItemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );
      cartItems[findItemIndex].quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.info('Increased Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
    },

    decreaseItem: (state, action) => {
      const product = action.payload;
      const cartItems = state.cartItems;
      const findItemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );

      cartItems[findItemIndex].quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.info('Decreased Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
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
      toast.success('Removed Item Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
    },
    removeAllCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success('All Cart Deleted Successful', {
        position: 'top-right',
        autoClose: 1000,
      });
    },
  },
});
export const { userInfo, login, logout } = userSlice.actions;

export const { getProduct } = productSlice.actions;

export const {
  addToCart,
  increaseItem,
  decreaseItem,
  removeItem,
  removeAllCart,
} = cartSlice.actions;
