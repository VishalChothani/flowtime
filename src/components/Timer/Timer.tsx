import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useTimerStore,
  formatTime,
  parseTime,
} from '../../store/useTimerStore';
import { EditTimerIcon, ResetIcon } from '../icons';
import { useThemeStore } from '../../store/useThemeStore';
import { TimerStatus, ThemeMode } from '../../constants';

export function Timer() {
  const { t } = useTranslation();
  const { remainingSeconds, status, start, pause, reset, setDuration } =
    useTimerStore();
  const { mode } = useThemeStore();

  const isLight = mode === ThemeMode.Light;
  const [isEditing, setIsEditing] = useState(false);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const isIdle = status === TimerStatus.Idle;
  const isRunning = status === TimerStatus.Running;
  const isPaused = status === TimerStatus.Paused;
  const isFinished = isIdle && remainingSeconds === 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const handleTimeChange = () => {
    const mm = minutesRef.current?.value ?? '0';
    const ss = secondsRef.current?.value ?? '0';
    const totalSeconds = parseTime(mm, ss);
    setDuration(totalSeconds);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && remainingSeconds >= 10) {
      setIsEditing(false);
      start();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    if (!isIdle) return;
    setIsEditing(true);
    setTimeout(() => minutesRef.current?.focus(), 50);
  };

  // Listen for keyboard shortcut edit event
  useEffect(() => {
    const handleEditEvent = () => handleEditClick();
    window.addEventListener('flowtime:edit-timer', handleEditEvent);
    return () => window.removeEventListener('flowtime:edit-timer', handleEditEvent);
  });

  const handleFieldsetBlur = (e: React.FocusEvent<HTMLFieldSetElement>) => {
    // Only exit edit mode if focus moves outside the fieldset
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsEditing(false);
    }
  };

  return (
    <section
      aria-label={t('timer.countdownTimer')}
      className="mx-auto w-full max-w-2xl px-4"
    >
      {/* Timer Display */}
      <div className="mb-8 text-center">
        {isIdle && isEditing ? (
          <fieldset className="border-none p-0" onBlur={handleFieldsetBlur}>
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
                className={`w-36 rounded-xl border-2 px-4 py-4 text-center font-mono text-7xl font-extrabold backdrop-blur-sm focus:ring-2 focus:outline-none sm:w-52 sm:text-8xl ${
                  isLight
                    ? 'border-gray-400/40 bg-black/5 text-gray-900 focus:border-gray-500 focus:ring-gray-400/30'
                    : 'border-white/30 bg-white/10 text-white focus:border-white/60 focus:ring-white/30'
                }`}
                aria-label={t('timer.minutes')}
              />
              <span
                className={`text-8xl font-extrabold sm:text-9xl ${isLight ? 'text-gray-400' : 'text-white/60'}`}
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
                className={`w-36 rounded-xl border-2 px-4 py-4 text-center font-mono text-7xl font-extrabold backdrop-blur-sm focus:ring-2 focus:outline-none sm:w-52 sm:text-8xl ${
                  isLight
                    ? 'border-gray-400/40 bg-black/5 text-gray-900 focus:border-gray-500 focus:ring-gray-400/30'
                    : 'border-white/30 bg-white/10 text-white focus:border-white/60 focus:ring-white/30'
                }`}
                aria-label={t('timer.seconds')}
              />
            </div>
            <p className={`mt-3 text-sm ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
              {t('timer.minMax')}
            </p>
          </fieldset>
        ) : (
          <output
            aria-live="polite"
            aria-atomic="true"
            aria-label={t('timer.timeRemaining', {
              time: formatTime(remainingSeconds),
            })}
            className={`block font-mono text-[7rem] leading-none font-extrabold drop-shadow-lg sm:text-[10rem] lg:text-[14rem] ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            <time dateTime={`PT${minutes}M${seconds}S`}>
              {formatTime(remainingSeconds)}
            </time>
          </output>
        )}

        {/* Status label */}
        {!isEditing && (
          <p
            className={`mt-2 text-lg font-medium ${isLight ? 'text-gray-500' : 'text-white/60'}`}
            aria-live="polite"
          >
            {isRunning
              ? t('timer.focusTime')
              : isPaused
                ? t('timer.paused')
                : isFinished
                  ? t('timer.timesUp')
                  : ''}
          </p>
        )}
      </div>

      {/* Controls */}
      <nav
        aria-label={t('timer.timerControls')}
        className="flex items-center justify-center gap-4"
      >
        {isIdle && !isEditing && (
          <button
            onClick={start}
            disabled={remainingSeconds < 10}
            aria-label={t('timer.startCountdown')}
            className="cursor-pointer rounded-full bg-indigo-600 px-10 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('timer.start')}
          </button>
        )}

        {isRunning && (
          <button
            onClick={pause}
            aria-label={t('timer.pauseCountdown')}
            className="cursor-pointer rounded-full bg-amber-500 px-10 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:bg-amber-400 hover:shadow-xl"
          >
            {t('timer.pause')}
          </button>
        )}

        {isPaused && (
          <button
            onClick={start}
            aria-label={t('timer.resumeCountdown')}
            className="cursor-pointer rounded-full bg-indigo-600 px-10 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-xl"
          >
            {t('timer.resume')}
          </button>
        )}

        {/* Reset button */}
        {(isRunning || isPaused) && (
          <button
            onClick={reset}
            aria-label={t('timer.resetCountdown')}
            className="cursor-pointer rounded-2xl bg-gray-800/90 p-3 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90"
          >
            <ResetIcon className="h-7 w-7" />
          </button>
        )}

        {/* Edit button — only when idle and not already editing */}
        {isIdle && !isEditing && (
          <>
            <button
              onClick={() => reset()}
              aria-label={t('timer.resetCountdown')}
              className="cursor-pointer rounded-2xl bg-gray-800/90 p-3 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90"
            >
              <ResetIcon className="h-7 w-7" />
            </button>
            <button
              onClick={handleEditClick}
              aria-label={t('timer.setCountdownDuration')}
              className="cursor-pointer rounded-2xl bg-gray-800/90 p-3 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90"
            >
              <EditTimerIcon className="h-7 w-7" />
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
