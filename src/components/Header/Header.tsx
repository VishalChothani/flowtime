import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoIcon } from '../icons';
import { LanguageSelector } from '../LanguageSelector';

function getRandomQuote(quotes: string[]) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function Header() {
  const { t } = useTranslation();
  const quotes = t('quotes', { returnObjects: true }) as string[];
  const quote = useMemo(() => getRandomQuote(quotes), [quotes]);

  return (
    <header
      role="banner"
      className="fixed top-0 right-0 left-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <a href="/" aria-label="flowtime — Go to homepage">
          <h1>
            <LogoIcon className="h-10 w-auto sm:h-12" />
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

          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
