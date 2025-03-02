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
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-3">Pomodoro Task Manager 🍅</h1>

      {/* Description Section */}
      <div className="text-gray-300 text-center max-w-lg mb-6">
        <p className="text-lg font-semibold mb-2">Stay focused and boost your productivity with the <b>Pomodoro Technique</b>.</p>
        <ul className="list-disc list-inside text-gray-400 text-left">
          <li>Add tasks and set Pomodoros (1 Pomodoro = 25 min work).</li>
          <li>Select a task, start the timer, and focus!</li>
          <li>Take a <b>5 min break</b> after each session.</li>
          <li>Repeat until all tasks are completed.</li>
        </ul>
      </div>

      <TaskList tasks={tasks} addTask={addTask} selectTask={selectTask} />

      {currentTaskIndex !== null && (
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          isRunning={isRunning}
          toggleTimer={toggleTimer}
          isBreak={isBreak}
          completeCycle={completeCycle}
        />
      )}
    </div>
  );
}
