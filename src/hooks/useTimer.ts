import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { saveTimerToState } from '../slices/counterSlice';
import { Timer } from '../components/Timers/types';

export const useTimer = ({ startFrom }: { startFrom: number }) => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [timerId, setTimerId] = useState('');
  let timerInterval = useRef(0);
  const dispatch = useDispatch();

  const startTimer = (data: Timer) => {
    setStartCount(startFrom);
    setTimerId(data.id);
    const interval = window.setInterval(() => {
      setStartCount((prevCount) => {
        dispatch(
          saveTimerToState({
            ...data,
            counter: prevCount + 1,
            timerId: data.id,
          })
        );
        return prevCount + 1;
      });
    });

    timerInterval.current = interval;
    setHasTimerStarted(true);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval.current);
  };

  const continueTimer = () => {
    setHasTimerStarted(true);
    const interval = window.setInterval(() => {
      setStartCount((count) => {
        return count + 1;
      });
    });

    timerInterval.current = interval;
  };

  const stopTimer = () => {
    clearInterval(timerInterval.current);
    dispatch(saveTimerToState({ counter: startCount, timerId }));
    setHasTimerStarted(false);
  };

  return {
    startTimer,
    startCount,
    stopTimer,
    pauseTimer,
    continueTimer,
    setStartCount,
    hasTimerStarted,
    timerInterval,
  };
};

export default useTimer;
