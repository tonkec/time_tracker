import { FormEvent, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useFetchTimerByIdQuery,
} from '../../slices/slices';

type SingleTimerType = {
  id: string;
  description: string;
  timer: number;
};

const SingleTimer = ({ id, description, timer }: SingleTimerType) => {
  const [newDescription, setNewDescription] = useState(description);
  const [updateTimer] = useUpdateTimerMutation();

  const { stopTimer, pauseTimer, continueTimer, startCount } = useTimer();

  const onStopTimer = (e: FormEvent) => {
    e.preventDefault();
    stopTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
    });
  };

  const onPauseTimer = () => {
    pauseTimer();
    updateTimer({
      id,
      timer: startCount,
      description: newDescription,
    });
  };

  const onContinueTimer = () => {
    continueTimer(timer);
  };

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

      <button onClick={onStopTimer}>Stop timer</button>
      <button onClick={onPauseTimer}>Pause timer</button>
      <button onClick={onContinueTimer}>Continue timer</button>
    </div>
  );
};

export default SingleTimer;
