// store/slices/pricesAndCoinsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Coins {
  coinId: string;
  symbol: string;
  name: string;
}

interface CoinsState {
  coins: Coins[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

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

const initialCoinsState: CoinsState = {
  coins: [],
  status: 'idle',
  error: null,
};

const initialPricesState: PricesState = {
  prices: [],
  status: 'idle',
  error: null,
};


interface PricesAndCoinsState {
  pricesOfSelectedCoin: PricesState;
  allCoins: CoinsState;
}

const initialState: PricesAndCoinsState = {
  pricesOfSelectedCoin: initialPricesState,
  allCoins: initialCoinsState,
};

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const response = await axios.get(`https://realtimepricedatabackend-2.onrender.com/coin`);
  return response.data;
});

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async (coinId: string) => {
  const response = await axios.get(`https://realtimepricedatabackend-2.onrender.com/price/${coinId}?count=20`);
  return response.data;
});

const pricesAndCoinsSlice = createSlice({
  name: 'pricesAndCoins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.allCoins.status = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.allCoins.status = 'succeeded';
        state.allCoins.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.allCoins.status = 'failed';
        state.allCoins.error = action.error.message || null;
      })
      .addCase(fetchPrices.pending, (state) => {
        state.pricesOfSelectedCoin.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.pricesOfSelectedCoin.status = 'succeeded';
        state.pricesOfSelectedCoin.prices = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.pricesOfSelectedCoin.status = 'failed';
        state.pricesOfSelectedCoin.error = action.error.message || null;
      });
  },
});

export default pricesAndCoinsSlice.reducer;