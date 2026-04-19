import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: 'Space', i18nKey: 'shortcuts.startPause' },
  { key: 'R', i18nKey: 'shortcuts.reset' },
  { key: 'E', i18nKey: 'shortcuts.edit' },
  { key: 'T', i18nKey: 'shortcuts.theme' },
  { key: 'M', i18nKey: 'shortcuts.music' },
  { key: 'N', i18nKey: 'shortcuts.notes' },
  { key: '?', i18nKey: 'shortcuts.help' },
  { key: 'Esc', i18nKey: 'shortcuts.close' },
];

export function ShortcutsPanel({ isOpen, onClose }: ShortcutsPanelProps) {
  const { t } = useTranslation();
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
      aria-label={t('shortcuts.title')}
      className="fixed right-4 bottom-20 z-50 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6 sm:bottom-24 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h3 className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200">
          ⌨️ {t('shortcuts.title')}
        </h3>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {SHORTCUTS.map(({ key, i18nKey }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <span className="text-gray-600 dark:text-gray-300">
              {t(i18nKey)}
            </span>
            <kbd className="ml-3 inline-flex min-w-[2rem] items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
