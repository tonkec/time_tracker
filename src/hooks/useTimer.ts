import { useState } from 'react';

export const useTimer = () => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(0);

  const startTimer = () => {
    if (hasTimerStarted) {
      console.log('Timer has already started');
      return;
    }

    if (startCount === 0) {
      const interval = window.setInterval(() => {
        setStartCount((count) => count + 1);
      });
      setTimerInterval(interval);
      setHasTimerStarted(true);

      return;
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const continueTimer = (timer: number) => {
    const interval = window.setInterval(() => {
      setStartCount((count) => {
        return count + 1;
      });
    });
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  return { startTimer, startCount, stopTimer, pauseTimer, continueTimer };
};

export default useTimer;
