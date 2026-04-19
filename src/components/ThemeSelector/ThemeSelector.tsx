import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore, type ThemeMode } from '../../store/useThemeStore';

const THEME_OPTIONS: ThemeMode[] = ['light', 'dark', 'gradient'];

const THEME_ICONS: Record<ThemeMode, string> = {
  light: '☀️',
  dark: '🌙',
  gradient: '🎨',
};

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSelector({ isOpen, onClose }: ThemeSelectorProps) {
  const { t } = useTranslation();
  const { mode, setMode, shuffleGradient } = useThemeStore();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (option: ThemeMode) => {
    setMode(option);
    if (option !== 'gradient') {
      onClose();
    }
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={t('theme.title')}
      className="fixed right-4 bottom-20 z-50 w-48 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6 sm:bottom-24 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="border-b border-gray-200 px-4 py-2.5 dark:border-gray-700">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          {t('theme.title')}
        </h3>
      </div>

      <ul role="listbox" aria-label={t('theme.title')}>
        {THEME_OPTIONS.map((option) => (
          <li
            key={option}
            role="option"
            aria-selected={mode === option}
            onClick={() => handleSelect(option)}
            className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
              mode === option
                ? 'bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">{THEME_ICONS[option]}</span>
              {t(`theme.${option}`)}
            </span>
            {mode === option && (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>

      {mode === 'gradient' && (
        <div className="border-t border-gray-200 px-4 py-2.5 dark:border-gray-700">
          <button
            onClick={shuffleGradient}
            className="w-full cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label={t('theme.shuffle')}
          >
            🔀 {t('theme.shuffle')}
          </button>
        </div>
      )}
    </div>
  );
}
