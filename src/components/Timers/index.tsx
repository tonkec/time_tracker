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
  }, [allTimers, isLoading]);

  useEffect(() => {
    if (tableNodes.length > 0) {
      const timerIdsFromState = state.counters.map(
        (counter) => counter.timerId
      );

      const nodesToBeUpdated = tableNodes.filter((tableNode) =>
        timerIdsFromState.includes(tableNode.data.id)
      );

      if (nodesToBeUpdated.length > 0) {
        nodesToBeUpdated.forEach((node) => {
          state.counters.forEach((stateCounter) => {
            if (node.data.id === stateCounter.timerId) {
              node.data.timer = stateCounter.counter;
              return node;
            }
          });
        });
      }
    }
  }, [allTimers, tableNodes, state]);

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
