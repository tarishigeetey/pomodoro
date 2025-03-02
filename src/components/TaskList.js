import { useState } from "react";

export default function TaskList({ tasks, addTask, selectTask }) {
  const [taskName, setTaskName] = useState("");
  const [pomodoros, setPomodoros] = useState(1);

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      addTask(taskName, pomodoros);
      setTaskName("");
      setPomodoros(1);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow p-2 rounded bg-gray-800 text-white border border-gray-700"
          placeholder="Task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="number"
          className="w-16 p-2 rounded bg-gray-800 text-white border border-gray-700"
          value={pomodoros}
          onChange={(e) => setPomodoros(Number(e.target.value))}
          min="1"
        />
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between p-3 bg-gray-800 my-2 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => selectTask(index)}
          >
            <span>{task.name}</span>
            <span>
              {task.completed} / {task.pomodoros} 🍅
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
