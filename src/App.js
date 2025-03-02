import { useState } from "react";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const addTask = (name, pomodoros) => {
    setTasks([...tasks, { name, pomodoros, completed: 0 }]);
  };

  const selectTask = (index) => {
    setCurrentTaskIndex(index);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const completeCycle = () => {
    if (isBreak) {
      setIsBreak(false);
      setTimeLeft(25 * 60);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex].completed += 1;

      if (updatedTasks[currentTaskIndex].completed >= updatedTasks[currentTaskIndex].pomodoros) {
        updatedTasks.splice(currentTaskIndex, 1);
        setCurrentTaskIndex(updatedTasks.length ? 0 : null);
      }

      setTasks(updatedTasks);
      setIsBreak(true);
      setTimeLeft(5 * 60);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-orange-500 to-red-600 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-5 text-white drop-shadow-lg">
        Pomodoro Task Manager 🍅
      </h1>

      {/* Glassmorphism Description Box */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-lg text-center shadow-lg">
        <p className="text-lg font-semibold mb-3">
          Stay focused and boost your productivity with the <b>Pomodoro Technique</b>.
        </p>
        <ul className="list-disc list-inside text-gray-200 text-left">
          <li>Add tasks and set Pomodoros (1 Pomodoro = 25 min work).</li>
          <li>Select a task, start the timer, and focus!</li>
          <li>Take a <b>5 min break</b> after each session.</li>
          <li>Repeat until all tasks are completed.</li>
        </ul>
      </div>

      <div className="mt-6 w-full max-w-xl">
        <TaskList tasks={tasks} addTask={addTask} selectTask={selectTask} />
      </div>

      {currentTaskIndex !== null && (
        <div className="mt-6 w-full max-w-md">
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            toggleTimer={toggleTimer}
            isBreak={isBreak}
            completeCycle={completeCycle}
          />
        </div>
      )}
    </div>
  );
}
