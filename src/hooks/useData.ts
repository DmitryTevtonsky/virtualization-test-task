import useSWR from 'swr';

import { fetcher, generateFakeData } from 'utils';

export default function useData() {
  const { data, error } = useSWR(`https://api.spacexdata.com/v5/launches`, fetcher);

  return {
    data: data && data.concat(generateFakeData(10000 - data.length)),
    loading: !error && !data,
    error: error,
  };
}
