import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getNote, saveNote } from '../../lib/notesDb';

interface NotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotesPanel({ isOpen, onClose }: NotesPanelProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  // Load note from IndexedDB on mount
  useEffect(() => {
    getNote().then((note) => {
      if (note) setContent(note.content);
    });
  }, []);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  // Auto-save with debounce
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setContent(value);
      setIsSaved(false);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = window.setTimeout(() => {
        saveNote(value).then(() => {
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        });
      }, 500);
    },
    [],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={t('notes.title')}
      aria-modal="false"
      className="fixed right-4 bottom-20 z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6 sm:bottom-24 sm:w-96 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          ✏️ {t('notes.title')}
        </h3>
        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-xs text-green-500">{t('notes.saved')}</span>
          )}
          <button
            onClick={onClose}
            aria-label={t('notes.close')}
            className="cursor-pointer rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="p-3">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder={t('notes.placeholder')}
          className="h-48 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          aria-label={t('notes.title')}
        />
      </div>
    </div>
  );
}
