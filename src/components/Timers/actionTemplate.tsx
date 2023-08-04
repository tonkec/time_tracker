import { useMemo } from 'react';
import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} from '../../slices/slices';
import { findNodeByKey } from './helpers';
import { TableNode } from './types';

export const ActionTemplate = ({
  nodes,
  options,
}: {
  nodes: TableNode[];
  options: TableNode;
}) => {
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();
  let newNodes = JSON.parse(JSON.stringify(nodes));
  let editedNode = findNodeByKey(newNodes, options.key);
  const { data } = editedNode;
  let startingPoint = 0;
  if (data.timer > 0) {
    startingPoint = data.timer;
  }

  const {
    stopTimer,
    pauseTimer,
    continueTimer,
    startCount,
    startTimer,
    hasTimerStarted,
    timerInterval,
  } = useTimer({ startFrom: startingPoint });

  const onStartTimer = () => {
    if (editedNode) {
      const { data } = editedNode;

      startTimer(data.id);
      updateTimer({
        id: data.id,
        timer: startCount,
        description: data.description,
        intervalId: timerInterval,
      });
    }
  };

  const onStopTimer = () => {
    stopTimer();
    if (editedNode) {
      const { data } = editedNode;
      updateTimer({
        id: data.id,
        timer: startCount,
        description: data.description,
        intervalId: timerInterval,
      });
    }
  };

  const onDeleteTimer = () => {
    if (editedNode) {
      const { data } = editedNode;
      deleteTimer(data.id);
    }
  };

  const onPauseTimer = () => {
    pauseTimer();
  };

  const onContinueTimer = () => {
    continueTimer();
  };

  return (
    <>
      {hasTimerStarted ? (
        <button onClick={onStopTimer}>Stop timer</button>
      ) : (
        <button onClick={onStartTimer}>Start timer</button>
      )}
      <button onClick={onPauseTimer}>Pause timer</button>
      <button onClick={onContinueTimer}>Continue timer</button>
      <button onClick={onDeleteTimer}>Delete timer</button>
    </>
  );
};
