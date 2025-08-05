'use client';

import { useCallback, useState } from 'react';

// Define the generic type for the callback function
type CallbackFunction<T extends any[]> = (...args: T) => void;

function useDebounce<T extends any[]>(
  callback: CallbackFunction<T>,
  delay: number
): (...args: T) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = setTimeout(() => {
        callback(...args);
      }, delay);

      setTimeoutId(id);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebounce;
