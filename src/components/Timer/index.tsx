import useTimer from '../../hooks/useTimer';

const Timer = () => {
  const { startTimer, stopTimer, pauseTimer, continueTimer, startCount } =
    useTimer();
  return (
    <>
      <button onClick={startTimer}>Start new timer</button>
      <button onClick={stopTimer}>Stop timer</button>
      <button onClick={pauseTimer}>Pause timer</button>
      <button onClick={continueTimer}>Continue timer</button>
      <p>{startCount}</p>
    </>
  );
};

export default Timer;
