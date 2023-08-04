import { createSlice } from '@reduxjs/toolkit';

type initialStateType = { counter: number; timerId: string };

export type stateType = {
  counterSlice: initialStateType;
};

const initialState: initialStateType = {
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
