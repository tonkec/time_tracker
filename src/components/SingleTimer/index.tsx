import { useSelector } from 'react-redux';

type SingleTimerType = {
  tableNodes: any;
  options: any;
};

const SingleTimer = ({ tableNodes, options }: SingleTimerType) => {
  const state = useSelector((state: any) => state.counterSlice);

  return <div>{state.counter}</div>;
};

export default SingleTimer;
