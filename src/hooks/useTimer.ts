import { useState, useRef, useEffect } from 'react';

export const useTimer = ({ startFrom }: { startFrom: number }) => {
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [startCount, setStartCount] = useState(0);
  let timerInterval = useRef(0);

  const startTimer = () => {
    setStartCount(startFrom);
    console.log(startCount, 'start count');
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
