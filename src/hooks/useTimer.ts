import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveTimerToState } from '../slices/counterSlice';

export const useTimer = ({ startFrom }: { startFrom: number }) => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [timerId, setTimerId] = useState('');
  let timerInterval = useRef(0);
  const dispatch = useDispatch();

  const startTimer = (id: string) => {
    setStartCount(startFrom);
    setTimerId(id);
    const interval = window.setInterval(() => {
      setStartCount((prevCount) => {
        dispatch(saveTimerToState({ counter: prevCount + 1, timerId: id }));
        return prevCount + 1;
      });
    }, 1000);

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
    }, 1000);

    timerInterval.current = interval;
  };

  const stopTimer = () => {
    clearInterval(timerInterval.current);
    dispatch(saveTimerToState({ counter: startCount, timerId }));
    setHasTimerStarted(false);
  };

  useEffect(() => {
    setStartCount(startFrom);
  }, [startFrom]);

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
