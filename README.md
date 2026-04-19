# ⏱️ Flowtime

A beautiful, keyboard-first focus timer built with React 19. Editable durations, ambient sounds, quick notes, three theme modes, and full i18n support.

**Live:** [flowtime-tau.vercel.app](https://flowtime-tau.vercel.app)

---

## Quick Start

```bash
# Prerequisites: Node.js 20+ and pnpm
corepack enable

# Install dependencies
pnpm install

# Copy environment file (no keys required)
cp .env.example .env

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Setup in a Fresh Linux Container

```bash
# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# Enable pnpm
corepack enable

# Clone and run
git clone https://github.com/VishalChothani/flowtime.git
cd flowtime
pnpm install
cp .env.example .env
pnpm build && pnpm preview
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server (port 5173) |
| `pnpm build` | Type-check & production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests (111 tests) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm storybook` | Start Storybook (port 6006) |

---

## Features

- **Editable timer** — click to set any duration from 00:10 to 59:59
- **Keyboard shortcuts** — Space, R, E, T, M, N, ?, Esc
- **Three themes** — Light, Dark, Gradient (with shuffle)
- **Ambient sounds** — Ocean Waves, Rain, White Noise
- **Quick Notes** — persistent notepad (IndexedDB)
- **i18n** — English, Spanish, Italian
- **Motivational quotes** — randomized per session
- **Accessible** — ARIA roles, labels, keyboard navigation

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Vite 8 | Build tool & dev server |
| TypeScript 6 | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| Zustand | State management |
| TanStack React Query | Data fetching (future) |
| Storybook 10 | Component development |
| Vitest + Testing Library | 111 unit tests |
| i18next | Internationalization |
| ESLint 9 + Prettier | Code quality |

---

## Project Structure

```
src/
├── app/            # App shell, providers, routing
├── components/     # UI components (each with tests + stories)
│   ├── ErrorBoundary/
│   ├── FloatingActions/
│   ├── Header/
│   ├── icons/
│   ├── LanguageSelector/
│   ├── MusicSelector/
│   ├── NotesPanel/
│   ├── ShortcutsPanel/
│   ├── ThemeSelector/
│   └── Timer/
├── constants/      # Enums, config values
├── i18n/           # Translations (en, es, it)
├── lib/            # IndexedDB helpers
├── pages/          # Route pages
├── sounds/         # Ambient audio files
├── store/          # Zustand stores (timer, theme, music)
└── test/           # Test setup & shared mocks
```
