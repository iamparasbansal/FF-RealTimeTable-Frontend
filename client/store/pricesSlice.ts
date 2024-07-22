// store/slices/pricesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Price {
  coinId: string;
  price: number;
  timestamp: string;
}

interface PricesState {
  prices: Price[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PricesState = {
  prices: [],
  status: 'idle',
  error: null,
};

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async (coinId: string) => {
  const response = await axios.get(`https://realtime-coin-data-backend.onrender.com/price/${coinId}?count=20`);
  return response.data.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default pricesSlice.reducer;