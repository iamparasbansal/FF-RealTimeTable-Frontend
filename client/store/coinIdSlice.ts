import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '0chain';

const coinIdSlice = createSlice({
  name: 'coinId',
  initialState,
  reducers: {
    setCoinId: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setCoinId } = coinIdSlice.actions;
export default coinIdSlice.reducer;