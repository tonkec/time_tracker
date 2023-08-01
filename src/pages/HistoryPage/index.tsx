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

  return (
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
  );
};

export default HistoryPage;
