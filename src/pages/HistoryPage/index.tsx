import { useState } from 'react';
import { useFetchTimersQuery } from '../../slices/slices';
import SingleTimer from '../../components/SingleTimer';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const HistoryPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const { data: allTimers, isLoading } = useFetchTimersQuery();

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return <h2>History</h2>;
};

export default HistoryPage;
