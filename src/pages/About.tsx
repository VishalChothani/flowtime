import { Link } from 'react-router';

export function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          About Flowtime
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Flowtime is a modern React application scaffolded with a powerful tech
          stack designed for productivity and developer experience.
        </p>

        <div className="mb-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
          {[
            { name: 'React 19', emoji: '⚛️' },
            { name: 'React Router v7', emoji: '🧭' },
            { name: 'Vite', emoji: '⚡' },
            { name: 'TypeScript', emoji: '🔷' },
            { name: 'Tailwind CSS v4', emoji: '🎨' },
            { name: 'Zustand', emoji: '🐻' },
            { name: 'React Query', emoji: '🔄' },
            { name: 'Storybook', emoji: '📖' },
            { name: 'ESLint + Prettier', emoji: '✨' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <span className="mr-2">{tech.emoji}</span>
              {tech.name}
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
