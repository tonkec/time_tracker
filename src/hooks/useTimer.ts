import { useState, useRef } from 'react';

export const useTimer = () => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  let timerInterval = useRef(0);

  const startTimer = () => {
    const interval = window.setInterval(() => {
      setStartCount((count) => {
        return count + 1;
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
