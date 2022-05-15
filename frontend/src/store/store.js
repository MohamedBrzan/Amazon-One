import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './reducers/reducers';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
