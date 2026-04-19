import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMusicStore, type SoundKey } from '../../store/useMusicStore';

const SOUND_OPTIONS: Exclude<SoundKey, null>[] = ['ocean', 'rain', 'white'];

const SOUND_ICONS: Record<Exclude<SoundKey, null>, string> = {
  ocean: '🌊',
  rain: '🌧️',
  white: '📻',
};

interface MusicSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicSelector({ isOpen, onClose }: MusicSelectorProps) {
  const { t } = useTranslation();
  const { activeSound, isPlaying, toggle, stop } = useMusicStore();
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

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={t('music.title')}
      className="fixed right-4 bottom-20 z-50 w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6 sm:bottom-24 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="border-b border-gray-200 px-4 py-2.5 dark:border-gray-700">
        <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          {t('music.title')}
        </h3>
      </div>

      <ul role="listbox" aria-label={t('music.title')}>
        {SOUND_OPTIONS.map((sound) => {
          const isActive = activeSound === sound && isPlaying;
          return (
            <li
              key={sound}
              role="option"
              aria-selected={isActive}
              onClick={() => toggle(sound)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive
                  ? 'bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{SOUND_ICONS[sound]}</span>
                {t(`music.${sound}`)}
              </span>
              {isActive && (
                <span className="flex items-center gap-1">
                  <span className="text-xs text-indigo-500">
                    {t('music.playing')}
                  </span>
                  <span
                    className="inline-flex gap-0.5"
                    aria-hidden="true"
                  >
                    <span className="h-3 w-0.5 animate-pulse rounded-full bg-indigo-500" />
                    <span className="h-3 w-0.5 animate-pulse rounded-full bg-indigo-500 delay-75" style={{ animationDelay: '150ms' }} />
                    <span className="h-3 w-0.5 animate-pulse rounded-full bg-indigo-500 delay-150" style={{ animationDelay: '300ms' }} />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {isPlaying && (
        <div className="border-t border-gray-200 px-4 py-2.5 dark:border-gray-700">
          <button
            onClick={stop}
            className="w-full cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            aria-label={t('music.stop')}
          >
            ⏹ {t('music.stop')}
          </button>
        </div>
      )}
    </div>
  );
}
