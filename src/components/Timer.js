import { useEffect, useRef } from "react";

export default function Timer({ timeLeft, setTimeLeft, isRunning }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="text-7xl font-mono my-6 bg-gray-800 px-12 py-6 rounded-lg shadow-lg">
      {formatTime(timeLeft)}
    </div>
  );
}
