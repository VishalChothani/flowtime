import { create } from 'zustand';
import { ThemeMode, GRADIENTS, STORAGE_KEYS } from '../constants';

function getRandomGradient(): string {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

interface ThemeState {
  mode: ThemeMode;
  gradient: string;
  setMode: (mode: ThemeMode) => void;
  shuffleGradient: () => void;
}

const savedMode = (localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode) ?? ThemeMode.Light;
const savedGradient = localStorage.getItem(STORAGE_KEYS.gradient) ?? getRandomGradient();

export const useThemeStore = create<ThemeState>((set) => ({
  mode: savedMode,
  gradient: savedGradient,
  setMode: (mode) => {
    localStorage.setItem(STORAGE_KEYS.theme, mode);
    if (mode === ThemeMode.Gradient) {
      const g = getRandomGradient();
      localStorage.setItem(STORAGE_KEYS.gradient, g);
      set({ mode, gradient: g });
    } else {
      set({ mode });
    }
  },
  shuffleGradient: () => {
    const g = getRandomGradient();
    localStorage.setItem(STORAGE_KEYS.gradient, g);
    set({ gradient: g });
  },
}));
