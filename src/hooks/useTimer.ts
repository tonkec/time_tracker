import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(0);

  const startTimer = () => {
    const interval = window.setInterval(() => {
      setStartCount((count) => {
        return count + 1;
      });
    });

    setTimerInterval(interval);
    setHasTimerStarted(true);
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const continueTimer = () => {
    setHasTimerStarted(true);
    const interval = window.setInterval(() => {
      setStartCount((count) => {
        return count + 1;
      });
    });
    // @ts-ignore
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
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
  };
};

export default useTimer;
