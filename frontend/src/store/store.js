import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { cartSlice, productSlice, userSlice } from './reducers/reducers';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

setupListeners(store.dispatch);
export default store;
