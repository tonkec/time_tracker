import { createSlice } from '@reduxjs/toolkit';
import { Timer } from '../components/Timers/types';

type initialStateType = {
  counters: Timer[];
};

export type stateType = {
  counterSlice: initialStateType;
};

const initialState: initialStateType = {
  counters: [
    {
      counter: 0,
      id: '',
      intervalId: { current: 0 },
      timer: 0,
      description: '',
      createdAt: '',
      userId: '',
      formattedTime: '',
    },
  ],
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
        alreadyInState.id = action.payload.timerId;
      }
    },
  },
});

export const { saveTimerToState } = counterSlice.actions;
export default counterSlice.reducer;
