import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coin {
  coinId: string;
  symbol: string;
}

const initialState: Coin = {
  coinId: '0chain',
  symbol: 'zcn',
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setCoinId: (state, action: PayloadAction<string>) => {
      state.coinId = action.payload;
    },
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setCoinId, setSymbol } = coinSlice.actions;
export default coinSlice.reducer;