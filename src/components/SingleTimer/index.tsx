import { FormEvent, useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} from '../../slices/slices';

type SingleTimerType = {
  id: string;
  description: string;
  timer: number;
};

const SingleTimer = ({ id, description, timer }: SingleTimerType) => {
  const [newDescription, setNewDescription] = useState(description);
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();

  const {
    stopTimer,
    pauseTimer,
    continueTimer,
    startCount,
    setStartCount,
    startTimer,
    hasTimerStarted,
    timerInterval,
  } = useTimer();

  const onStartTimer = () => {
    startTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
      intervalId: timerInterval,
    });
  };

  const onStopTimer = (e: FormEvent) => {
    e.preventDefault();
    stopTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
      intervalId: timerInterval,
    });
  };

  const onPauseTimer = () => {
    pauseTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
      intervalId: timerInterval,
    });
  };

  const onContinueTimer = () => {
    continueTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
      intervalId: timerInterval,
    });
  };

  useEffect(() => {
    setStartCount(timer);
  }, [setStartCount, timer]);

  return (
    <div>
      <h1>
        {startCount > 0 ? startCount : timer} | {description}
      </h1>
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
      />
      {hasTimerStarted ? (
        <button onClick={onStopTimer}>Stop timer</button>
      ) : (
        <button onClick={onStartTimer}>Start timer</button>
      )}
      <button onClick={onPauseTimer}>Pause timer</button>
      <button onClick={onContinueTimer}>Continue timer</button>
      <button onClick={() => deleteTimer(id)}>Delete timer</button>
    </div>
  );
};

export default SingleTimer;
