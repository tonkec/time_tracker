import { createSlice } from '@reduxjs/toolkit';

type initialStateType = { counters: [{ counter: number; timerId: string }] };

export type stateType = {
  counterSlice: initialStateType;
};

const initialState: initialStateType = {
  counters: [{ counter: 0, timerId: '' }],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveTimerToState: (state, action) => {
      const alreadyInState = state.counters.find(
        (stateCounter: any) => stateCounter.timerId === action.payload.timerId
      );

      if (!alreadyInState) {
        state.counters.push(action.payload);
      }

      if (alreadyInState) {
        alreadyInState.counter = action.payload.counter;
        alreadyInState.timerId = action.payload.timerId;
      }
    },
  },
});

export const { saveTimerToState } = counterSlice.actions;
export default counterSlice.reducer;
