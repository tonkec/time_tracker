import { useState, useEffect } from 'react';
import { useFetchTimersQuery, useAddTimerMutation } from '../../slices/slices';
import SingleTimer from '../SingleTimer';
import { Dialog } from 'primereact/dialog';
import useTimer from '../../hooks/useTimer';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ActionTemplate } from './actionTemplate';

const Timer = () => {
  const [tableNodes, setTableNodes] = useState([]);
  const [newTimerDescription, setNewTimerDescription] = useState('');
  const [isModalvisible, setIsModalVisible] = useState(false);
  const { data: allTimers, isLoading } = useFetchTimersQuery();
  const [addTimer] = useAddTimerMutation();
  const { startCount, timerInterval } = useTimer();

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
    allTimers.forEach(
      (timer: { intervalId: { current: number }; id: string }) => {
        return clearInterval(timer.intervalId.current);
      }
    );
  };

  useEffect(() => {
    if (!isLoading) {
      const arr: any = [];
      allTimers.forEach((timer: any, index: number) => {
        const obj = {
          key: `${index}`,
          label: 'label',
          data: {
            description: timer.description,
            timer: timer.timer,
            createdAt: timer.createdAt,
            intervalId: timer.intervalId.current,
          },
        };

        arr.push(obj);
        setTableNodes(arr);
      });
    }
  }, [allTimers, isLoading]);

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

      <div className="card">
        {!isLoading && (
          <TreeTable value={tableNodes} tableStyle={{ minWidth: '50rem' }}>
            <Column field="description" header="Description" expander></Column>
            <Column field="timer" header="Timer"></Column>
            <Column field="intervalId" header="intervalId"></Column>
            <Column
              header="Actions"
              editor={(options) => (
                <ActionTemplate nodes={tableNodes} options={options} />
              )}
            ></Column>
          </TreeTable>
        )}
      </div>
    </div>
  );
};

export default Timer;
