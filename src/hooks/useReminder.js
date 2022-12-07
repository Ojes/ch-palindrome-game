import { useRef, useState } from 'react';

export const useReminder = (callback, initialTime) => {
  const [time, setTime] = useState();
  const controlRef = useRef({
    timerId: null,
    currentTime: 0,
    reminder: 0,
    delay: 60,
  });

  const reset = () => {
    cancelAnimationFrame(controlRef.current.timerId);
    controlRef.current.currentTime = Date.now();
    setTime('00:00');
  };

  const start = () => {
    controlRef.current.currentTime = (initialTime + 1) * 1000;
    controlRef.current.reminder = controlRef.current.currentTime - initialTime * 1000;
    render();
  };

  function render() {
    controlRef.current.currentTime -= controlRef.current.delay;

    setTime(
      new Date(Math.abs(controlRef.current.currentTime)).toLocaleTimeString('en-US', {
        minute: '2-digit',
        second: '2-digit',
      })
    );

    if (controlRef.current.reminder < controlRef.current.currentTime) {
      controlRef.current.timerId = requestAnimationFrame(render);
    } else {
      callback();
    }
  }

  return {
    time,
    reset,
    start,
  };
};
