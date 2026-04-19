import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'gradient';

const GRADIENTS = [
  'from-emerald-400 via-cyan-500 to-blue-600',
  'from-rose-400 via-fuchsia-500 to-indigo-500',
  'from-amber-400 via-orange-500 to-red-500',
  'from-teal-400 via-blue-500 to-violet-600',
  'from-lime-400 via-emerald-500 to-teal-600',
  'from-sky-400 via-indigo-500 to-purple-600',
  'from-pink-400 via-rose-500 to-orange-500',
];

function getRandomGradient(): string {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

interface ThemeState {
  mode: ThemeMode;
  gradient: string;
  setMode: (mode: ThemeMode) => void;
  shuffleGradient: () => void;
}

const savedMode = (localStorage.getItem('flowtime-theme') as ThemeMode) ?? 'light';
const savedGradient = localStorage.getItem('flowtime-gradient') ?? getRandomGradient();

export const useThemeStore = create<ThemeState>((set) => ({
  mode: savedMode,
  gradient: savedGradient,
  setMode: (mode) => {
    localStorage.setItem('flowtime-theme', mode);
    if (mode === 'gradient') {
      const g = getRandomGradient();
      localStorage.setItem('flowtime-gradient', g);
      set({ mode, gradient: g });
    } else {
      set({ mode });
    }
  },
  shuffleGradient: () => {
    const g = getRandomGradient();
    localStorage.setItem('flowtime-gradient', g);
    set({ gradient: g });
  },
}));
