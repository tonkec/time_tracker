import { useFetchTimersQuery } from '../../slices/slices';
import SingleTimer from '../SingleTimer';

const Timer = () => {
  const { data: allTimers, isLoading } = useFetchTimersQuery();

  return (
    <form>
      {!isLoading &&
        allTimers.map((t: any) => (
          <SingleTimer
            key={t.id}
            description={t.description}
            id={t.id}
            timer={t.timer}
          />
        ))}
    </form>
  );
};

export default Timer;
