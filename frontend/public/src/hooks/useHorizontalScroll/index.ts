'use client';

import { useEffect } from 'react';
import { UseHorizontalScroll } from './types';

let diff = 0;
let ticking = false;

const useHorizontalScroll = (ref: UseHorizontalScroll) => {
  const scrollHorizontally = (diff: number) => {
    if (ref) {
      // @ts-ignore
      ref.current.scrollLeft += diff;
    }
  };

  const replaceVerticalScrollByHorizontal = (e: any) => {
    diff = e.deltaY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        scrollHorizontally(diff);
        ticking = false;
      });
    }
    ticking = true;
  };

  useEffect(() => {
    window.addEventListener('wheel', replaceVerticalScrollByHorizontal, {
      passive: true,
    });
  }, []);

  return;
};

export default useHorizontalScroll;
