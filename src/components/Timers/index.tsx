import { useState, useEffect } from 'react';
import { useFetchTimersQuery } from '../../slices/slices';
import { useSelector } from 'react-redux';
import TimersTable from './TimersTable';
import FilterableTable from './FilterableTable';
import { TableNode, Timer } from './types';
import { stateType } from '../../slices/counterSlice';
import Modal from '../Modal';
import { Button } from 'primereact/button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Timers = ({ hasFilter }: { hasFilter: boolean }) => {
  const [tableNodes, setTableNodes] = useState<TableNode[]>([]);
  const [currentUserId] = useLocalStorage('user', null);

  const { data: allTimers, isLoading } = useFetchTimersQuery(currentUserId);
  const state = useSelector((state: stateType) => state.counterSlice);

  const onStopAllTimers = () => {
    allTimers.forEach((timer: Timer) => {
      return clearInterval(timer.intervalId.current);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      const arr: TableNode[] = [];
      allTimers.forEach((timer: Timer, index: number) => {
        const obj = {
          key: `${index}`,
          label: 'label',
          data: {
            description: timer.description,
            timer: timer.timer,
            createdAt: timer.createdAt,
            id: timer.id,
            intervalId: timer.intervalId,
            userId: timer.userId,
          },
        };

        arr.push(obj);
        setTableNodes(arr);
      });
    }
  }, [allTimers, isLoading, state.timerId]);

  useEffect(() => {
    if (tableNodes.length > 0) {
      const currentTimer = allTimers.filter(
        (timer: Timer) => timer.id === state.timerId
      );
      currentTimer.counter = state.counter;

      tableNodes.forEach((tableNode: TableNode) => {
        if (tableNode.data.id === state.timerId) {
          tableNode.data.timer = state.counter;
        }
      });
    }
  }, [state.counter, allTimers, state.timerId, tableNodes]);

  const renderTable = () => {
    if (hasFilter) {
      return <FilterableTable tableNodes={tableNodes} />;
    }

    return <TimersTable tableNodes={tableNodes} />;
  };

  return (
    <div>
      <div className="flex justify-content-end">
        <Modal />
        <Button
          onClick={onStopAllTimers}
          label="Stop all timers"
          style={{ marginLeft: 10 }}
        />
      </div>

      {!isLoading && renderTable()}
    </div>
  );
};

export default Timers;
