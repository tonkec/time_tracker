export type Timer = {
  id: string;
  timer: number;
  intervalId: { current: number };
  description: string;
  createdAt: string;
};

export type TableNode = {
  key: string;
  label: string;
  data: Timer;
};
