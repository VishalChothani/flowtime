# ⏱️ Flowtime

A modern React application built with a powerful developer-first tech stack.

## Tech Stack

| Tool                  | Purpose              |
| --------------------- | -------------------- |
| **React 19**          | UI framework         |
| **React Router v7**   | Client-side routing  |
| **Vite 8**            | Build tool & dev server |
| **TypeScript 6**      | Type safety          |
| **Tailwind CSS v4**   | Utility-first styling |
| **Zustand**           | State management     |
| **TanStack React Query** | Data fetching     |
| **Storybook 10**      | Component development |
| **ESLint 9**          | Linting (flat config) |
| **Prettier**          | Code formatting      |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm storybook
```

## Available Scripts

| Command               | Description                        |
| --------------------- | ---------------------------------- |
| `pnpm dev`            | Start Vite dev server              |
| `pnpm build`          | Type-check & build for production  |
| `pnpm preview`        | Preview production build           |
| `pnpm lint`           | Run ESLint                         |
| `pnpm lint:fix`       | Run ESLint with auto-fix           |
| `pnpm format`         | Format code with Prettier          |
| `pnpm format:check`   | Check formatting                   |
| `pnpm storybook`      | Start Storybook dev server         |
| `pnpm build-storybook`| Build Storybook for deployment     |

## Project Structure

```
src/
├── app/
│   ├── App.tsx          # Main app with React Router
│   └── providers.tsx    # React Query provider
├── components/
│   └── Button/
│       ├── Button.tsx          # Button component
│       ├── Button.stories.tsx  # Storybook stories
│       └── index.ts            # Barrel export
├── pages/
│   ├── Home.tsx         # Home page with Zustand demo
│   └── About.tsx        # About page with tech stack
├── store/
│   └── useAppStore.ts   # Zustand store
├── stories/             # Storybook example stories
├── main.tsx             # App entry point
└── index.css            # Tailwind CSS imports
```
