import useTimer from '../../hooks/useTimer';
import {
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} from '../../slices/slices';
import { findNodeByKey, formatTime } from './helpers';
import { TableNode } from './types';
import { Button } from 'primereact/button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const ActionTemplate = ({
  nodes,
  options,
  isFilterableTable,
}: {
  nodes: TableNode[];
  options: TableNode;
  isFilterableTable?: boolean;
}) => {
  const [updateTimer] = useUpdateTimerMutation();
  const [deleteTimer] = useDeleteTimerMutation();
  const [currentUserId] = useLocalStorage('user', null);
  const newNodes = JSON.parse(JSON.stringify(nodes));
  const editedNode = findNodeByKey(newNodes, options.key);
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

      startTimer(data);
      updateTimer({
        id: data.id,
        timer: startCount,
        description: data.description,
        intervalId: timerInterval,
        userId: currentUserId,
        formattedTime: formatTime(startCount),
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
        userId: currentUserId,
        formattedTime: formatTime(startCount),
      });
    }
  };

  const onDeleteTimer = () => {
    if (editedNode) {
      const { data } = editedNode;
      deleteTimer(data.id);
    }
  };

  const renderTimerButtons = () => {
    if (!isFilterableTable) {
      return hasTimerStarted ? (
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
      );
    }
  };

  return (
    <>
      {renderTimerButtons()}
      <Button
        onClick={onDeleteTimer}
        severity="danger"
        icon="pi pi-trash"
        style={{ marginLeft: 10 }}
      />
    </>
  );
};
