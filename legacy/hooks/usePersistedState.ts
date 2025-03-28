import {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, intialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const isNode = typeof localStorage === 'undefined';

    if (!isNode) {
      const storageValue = localStorage.getItem(key);

      if (storageValue) {
        return JSON.parse(storageValue);
      }
      return intialState;
    }
    return intialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default usePersistedState;
