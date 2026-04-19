export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl dark:text-white">
          ⏱️ flowtime
        </h1>
        <p className="max-w-[50%] text-right text-xs italic text-gray-500 sm:max-w-none sm:text-sm dark:text-gray-400">
          &ldquo;The secret of getting ahead is getting started.&rdquo;
        </p>
      </div>
    </header>
  );
}
