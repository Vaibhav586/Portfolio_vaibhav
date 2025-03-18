import React, { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-mono bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
      {time.toLocaleTimeString()}
    </div>
  );
};