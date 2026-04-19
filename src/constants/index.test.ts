import { describe, it, expect } from 'vitest';
import {
  TimerStatus,
  ThemeMode,
  PanelType,
  GRADIENTS,
  STORAGE_KEYS,
  TIMER_DEFAULT_SECONDS,
  TIMER_MIN_SECONDS,
  TIMER_MAX_SECONDS,
} from './index';

describe('TimerStatus', () => {
  it('has correct values', () => {
    expect(TimerStatus.Idle).toBe('idle');
    expect(TimerStatus.Running).toBe('running');
    expect(TimerStatus.Paused).toBe('paused');
  });
});

describe('ThemeMode', () => {
  it('has correct values', () => {
    expect(ThemeMode.Light).toBe('light');
    expect(ThemeMode.Dark).toBe('dark');
    expect(ThemeMode.Gradient).toBe('gradient');
  });
});

describe('PanelType', () => {
  it('has correct values', () => {
    expect(PanelType.Theme).toBe('theme');
    expect(PanelType.Music).toBe('music');
    expect(PanelType.Notes).toBe('notes');
    expect(PanelType.Shortcuts).toBe('shortcuts');
  });
});

describe('GRADIENTS', () => {
  it('has at least 5 gradients', () => {
    expect(GRADIENTS.length).toBeGreaterThanOrEqual(5);
  });

  it('each gradient contains Tailwind gradient classes', () => {
    for (const g of GRADIENTS) {
      expect(g).toMatch(/from-/);
      expect(g).toMatch(/to-/);
    }
  });
});

describe('STORAGE_KEYS', () => {
  it('has expected keys', () => {
    expect(STORAGE_KEYS.theme).toBe('flowtime-theme');
    expect(STORAGE_KEYS.gradient).toBe('flowtime-gradient');
    expect(STORAGE_KEYS.language).toBe('flowtime-lang');
  });
});

describe('Timer constants', () => {
  it('default is 25 minutes', () => {
    expect(TIMER_DEFAULT_SECONDS).toBe(25 * 60);
  });

  it('min is 10 seconds', () => {
    expect(TIMER_MIN_SECONDS).toBe(10);
  });

  it('max is 59:59', () => {
    expect(TIMER_MAX_SECONDS).toBe(59 * 60 + 59);
  });
});
