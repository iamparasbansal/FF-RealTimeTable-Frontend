import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import coinReducer from './coinSlice';
import pricesReducer from './pricesSlice';

const store = configureStore({
  reducer: {
    coin: coinReducer,
    prices: pricesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;