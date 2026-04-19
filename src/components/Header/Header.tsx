import { useMemo } from 'react';
import { MOTIVATIONAL_QUOTES } from '../../constants/quotes';

function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[
    Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
  ];
}

export function Header() {
  const quote = useMemo(() => getRandomQuote(), []);

  return (
    <header
      role="banner"
      className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" aria-label="Flowtime — Go to homepage">
          <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl dark:text-white">
            <span aria-hidden="true">⏱️ </span>
            flowtime
          </h1>
        </a>
        <blockquote
          className="max-w-[50%] text-right text-xs italic text-gray-500 sm:max-w-none sm:text-sm dark:text-gray-400"
          aria-label="Motivational quote"
        >
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>
      </div>
    </header>
  );
}
