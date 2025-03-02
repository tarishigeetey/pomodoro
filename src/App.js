import { useState } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Pomodoro Timer</h1>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} isRunning={isRunning} />
      <Controls isRunning={isRunning} toggleTimer={toggleTimer} resetTimer={resetTimer} />
    </div>
  );
}
