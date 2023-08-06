export type Timer = {
  id: string;
  timer: number;
  intervalId: { current: number };
  description: string;
  createdAt: string;
  userId: string;
  formattedTime: string;
  counter: number;
};

export type TableNode = {
  key: string;
  label: string;
  data: Timer;
};
