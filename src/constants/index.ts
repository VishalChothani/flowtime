// ── Timer ──────────────────────────────────────────────
export const TimerStatus = {
  Idle: 'idle',
  Running: 'running',
  Paused: 'paused',
} as const;

export type TimerStatus = (typeof TimerStatus)[keyof typeof TimerStatus];

export const TIMER_DEFAULT_SECONDS = 25 * 60; // 25 minutes
export const TIMER_MIN_SECONDS = 10; // 00:10
export const TIMER_MAX_SECONDS = 59 * 60 + 59; // 59:59

// ── Theme ──────────────────────────────────────────────
export const ThemeMode = {
  Light: 'light',
  Dark: 'dark',
  Gradient: 'gradient',
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export const GRADIENTS = [
  'from-emerald-400 via-cyan-500 to-blue-600',
  'from-rose-400 via-fuchsia-500 to-indigo-500',
  'from-amber-400 via-orange-500 to-red-500',
  'from-teal-400 via-blue-500 to-violet-600',
  'from-lime-400 via-emerald-500 to-teal-600',
  'from-sky-400 via-indigo-500 to-purple-600',
  'from-pink-400 via-rose-500 to-orange-500',
] as const;

// ── Floating Panels ────────────────────────────────────
export const PanelType = {
  Theme: 'theme',
  Music: 'music',
  Notes: 'notes',
  Shortcuts: 'shortcuts',
} as const;

export type PanelType = (typeof PanelType)[keyof typeof PanelType];

// ── Local Storage Keys ─────────────────────────────────
export const STORAGE_KEYS = {
  theme: 'flowtime-theme',
  gradient: 'flowtime-gradient',
  language: 'flowtime-lang',
} as const;
