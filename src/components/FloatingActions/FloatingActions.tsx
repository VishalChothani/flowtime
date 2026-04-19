export function FloatingActions() {
  return (
    <aside
      aria-label="Quick actions"
      className="fixed right-4 bottom-6 z-50 flex gap-3 sm:right-6 sm:bottom-8 sm:gap-4"
    >
      <button
        aria-label="Theme"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-indigo-400 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden="true"
        >
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="10.5" r="1.5" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="6.5" cy="12.5" r="1.5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      </button>

      <button
        aria-label="Music"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>

      <button
        aria-label="Edit"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gray-800/90 text-gray-300 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-gray-700/90 sm:h-14 sm:w-14 dark:bg-gray-800/90 dark:hover:bg-gray-700/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden="true"
        >
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>
    </aside>
  );
}
