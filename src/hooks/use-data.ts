import useSWR from 'swr';

import { fetcher, generateFakeData } from 'utils';

/**
 * I decided to fetch some data with SWR for better experience!
 * And also enrich it with fake data
 * to achive required items count.
 */
export default function useData() {
  const { data, error } = useSWR(`https://api.spacexdata.com/v5/launches`, fetcher);

  return {
    data: data && data.concat(generateFakeData(10000 - data.length)),
    loading: !error && !data,
    error: error,
  };
}
