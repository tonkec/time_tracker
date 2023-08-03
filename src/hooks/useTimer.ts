import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveTimer } from '../slices/counterSlice';

export const useTimer = ({ startFrom }: { startFrom: number }) => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  let timerInterval = useRef(0);
  const dispatch = useDispatch();

  const startTimer = (id: string) => {
    setStartCount(startFrom);
    console.log(startCount, 'start count');
    const interval = window.setInterval(() => {
      setStartCount((prevCount) => {
        dispatch(saveTimer(prevCount + 1));
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
    dispatch(saveTimer(startCount));
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
