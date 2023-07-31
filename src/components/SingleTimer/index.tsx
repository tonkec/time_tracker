import { FormEvent, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import { useUpdateTimerMutation } from '../../slices/slices';

type SingleTimerType = {
  id: string;
  description: string;
  timer: number;
};

const SingleTimer = ({ id, description, timer }: SingleTimerType) => {
  const [newDescription, setNewDescription] = useState('');
  const [updateTimer] = useUpdateTimerMutation();

  const { startTimer, stopTimer, pauseTimer, continueTimer, startCount } =
    useTimer();

  const onStartTimer = (e: FormEvent) => {
    e.preventDefault();
    startTimer();
  };

  const onStopTimer = (e: FormEvent) => {
    e.preventDefault();
    stopTimer();
    updateTimer({ id, timer: startCount, description: newDescription });
  };

  return (
    <div>
      <h1>
        {timer} | {description}
      </h1>
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
      />
      <button onClick={onStartTimer}>Start new timer</button>
      <button onClick={onStopTimer}>Stop timer</button>
      <button onClick={pauseTimer}>Pause timer</button>
      <button onClick={continueTimer}>Continue timer</button>
    </div>
  );
};

export default SingleTimer;
