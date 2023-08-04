import { useState, useEffect } from 'react';
import { useFetchTimersQuery, useAddTimerMutation } from '../../slices/slices';
import { Dialog } from 'primereact/dialog';
import useTimer from '../../hooks/useTimer';
import { useSelector } from 'react-redux';
import TimersTable from './TimersTable';
import FilterableTable from './FilterableTable';
import { TableNode, Timer } from './types';
import { stateType } from '../../slices/counterSlice';

const Timers = ({ hasFilter }: { hasFilter: boolean }) => {
  const [tableNodes, setTableNodes] = useState<TableNode[]>([]);
  const [newTimerDescription, setNewTimerDescription] = useState('');
  const [isModalvisible, setIsModalVisible] = useState(false);
  const { data: allTimers, isLoading } = useFetchTimersQuery();
  const [addTimer] = useAddTimerMutation();
  const { startCount, timerInterval } = useTimer({ startFrom: 0 });
  const state = useSelector((state: stateType) => state.counterSlice);

  const onAddNewTimer = () => {
    setIsModalVisible(true);
  };

  const onSaveTimer = () => {
    const today = new Date().toISOString().slice(0, 10);
    addTimer({
      description: newTimerDescription,
      createdAt: today,
      timer: startCount,
      intervalId: timerInterval,
    });
    setIsModalVisible(false);
  };

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
            timer: state.counter,
            createdAt: timer.createdAt,
            id: timer.id,
            intervalId: timer.intervalId,
          },
        };

        if (state.timerId === timer.id) {
          obj.data.timer = state.counter;
        } else {
          obj.data.timer = timer.timer;
        }

        arr.push(obj);
        setTableNodes(arr);
      });
    }
  }, [allTimers, isLoading, state.counter, state.timerId]);

  const renderTable = () => {
    if (hasFilter) {
      return <FilterableTable tableNodes={tableNodes} />;
    }

    return <TimersTable tableNodes={tableNodes} />;
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <Dialog
          header="Header"
          visible={isModalvisible}
          style={{ width: '50vw' }}
          onHide={() => setIsModalVisible(false)}
        >
          <input
            type="text"
            placeholder="Timer description"
            onChange={(e) => setNewTimerDescription(e.target.value)}
          />

          <button onClick={onSaveTimer}>Save timer</button>
        </Dialog>
      </div>
      <button onClick={onStopAllTimers}>Stop all timers</button>
      <button onClick={onAddNewTimer}>Add new timer</button>

      <div className="card">{!isLoading && renderTable()}</div>
    </div>
  );
};

export default Timers;
