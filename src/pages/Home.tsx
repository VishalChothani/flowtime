import { useAppStore } from '../store/useAppStore';

export function Home() {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          ⏱️ Flowtime
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Your productivity companion — built with React, Vite & Tailwind
        </p>

        <div className="mx-auto max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Zustand Counter Demo
          </p>
          <p className="mb-6 text-6xl font-bold text-indigo-600 dark:text-indigo-400">
            {count}
          </p>
          <div className="flex gap-3">
            <button
              onClick={decrement}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              −
            </button>
            <button
              onClick={reset}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Reset
            </button>
            <button
              onClick={increment}
              className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/about"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            About →
          </a>
        </div>
      </div>
    </div>
  );
}
