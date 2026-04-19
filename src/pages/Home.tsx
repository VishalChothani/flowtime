import { useTranslation } from 'react-i18next';
import { FloatingActions } from '../components/FloatingActions';
import { Header } from '../components/Header';
import { Timer } from '../components/Timer';
import { useThemeStore } from '../store/useThemeStore';

function getThemeClasses(mode: string, gradient: string) {
  switch (mode) {
    case 'dark':
      return {
        bg: 'bg-gray-950',
        heading: 'text-white',
        subtitle: 'text-gray-300',
        quote: 'text-gray-400',
      };
    case 'gradient':
      return {
        bg: `bg-gradient-to-br ${gradient}`,
        heading: 'text-white drop-shadow-lg',
        subtitle: 'text-white/80',
        quote: 'text-white/70',
      };
    default: // light
      return {
        bg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        heading: 'text-gray-900',
        subtitle: 'text-gray-600',
        quote: 'text-gray-500',
      };
  }
}

export function Home() {
  const { t } = useTranslation();
  const { mode, gradient } = useThemeStore();
  const theme = getThemeClasses(mode, gradient);

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-500 ${theme.bg}`}
    >
      <Header themeClasses={theme} />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-16">
        <article className="w-full text-center">
          <h2
            className={`mb-2 text-4xl font-bold tracking-tight sm:text-5xl ${theme.heading}`}
          >
            {t('home.title')}
          </h2>
          <p className={`mb-8 text-base sm:text-lg ${theme.subtitle}`}>
            {t('home.subtitle')}
          </p>

          <Timer />
        </article>
      </main>

      <FloatingActions />
    </div>
  );
}
