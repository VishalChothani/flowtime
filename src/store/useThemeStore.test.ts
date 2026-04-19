import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useThemeStore } from './useThemeStore';
import { ThemeMode, GRADIENTS, STORAGE_KEYS } from '../constants';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
  useThemeStore.setState({
    mode: ThemeMode.Light,
    gradient: GRADIENTS[0],
  });
});

describe('useThemeStore', () => {
  it('starts with light mode', () => {
    expect(useThemeStore.getState().mode).toBe(ThemeMode.Light);
  });

  it('sets mode to dark', () => {
    useThemeStore.getState().setMode(ThemeMode.Dark);
    expect(useThemeStore.getState().mode).toBe(ThemeMode.Dark);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.theme,
      ThemeMode.Dark,
    );
  });

  it('sets mode to gradient and assigns a random gradient', () => {
    useThemeStore.getState().setMode(ThemeMode.Gradient);
    const state = useThemeStore.getState();
    expect(state.mode).toBe(ThemeMode.Gradient);
    expect(GRADIENTS).toContain(state.gradient);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.gradient,
      expect.any(String),
    );
  });

  it('shuffleGradient changes the gradient', () => {
    useThemeStore.getState().setMode(ThemeMode.Gradient);

    // Shuffle multiple times to ensure it picks from GRADIENTS
    for (let i = 0; i < 20; i++) {
      useThemeStore.getState().shuffleGradient();
    }
    const current = useThemeStore.getState().gradient;
    expect(GRADIENTS).toContain(current);
  });

  it('persists theme to localStorage', () => {
    useThemeStore.getState().setMode(ThemeMode.Dark);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.theme,
      ThemeMode.Dark,
    );
  });
});
