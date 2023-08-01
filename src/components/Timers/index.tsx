import { useState } from 'react';
import { useFetchTimersQuery, useAddTimerMutation } from '../../slices/slices';
import SingleTimer from '../SingleTimer';
import { Dialog } from 'primereact/dialog';
import useTimer from '../../hooks/useTimer';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const Timer = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
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

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
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

      <div className="card">
        {!isLoading &&
          allTimers
            .slice(first, first + rows)
            .map((t: any) => (
              <SingleTimer
                key={t.id}
                description={t.description}
                id={t.id}
                timer={t.timer}
              />
            ))}

        {!isLoading && (
          <Paginator
            first={first}
            rows={rows}
            totalRecords={allTimers.length}
            onPageChange={onPageChange}
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
