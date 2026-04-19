import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardIcon, MusicIcon, PaletteIcon, PencilIcon } from '../icons';
import { MusicSelector } from '../MusicSelector';
import { NotesPanel } from '../NotesPanel';
import { ShortcutsPanel } from '../ShortcutsPanel';
import { ThemeSelector } from '../ThemeSelector';
import { useMusicStore } from '../../store/useMusicStore';
import { useTimerStore } from '../../store/useTimerStore';

type Panel = 'theme' | 'music' | 'notes' | 'shortcuts' | null;

export function FloatingActions() {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const { isPlaying } = useMusicStore();
  const { status, start, pause, reset } = useTimerStore();

  const togglePanel = useCallback(
    (panel: Panel) => {
      setActivePanel((prev) => (prev === panel ? null : panel));
    },
    [],
  );

  const closePanel = useCallback(() => setActivePanel(null), []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (status === 'running') pause();
          else if (status === 'paused' || status === 'idle') start();
          break;
        case 'r':
        case 'R':
          reset();
          break;
        case 'e':
        case 'E':
          // Dispatch a custom event that Timer listens for
          window.dispatchEvent(new CustomEvent('flowtime:edit-timer'));
          break;
        case 't':
        case 'T':
          togglePanel('theme');
          break;
        case 'm':
        case 'M':
          togglePanel('music');
          break;
        case 'n':
        case 'N':
          togglePanel('notes');
          break;
        case '?':
          togglePanel('shortcuts');
          break;
        case 'Escape':
          closePanel();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [status, start, pause, reset, togglePanel, closePanel]);

  return (
    <>
      <ThemeSelector isOpen={activePanel === 'theme'} onClose={closePanel} />
      <MusicSelector isOpen={activePanel === 'music'} onClose={closePanel} />
      <NotesPanel isOpen={activePanel === 'notes'} onClose={closePanel} />
      <ShortcutsPanel isOpen={activePanel === 'shortcuts'} onClose={closePanel} />

      <aside
        aria-label={t('actions.quickActions')}
        className="fixed right-4 bottom-6 z-50 flex gap-3 sm:right-6 sm:bottom-8 sm:gap-4"
      >
        <button
          onClick={() => togglePanel('shortcuts')}
          aria-label={t('shortcuts.title')}
          aria-expanded={activePanel === 'shortcuts'}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === 'shortcuts'
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <KeyboardIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <button
          onClick={() => togglePanel('theme')}
          aria-label={t('actions.theme')}
          aria-expanded={activePanel === 'theme'}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === 'theme'
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <PaletteIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <button
          onClick={() => togglePanel('music')}
          aria-label={t('actions.music')}
          aria-expanded={activePanel === 'music'}
          className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === 'music'
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : isPlaying
                ? 'bg-indigo-700/90 text-white hover:bg-indigo-600/90'
                : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <MusicIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          {isPlaying && activePanel !== 'music' && (
            <span
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-400"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          onClick={() => togglePanel('notes')}
          aria-label={t('actions.edit')}
          aria-expanded={activePanel === 'notes'}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === 'notes'
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <PencilIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </aside>
    </>
  );
}
