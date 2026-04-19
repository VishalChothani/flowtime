import { useTranslation } from 'react-i18next';
import { MusicIcon, PaletteIcon, PencilIcon } from '../icons';

export function FloatingActions() {
  const { t } = useTranslation();

  return (
    <aside
      aria-label={t('actions.quickActions')}
      className="fixed right-4 bottom-6 z-50 flex gap-3 sm:right-6 sm:bottom-8 sm:gap-4"
    >
      <button
        aria-label={t('actions.theme')}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <PaletteIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      <button
        aria-label={t('actions.music')}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <MusicIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      <button
        aria-label={t('actions.edit')}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <PencilIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>
    </aside>
  );
}
