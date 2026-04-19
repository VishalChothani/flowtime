import { useMemo } from 'react';

const quotes = [
  'The secret of getting ahead is getting started.',
  'Focus on being productive instead of busy.',
  'Do what you can, with what you have, where you are.',
  'Small daily improvements lead to stunning results.',
  'Action is the foundational key to all success.',
  "Don't watch the clock; do what it does — keep going.",
  'The best time to start was yesterday. The next best time is now.',
  'Productivity is never an accident. It is the result of commitment.',
  'Your future is created by what you do today, not tomorrow.',
  'It always seems impossible until it is done.',
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function Header() {
  const quote = useMemo(() => getRandomQuote(), []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl dark:text-white">
          ⏱️ flowtime
        </h1>
        <p className="max-w-[50%] text-right text-xs italic text-gray-500 sm:max-w-none sm:text-sm dark:text-gray-400">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </header>
  );
}
