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
    if (hasTimerStarted) {
      clearInterval(timerInterval);
    }
  };

  const continueTimer = () => {
    if (hasTimerStarted) {
      const interval = window.setInterval(() => {
        setStartCount((count) => count + 1);
      });
      setTimerInterval(interval);
    }
  };

  const stopTimer = () => {
    if (hasTimerStarted) {
      clearInterval(timerInterval);
    }
    // const formattedDate = new Date(startCount * 1000)
    //   .toISOString()
    //   .slice(11, -1);
  };

  return { startTimer, startCount, stopTimer, pauseTimer, continueTimer };
};

export default useTimer;
