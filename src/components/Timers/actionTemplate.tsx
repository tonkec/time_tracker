import { FormEvent, useEffect, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} from '../../slices/slices';
import { findNodeByKey } from './helpers';

type SingleTimerType = {
  id: string;
  description: string;
  timer: number;
};

export const ActionTemplate = ({
  nodes,
  options,
}: {
  nodes: never[];
  options: any;
}) => {
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();

  const {
    stopTimer,
    pauseTimer,
    continueTimer,
    startCount,
    startTimer,
    hasTimerStarted,
    timerInterval,
  } = useTimer();

  const onStartTimer = () => {
    let newNodes = JSON.parse(JSON.stringify(nodes));
    let editedNode = findNodeByKey(newNodes, options.node.key);
    console.log(editedNode);
    // startTimer();

    // updateTimer({
    //   id,
    //   timer: startCount,
    //   description: newDescription,
    //   intervalId: timerInterval,
    // });
  };

  const onStopTimer = (e: FormEvent) => {
    e.preventDefault();
    stopTimer();
    // updateTimer({
    //   id,
    //   timer: startCount,
    //   description: newDescription,
    //   intervalId: timerInterval,
    // });
  };

  const onPauseTimer = () => {
    pauseTimer();
    // updateTimer({
    //   id,
    //   timer: startCount,
    //   description: newDescription,
    //   intervalId: timerInterval,
    // });
  };

  const onContinueTimer = () => {
    continueTimer();
    // updateTimer({
    //   id,
    //   timer: startCount,
    //   description: newDescription,
    //   intervalId: timerInterval,
    // });
  };
  return (
    <div>
      <h1>{startCount > 0 ? startCount : timerInterval.current}</h1>

      {hasTimerStarted ? (
        <button onClick={onStopTimer}>Stop timer</button>
      ) : (
        <button onClick={onStartTimer}>Start timer</button>
      )}
      <button onClick={onPauseTimer}>Pause timer</button>
      <button onClick={onContinueTimer}>Continue timer</button>
      {/* <button onClick={() => deleteTimer(id)}>Delete timer</button> */}
    </div>
  );
};
