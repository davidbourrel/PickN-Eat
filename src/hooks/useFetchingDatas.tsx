import { useState, useEffect } from 'react';
import {
  FUseFetchingDataArgs,
  FUseFetchingDatasResult,
} from '../_types/fetchData';

type FUseFetchingDatasHook = (
  url: FUseFetchingDataArgs
) => FUseFetchingDatasResult;

const useFetchingDatas: FUseFetchingDatasHook = (url) => {
  const [data, setData] = useState(null as unknown as []);
  const [error, setError] = useState(null as unknown as string);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url as unknown as string)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setError('');
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setData([]);
        }
      })
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false) as any;
  }, [url]);

  return { loading, error, data };
};

export default useFetchingDatas;
