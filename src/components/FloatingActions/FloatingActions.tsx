import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardIcon, MusicIcon, PaletteIcon, PencilIcon } from '../icons';
import { MusicSelector } from '../MusicSelector';
import { NotesPanel } from '../NotesPanel';
import { ShortcutsPanel } from '../ShortcutsPanel';
import { ThemeSelector } from '../ThemeSelector';
import { useMusicStore } from '../../store/useMusicStore';
import { useTimerStore } from '../../store/useTimerStore';
import { TimerStatus, PanelType } from '../../constants';

type Panel = PanelType | null;

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
          if (status === TimerStatus.Running) pause();
          else if (status === TimerStatus.Paused || status === TimerStatus.Idle) start();
          break;
        case 'r':
        case 'R':
          reset();
          break;
        case 'e':
        case 'E':
          window.dispatchEvent(new CustomEvent('flowtime:edit-timer'));
          break;
        case 't':
        case 'T':
          togglePanel(PanelType.Theme);
          break;
        case 'm':
        case 'M':
          togglePanel(PanelType.Music);
          break;
        case 'n':
        case 'N':
          togglePanel(PanelType.Notes);
          break;
        case '?':
          togglePanel(PanelType.Shortcuts);
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
      <ThemeSelector isOpen={activePanel === PanelType.Theme} onClose={closePanel} />
      <MusicSelector isOpen={activePanel === PanelType.Music} onClose={closePanel} />
      <NotesPanel isOpen={activePanel === PanelType.Notes} onClose={closePanel} />
      <ShortcutsPanel isOpen={activePanel === PanelType.Shortcuts} onClose={closePanel} />

      <aside
        aria-label={t('actions.quickActions')}
        className="fixed right-4 bottom-6 z-50 flex gap-3 sm:right-6 sm:bottom-8 sm:gap-4"
      >
        <button
          onClick={() => togglePanel(PanelType.Shortcuts)}
          aria-label={t('shortcuts.title')}
          aria-expanded={activePanel === PanelType.Shortcuts}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === PanelType.Shortcuts
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <KeyboardIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <button
          onClick={() => togglePanel(PanelType.Theme)}
          aria-label={t('actions.theme')}
          aria-expanded={activePanel === PanelType.Theme}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === PanelType.Theme
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <PaletteIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <button
          onClick={() => togglePanel(PanelType.Music)}
          aria-label={t('actions.music')}
          aria-expanded={activePanel === PanelType.Music}
          className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === PanelType.Music
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : isPlaying
                ? 'bg-indigo-700/90 text-white hover:bg-indigo-600/90'
                : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
          }`}
        >
          <MusicIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          {isPlaying && activePanel !== PanelType.Music && (
            <span
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-400"
              aria-hidden="true"
            />
          )}
        </button>

        <button
          onClick={() => togglePanel(PanelType.Notes)}
          aria-label={t('actions.edit')}
          aria-expanded={activePanel === PanelType.Notes}
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl shadow-lg backdrop-blur-sm transition-all hover:scale-110 sm:h-14 sm:w-14 ${
            activePanel === PanelType.Notes
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
