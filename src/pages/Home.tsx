import { Header } from '../components/Header';
import { Timer } from '../components/Timer';

export function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-16">
        <div className="w-full text-center">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Stay in the flow
          </h2>
          <p className="mb-8 text-base text-gray-600 sm:text-lg dark:text-gray-300">
            Set your focus timer and get to work
          </p>

          <Timer />

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/about"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              About →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
