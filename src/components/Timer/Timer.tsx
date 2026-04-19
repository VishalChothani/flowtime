import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTimerStore,
  formatTime,
  parseTime,
} from '../../store/useTimerStore';

export function Timer() {
  const { t } = useTranslation();
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

  const statusLabel = isRunning
    ? t('timer.focusTime')
    : isPaused
      ? t('timer.paused')
      : isFinished
        ? t('timer.timesUp')
        : t('timer.setYourTimer');

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
    <section
      aria-label={t('timer.countdownTimer')}
      className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Timer Display */}
      <div className="mb-6 text-center">
        <p
          className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400"
          aria-live="polite"
        >
          {statusLabel}
        </p>

        {isIdle ? (
          <fieldset className="border-none p-0">
            <legend className="sr-only">
              {t('timer.setCountdownDuration')}
            </legend>
            <div className="flex items-center justify-center gap-2">
              <label htmlFor="timer-minutes" className="sr-only">
                {t('timer.minutes')}
              </label>
              <input
                id="timer-minutes"
                ref={minutesRef}
                type="number"
                min={0}
                max={59}
                value={String(minutes).padStart(2, '0')}
                onChange={handleTimeChange}
                onKeyDown={handleKeyDown}
                className="w-24 rounded-lg border border-gray-300 bg-gray-50 p-3 text-center font-mono text-5xl font-bold text-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-6xl dark:border-gray-600 dark:bg-gray-700 dark:text-indigo-400"
                aria-label={t('timer.minutes')}
              />
              <span
                className="text-5xl font-bold text-gray-400 sm:text-6xl dark:text-gray-500"
                aria-hidden="true"
              >
                :
              </span>
              <label htmlFor="timer-seconds" className="sr-only">
                {t('timer.seconds')}
              </label>
              <input
                id="timer-seconds"
                ref={secondsRef}
                type="number"
                min={0}
                max={59}
                value={String(seconds).padStart(2, '0')}
                onChange={handleTimeChange}
                onKeyDown={handleKeyDown}
                className="w-24 rounded-lg border border-gray-300 bg-gray-50 p-3 text-center font-mono text-5xl font-bold text-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-6xl dark:border-gray-600 dark:bg-gray-700 dark:text-indigo-400"
                aria-label={t('timer.seconds')}
              />
            </div>
          </fieldset>
        ) : (
          <output
            aria-live="polite"
            aria-atomic="true"
            aria-label={t('timer.timeRemaining', {
              time: formatTime(remainingSeconds),
            })}
            className="block font-mono text-6xl font-bold text-indigo-600 sm:text-7xl dark:text-indigo-400"
          >
            <time dateTime={`PT${minutes}M${seconds}S`}>
              {formatTime(remainingSeconds)}
            </time>
          </output>
        )}

        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {isIdle ? t('timer.minMax') : '\u00A0'}
        </p>
      </div>

      {/* Controls */}
      <nav aria-label={t('timer.timerControls')} className="flex gap-3">
        {isIdle && (
          <button
            onClick={start}
            disabled={remainingSeconds < 10}
            aria-label={t('timer.startCountdown')}
            className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('timer.start')}
          </button>
        )}

        {isRunning && (
          <>
            <button
              onClick={pause}
              aria-label={t('timer.pauseCountdown')}
              className="flex-1 cursor-pointer rounded-lg bg-amber-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-amber-600"
            >
              {t('timer.pause')}
            </button>
            <button
              onClick={reset}
              aria-label={t('timer.resetCountdown')}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {t('timer.reset')}
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button
              onClick={start}
              aria-label={t('timer.resumeCountdown')}
              className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {t('timer.resume')}
            </button>
            <button
              onClick={reset}
              aria-label={t('timer.resetCountdown')}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {t('timer.reset')}
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
