import { useFetchTimersQuery } from '../../slices/slices';
import { useState } from 'react';
const Filter = () => {
  const { data: allTimers, isLoading } = useFetchTimersQuery();

  return <h1>Filter</h1>;
};

export default Filter;
