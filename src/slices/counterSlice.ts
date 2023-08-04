import { createSlice } from '@reduxjs/toolkit';

const initialState: { counter: number; timerId: string } = {
  counter: 0,
  timerId: '',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveTimer: (state, action) => {
      state.counter = action.payload.counter;
      state.timerId = action.payload.timerId;
    },
  },
});

export const { saveTimer } = counterSlice.actions;
export default counterSlice.reducer;
