import { useEffect, useState } from 'react';
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
  const [startingPoint, setStartingPoint] = useState(0);
  const [currentNode, setCurrentNode] = useState<TableNode>();

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
    if (currentNode) {
      const { data } = currentNode;

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
    if (currentNode) {
      const { data } = currentNode;
      updateTimer({
        id: data.id,
        timer: startCount,
        description: data.description,
        intervalId: timerInterval,
      });
    }
  };

  const onDeleteTimer = () => {
    if (currentNode) {
      const { data } = currentNode;
      deleteTimer(data.id);
    }
  };

  const onPauseTimer = () => {
    pauseTimer();
  };

  const onContinueTimer = () => {
    continueTimer();
  };

  useEffect(() => {
    let newNodes = JSON.parse(JSON.stringify(nodes));
    let editedNode = findNodeByKey(newNodes, options.key);
    setCurrentNode(editedNode);
  }, [nodes, options.key]);

  useEffect(() => {
    if (currentNode) {
      const { data } = currentNode;
      if (data.timer > 0) {
        setStartingPoint(data.timer);
      }
    }
  }, [currentNode, startingPoint]);

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
