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
  const [startingPoint, setStartingPoint] = useState(0);
  const [currentNode, setCurrentNode] = useState(null);

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
    startTimer();

    if (currentNode) {
      const { data } = currentNode;
      updateTimer({
        //@ts-ignore
        id: data.id,
        timer: startCount,
        //@ts-ignore
        description: data.description,
        intervalId: timerInterval,
      });
    }
  };

  const onStopTimer = (e: FormEvent) => {
    e.preventDefault();
    stopTimer();
    if (currentNode) {
      const { data } = currentNode;
      updateTimer({
        //@ts-ignore
        id: data.id,
        timer: startCount,
        //@ts-ignore
        description: data.description,
        intervalId: timerInterval,
      });
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
    let editedNode = findNodeByKey(newNodes, options.node.key);
    setCurrentNode(editedNode);
  }, [nodes]);

  useEffect(() => {
    if (currentNode) {
      const { data } = currentNode;
      //@ts-ignore
      if (data.timer > 0) {
        //@ts-ignore
        setStartingPoint(data.timer);
      }
    }
  }, [currentNode, startingPoint]);

  return (
    <div>
      <h1>{startCount}</h1>

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
