'use client';

import { useEffect, useState } from 'react';

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 100);
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const startCountDown = (initialTimeInMiliseconds: number) => {
    setTimeLeft(initialTimeInMiliseconds);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingMilliseconds = milliseconds % 1000;

    return { seconds, minutes, remainingSeconds, remainingMilliseconds };
  };

  const timeLeftFormatted = (miliseconds: number) => {
    const { minutes, remainingMilliseconds, remainingSeconds } =
      formatTime(miliseconds);

    return `${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}.${remainingMilliseconds}`;
  };

  const formatTimeToSeconds = (miliseconds: number) => {
    return (miliseconds / 1000).toFixed(0) + 's';
  };

  const formatTimeToMinutes = (miliseconds: number) => {
    const { minutes, remainingSeconds } = formatTime(miliseconds);

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return {
    timeLeftInMiliseconds: timeLeft,
    timeLeftInSeconds: formatTimeToSeconds(timeLeft),
    timeLeftFormatted: timeLeftFormatted(timeLeft),
    timeLeftInMinutes: formatTimeToMinutes(timeLeft),
    startCountDown,
  };
};

export default useCountdown;
