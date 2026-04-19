import { create } from 'zustand';
import {
  TimerStatus,
  TIMER_DEFAULT_SECONDS,
  TIMER_MIN_SECONDS,
  TIMER_MAX_SECONDS,
} from '../constants';

interface TimerState {
  /** Total seconds set by the user */
  initialSeconds: number;
  /** Remaining seconds on the countdown */
  remainingSeconds: number;
  /** Current timer status */
  status: TimerStatus;
  /** Interval ID for cleanup */
  intervalId: number | null;

  /** Start or resume the countdown */
  start: () => void;
  /** Pause the countdown */
  pause: () => void;
  /** Reset to the initial time */
  reset: () => void;
  /** Set the countdown duration (only when idle) */
  setDuration: (seconds: number) => void;
  /** Internal: tick one second */
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  initialSeconds: TIMER_DEFAULT_SECONDS,
  remainingSeconds: TIMER_DEFAULT_SECONDS,
  status: TimerStatus.Idle,
  intervalId: null,

  start: () => {
    const { status, remainingSeconds } = get();
    if (status === TimerStatus.Running || remainingSeconds <= 0) return;

    const id = window.setInterval(() => {
      get().tick();
    }, 1000);

    set({ status: TimerStatus.Running, intervalId: id });
  },

  pause: () => {
    const { intervalId } = get();
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    set({ status: TimerStatus.Paused, intervalId: null });
  },

  reset: () => {
    const { intervalId, initialSeconds } = get();
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    set({
      remainingSeconds: initialSeconds,
      status: TimerStatus.Idle,
      intervalId: null,
    });
  },

  setDuration: (seconds: number) => {
    const { status } = get();
    if (status !== TimerStatus.Idle) return;

    const clamped = Math.max(TIMER_MIN_SECONDS, Math.min(TIMER_MAX_SECONDS, seconds));
    set({ initialSeconds: clamped, remainingSeconds: clamped });
  },

  tick: () => {
    const { remainingSeconds, intervalId } = get();
    if (remainingSeconds <= 1) {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      set({ remainingSeconds: 0, status: TimerStatus.Idle, intervalId: null });
      return;
    }
    set({ remainingSeconds: remainingSeconds - 1 });
  },
}));

/** Helper: format seconds to MM:SS */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/** Helper: parse MM:SS string to total seconds */
export function parseTime(mm: string, ss: string): number {
  const minutes = Math.max(0, Math.min(59, parseInt(mm, 10) || 0));
  const seconds = Math.max(0, Math.min(59, parseInt(ss, 10) || 0));
  return minutes * 60 + seconds;
}
