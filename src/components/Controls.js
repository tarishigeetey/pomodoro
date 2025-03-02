export default function Controls({ isRunning, toggleTimer, resetTimer }) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
          isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
        } text-white`}
        onClick={toggleTimer}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="px-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        onClick={resetTimer}
      >
        Reset
      </button>
    </div>
  );
}
