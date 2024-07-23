import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import coinReducer from './coinSlice';
import pricesAndCoinsReducer from './pricesAndCoinsSlice';

const store = configureStore({
  reducer: {
    selectedCoin: coinReducer,
    pricesAndCoins: pricesAndCoinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;