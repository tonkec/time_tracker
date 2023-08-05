import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useAddTimerMutation } from '../../slices/slices';
import useTimer from '../../hooks/useTimer';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Modal = () => {
  const [newTimerDescription, setNewTimerDescription] = useState('');
  const [isModalvisible, setIsModalVisible] = useState(false);
  const [addTimer] = useAddTimerMutation();
  const { startCount, timerInterval } = useTimer({ startFrom: 0 });

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
  return (
    <>
      <Button
        severity="secondary"
        label="Start new timer"
        onClick={onAddNewTimer}
      />
      <Dialog
        header="Enter timer description"
        visible={isModalvisible}
        style={{ width: '70%', maxWidth: 400 }}
        onHide={() => setIsModalVisible(false)}
      >
        <InputText
          type="text"
          placeholder="Timer description"
          onChange={(e) => setNewTimerDescription(e.target.value)}
          style={{ width: '100%' }}
        />
        <br />

        <Button
          label="Save timer"
          onClick={onSaveTimer}
          style={{ width: '100%', marginTop: 10 }}
        />
      </Dialog>
    </>
  );
};

export default Modal;
