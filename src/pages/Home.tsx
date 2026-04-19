import { useTranslation } from 'react-i18next';
import { FloatingActions } from '../components/FloatingActions';
import { Header } from '../components/Header';
import { Timer } from '../components/Timer';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-16">
        <article className="w-full text-center">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {t('home.title')}
          </h2>
          <p className="mb-8 text-base text-gray-600 sm:text-lg dark:text-gray-300">
            {t('home.subtitle')}
          </p>

          <Timer />
        </article>
      </main>

      <FloatingActions />
    </div>
  );
}
