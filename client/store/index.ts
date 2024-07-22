import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import symbolReducer from './symbolSlice';
import pricesReducer from './pricesSlice';
import coinIdReducer from './coinIdSlice';

const store = configureStore({
  reducer: {
    symbol: symbolReducer,
    prices: pricesReducer,
    coinId: coinIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;