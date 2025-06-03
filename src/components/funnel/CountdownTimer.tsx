import React, { useState, useEffect, useCallback } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
  onTimerEnd?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialMinutes = 10, 
  onTimerEnd, 
  className 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimerEnd = useCallback(() => {
    if (onTimerEnd) {
      onTimerEnd();
    }
    // Potentially add some visual indication that timer has ended
  }, [onTimerEnd]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, handleTimerEnd]);

  return (
    <div className={`countdown-timer text-red-500 font-bold text-2xl ${className || ''}`}>
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer; 