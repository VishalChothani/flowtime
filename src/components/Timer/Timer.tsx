import { useRef } from 'react';
import { useTimerStore, formatTime, parseTime } from '../../store/useTimerStore';

export function Timer() {
  const { remainingSeconds, status, start, pause, reset, setDuration } =
    useTimerStore();

  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const isIdle = status === 'idle';
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = isIdle && remainingSeconds === 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const handleTimeChange = () => {
    if (!isIdle) return;
    const mm = minutesRef.current?.value ?? '0';
    const ss = secondsRef.current?.value ?? '0';
    const totalSeconds = parseTime(mm, ss);
    setDuration(totalSeconds);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isIdle && remainingSeconds >= 10) {
      start();
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 dark:border-gray-700 dark:bg-gray-800">
      {/* Timer Display */}
      <div className="mb-6 text-center">
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          {isRunning
            ? 'Focus time...'
            : isPaused
              ? 'Paused'
              : isFinished
                ? "Time's up! 🎉"
                : 'Set your timer'}
        </p>

        {isIdle ? (
          <div className="flex items-center justify-center gap-2">
            <input
              ref={minutesRef}
              type="number"
              min={0}
              max={59}
              value={String(minutes).padStart(2, '0')}
              onChange={handleTimeChange}
              onKeyDown={handleKeyDown}
              className="w-24 rounded-lg border border-gray-300 bg-gray-50 p-3 text-center font-mono text-5xl font-bold text-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-6xl dark:border-gray-600 dark:bg-gray-700 dark:text-indigo-400"
              aria-label="Minutes"
            />
            <span className="text-5xl font-bold text-gray-400 sm:text-6xl dark:text-gray-500">
              :
            </span>
            <input
              ref={secondsRef}
              type="number"
              min={0}
              max={59}
              value={String(seconds).padStart(2, '0')}
              onChange={handleTimeChange}
              onKeyDown={handleKeyDown}
              className="w-24 rounded-lg border border-gray-300 bg-gray-50 p-3 text-center font-mono text-5xl font-bold text-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-6xl dark:border-gray-600 dark:bg-gray-700 dark:text-indigo-400"
              aria-label="Seconds"
            />
          </div>
        ) : (
          <p className="font-mono text-6xl font-bold text-indigo-600 sm:text-7xl dark:text-indigo-400">
            {formatTime(remainingSeconds)}
          </p>
        )}

        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {isIdle ? 'Min 00:10 · Max 59:59' : '\u00A0'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {isIdle && (
          <button
            onClick={start}
            disabled={remainingSeconds < 10}
            className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start
          </button>
        )}

        {isRunning && (
          <>
            <button
              onClick={pause}
              className="flex-1 cursor-pointer rounded-lg bg-amber-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-amber-600"
            >
              Pause
            </button>
            <button
              onClick={reset}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button
              onClick={start}
              className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Resume
            </button>
            <button
              onClick={reset}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
