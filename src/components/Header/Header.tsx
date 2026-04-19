import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function getRandomQuote(quotes: string[]) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function Header() {
  const { t, i18n } = useTranslation();
  const quotes = t('quotes', { returnObjects: true }) as string[];
  const quote = useMemo(() => getRandomQuote(quotes), [quotes]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header
      role="banner"
      className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" aria-label="flowtime — Go to homepage">
          <h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 160 32"
              className="h-7 w-auto sm:h-8"
              aria-hidden="true"
              role="img"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="24"
                fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
                fontSize="24"
                fontWeight="700"
                letterSpacing="-0.5"
                fill="url(#logo-gradient)"
              >
                flowtime
              </text>
            </svg>
            <span className="sr-only">flowtime</span>
          </h1>
        </a>

        <div className="flex items-center gap-3 sm:gap-4">
          <blockquote
            className="hidden max-w-xs text-right text-xs italic text-gray-500 sm:block sm:text-sm dark:text-gray-400"
            aria-label="Motivational quote"
          >
            <p>&ldquo;{quote}&rdquo;</p>
          </blockquote>

          <button
            onClick={toggleLanguage}
            aria-label={t('language.switchLanguage')}
            className="cursor-pointer rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 sm:px-3 sm:py-1.5 sm:text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
}
