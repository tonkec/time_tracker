import { createSlice } from '@reduxjs/toolkit';

const initialState: { counter: number } = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveTimer: (state, action) => {
      state.counter = action.payload;
    },
  },
});

export const { saveTimer } = counterSlice.actions;
export default counterSlice.reducer;
