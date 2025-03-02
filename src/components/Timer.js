import { useEffect, useRef } from "react";

export default function Timer({ timeLeft, setTimeLeft, isRunning, toggleTimer, isBreak, completeCycle }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      completeCycle();
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-6xl font-mono my-6 ${isBreak ? "text-blue-400" : "text-yellow-400"}`}>
        {formatTime(timeLeft)}
      </div>
      <button
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        onClick={toggleTimer}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}
