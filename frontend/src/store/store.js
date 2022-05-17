import { configureStore } from '@reduxjs/toolkit';
import { cartSlice, productSlice, userSlice } from './reducers/reducers';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
