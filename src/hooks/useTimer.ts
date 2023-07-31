import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState('potato');

  const startTimer = () => {
    // console.log(startCount);
    // console.log(interval, 'startTimer inteval hook');
    // @ts-ignore

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
    console.log(timerInterval, 'ti on stop timer');
    clearInterval(timerInterval);
    setHasTimerStarted(false);
  };

  useEffect(() => {
    if (hasTimerStarted) {
      const interval = window.setInterval(() => {
        setStartCount((count) => {
          return count + 1;
        });
      });
      // @ts-ignore
      setTimerInterval(interval);
    }
  }, [startCount, hasTimerStarted]);

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
