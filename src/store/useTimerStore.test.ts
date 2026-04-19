import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useTimerStore, formatTime, parseTime } from './useTimerStore';
import { TimerStatus } from '../constants';

// Reset store between tests
beforeEach(() => {
  vi.useFakeTimers();
  useTimerStore.setState({
    initialSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    status: TimerStatus.Idle,
    intervalId: null,
  });
});

afterEach(() => {
  // Clean up any running intervals
  const { intervalId } = useTimerStore.getState();
  if (intervalId !== null) clearInterval(intervalId);
  vi.useRealTimers();
});

// ── formatTime ─────────────────────────────────────────
describe('formatTime', () => {
  it('formats 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('formats 90 seconds as 01:30', () => {
    expect(formatTime(90)).toBe('01:30');
  });

  it('formats 25 minutes as 25:00', () => {
    expect(formatTime(25 * 60)).toBe('25:00');
  });

  it('formats 59:59 correctly', () => {
    expect(formatTime(59 * 60 + 59)).toBe('59:59');
  });

  it('pads single digits', () => {
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(65)).toBe('01:05');
  });
});

// ── parseTime ──────────────────────────────────────────
describe('parseTime', () => {
  it('parses valid minutes and seconds', () => {
    expect(parseTime('5', '30')).toBe(5 * 60 + 30);
  });

  it('clamps minutes to 0-59', () => {
    expect(parseTime('99', '0')).toBe(59 * 60);
    expect(parseTime('-5', '0')).toBe(0);
  });

  it('clamps seconds to 0-59', () => {
    expect(parseTime('0', '99')).toBe(59);
    expect(parseTime('0', '-5')).toBe(0);
  });

  it('handles empty strings as 0', () => {
    expect(parseTime('', '')).toBe(0);
  });

  it('handles non-numeric strings as 0', () => {
    expect(parseTime('abc', 'xyz')).toBe(0);
  });
});

// ── useTimerStore ──────────────────────────────────────
describe('useTimerStore', () => {
  it('starts with idle status and 25 minutes', () => {
    const state = useTimerStore.getState();
    expect(state.status).toBe(TimerStatus.Idle);
    expect(state.remainingSeconds).toBe(25 * 60);
    expect(state.initialSeconds).toBe(25 * 60);
  });

  it('starts the timer', () => {
    useTimerStore.getState().start();
    expect(useTimerStore.getState().status).toBe(TimerStatus.Running);
    expect(useTimerStore.getState().intervalId).not.toBeNull();
  });

  it('does not start if already running', () => {
    useTimerStore.getState().start();
    const firstId = useTimerStore.getState().intervalId;
    useTimerStore.getState().start();
    expect(useTimerStore.getState().intervalId).toBe(firstId);
  });

  it('pauses the timer', () => {
    useTimerStore.getState().start();
    useTimerStore.getState().pause();
    expect(useTimerStore.getState().status).toBe(TimerStatus.Paused);
    expect(useTimerStore.getState().intervalId).toBeNull();
  });

  it('resets the timer', () => {
    useTimerStore.getState().start();
    vi.advanceTimersByTime(5000);
    useTimerStore.getState().reset();

    const state = useTimerStore.getState();
    expect(state.status).toBe(TimerStatus.Idle);
    expect(state.remainingSeconds).toBe(25 * 60);
    expect(state.intervalId).toBeNull();
  });

  it('ticks down every second', () => {
    useTimerStore.getState().start();
    vi.advanceTimersByTime(3000);
    expect(useTimerStore.getState().remainingSeconds).toBe(25 * 60 - 3);
  });

  it('stops at 0 and returns to idle', () => {
    useTimerStore.setState({ initialSeconds: 3, remainingSeconds: 3 });
    useTimerStore.getState().start();
    vi.advanceTimersByTime(3000);

    const state = useTimerStore.getState();
    expect(state.remainingSeconds).toBe(0);
    expect(state.status).toBe(TimerStatus.Idle);
    expect(state.intervalId).toBeNull();
  });

  it('setDuration only works when idle', () => {
    useTimerStore.getState().setDuration(10 * 60);
    expect(useTimerStore.getState().remainingSeconds).toBe(10 * 60);

    useTimerStore.getState().start();
    useTimerStore.getState().setDuration(5 * 60);
    // Should not change while running
    expect(useTimerStore.getState().initialSeconds).toBe(10 * 60);
  });

  it('setDuration clamps to min/max', () => {
    useTimerStore.getState().setDuration(1); // below min (10)
    expect(useTimerStore.getState().remainingSeconds).toBe(10);

    useTimerStore.getState().setDuration(99999); // above max (59:59)
    expect(useTimerStore.getState().remainingSeconds).toBe(59 * 60 + 59);
  });

  it('does not start with 0 remaining seconds', () => {
    useTimerStore.setState({ remainingSeconds: 0 });
    useTimerStore.getState().start();
    expect(useTimerStore.getState().status).toBe(TimerStatus.Idle);
  });

  it('can resume after pause', () => {
    useTimerStore.getState().start();
    vi.advanceTimersByTime(2000);
    useTimerStore.getState().pause();
    const remaining = useTimerStore.getState().remainingSeconds;

    useTimerStore.getState().start();
    expect(useTimerStore.getState().status).toBe(TimerStatus.Running);
    vi.advanceTimersByTime(1000);
    expect(useTimerStore.getState().remainingSeconds).toBe(remaining - 1);
  });
});
