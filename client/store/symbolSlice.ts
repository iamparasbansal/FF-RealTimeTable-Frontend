import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'zcn';

const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setSymbol } = symbolSlice.actions;
export default symbolSlice.reducer;