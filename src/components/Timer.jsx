import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUp, restartTimer }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    setTimeLeft(60);
  }, [restartTimer]);

  return (
    <div>
      <h1>Time Left: {timeLeft}s</h1>
    </div>
  );
};

export default Timer;
