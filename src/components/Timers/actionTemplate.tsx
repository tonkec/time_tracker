import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} from '../../slices/slices';
import { findNodeByKey } from './helpers';
import { TableNode } from './types';
import { Button } from 'primereact/button';

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

  const { stopTimer, startCount, startTimer, hasTimerStarted, timerInterval } =
    useTimer({ startFrom: startingPoint });

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

  return (
    <>
      {hasTimerStarted ? (
        <Button
          onClick={onStopTimer}
          icon="pi pi-stop-circle"
          aria-label="Stop timer"
          severity="info"
        />
      ) : (
        <Button
          onClick={onStartTimer}
          icon="pi pi-play"
          aria-label="Start timer"
        />
      )}
      <Button
        onClick={onDeleteTimer}
        severity="danger"
        icon="pi pi-times"
        style={{ marginLeft: 10 }}
      />
    </>
  );
};
