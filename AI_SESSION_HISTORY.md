# AI Session History — Flowtime

**Tool:** Claude (via Cline/VS Code extension)  
**Date:** April 19, 2026  
**Duration:** ~3.5 hours  

---

## Session Overview

This document captures the AI-assisted development session for building Flowtime, a focus timer web app. All code was written through iterative collaboration with Claude via the Cline VS Code extension.

---

## Phase 1: Project Scaffolding (~30 min)

### Prompt
> Create a React app with React Router v7, Vite, Zustand, React Query, Storybook, Prettier, ESLint, and Tailwind CSS. Name it `flowtime`.

### What happened
1. Checked Node.js/pnpm versions
2. Scaffolded Vite + React + TypeScript project
3. Installed all dependencies: React Router v7, Zustand, TanStack React Query, Tailwind CSS v4, ESLint 9 (flat config), Prettier, Storybook 10
4. Configured path aliases (`@/` → `src/`)
5. Set up ESLint flat config with prettier integration
6. Created `.prettierrc` with consistent formatting rules
7. Set up Tailwind CSS v4 with `@tailwindcss/vite` plugin
8. Created initial project structure: `app/`, `components/`, `pages/`, `store/`
9. Built a demo Button component with Storybook story
10. Verified everything builds and runs

### Key decisions I directed
- Used pnpm (not npm/yarn) for faster installs
- Chose Tailwind v4 with Vite plugin (not PostCSS)
- Used ESLint 9 flat config (not legacy `.eslintrc`)
- Set up path aliases from the start

---

## Phase 2: Core App Features (~1.5 hours)

### Prompt
> Build the actual flowtime timer app

### What was built (iteratively)
1. **Constants & Types** — `TimerStatus`, `ThemeMode`, `PanelType` enums, gradient presets, storage keys, timer limits
2. **Zustand Stores:**
   - `useTimerStore` — timer state machine (idle/running/paused), `setInterval`-based countdown, `formatTime`/`parseTime` helpers, duration clamping
   - `useThemeStore` — light/dark/gradient modes with localStorage persistence
   - `useMusicStore` — ambient sound playback (ocean, rain, white noise) with HTML5 Audio
3. **i18n Setup** — i18next with English, Spanish, Italian translations, language persistence
4. **Components:**
   - `Timer` — editable countdown display, start/pause/resume/reset controls, inline duration editing
   - `Header` — logo, motivational quotes, language selector
   - `FloatingActions` — bottom-right action bar with panel toggles
   - `ThemeSelector` — light/dark/gradient picker with shuffle
   - `MusicSelector` — ambient sound picker with play/stop
   - `NotesPanel` — persistent notepad using IndexedDB
   - `ShortcutsPanel` — keyboard shortcuts reference
   - `LanguageSelector` — dropdown language picker
   - `ErrorBoundary` — class component error boundary with fallback UI
   - 7 custom SVG icon components
5. **Keyboard Shortcuts** — Space, R, E, T, M, N, ?, Esc
6. **IndexedDB** — `notesDb.ts` for persistent notes storage

### Key decisions I directed
- Editable timer (not fixed Pomodoro) — more flexible
- Three theme modes including gradient with shuffle — visual delight
- Keyboard-first design — power user friendly
- IndexedDB for notes (not localStorage) — handles larger content
- No backend — keeps it simple, fast, deployable as static files

### Course corrections
- Fixed timer not stopping at 0 (needed to clear interval and reset status)
- Fixed gradient persistence (needed to save to localStorage on shuffle)
- Adjusted theme class application for gradient mode (needed `drop-shadow-lg` for readability)

---

## Phase 3: Storybook Stories (~20 min)

### Prompt
> Set up Storybook with proper component stories

### What happened
1. Removed all default Storybook example stories (Button, Header, Page, Configure.mdx — 809 lines deleted)
2. Updated `preview.ts` with i18n initialization and background presets
3. Created stories for: Icons (AllIcons gallery, Logo, IconSizes, IconColors), Timer, ShortcutsPanel, ThemeSelector, Header
4. Verified Storybook runs on port 6006 (HTTP 200)

---

## Phase 4: Unit Tests (~45 min)

### Prompt
> Write unit tests using vitest for all components

### What happened
1. Installed `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
2. Configured vitest with `unit` project (jsdom environment) alongside storybook project
3. Created test setup (`src/test/setup.ts`) with jest-dom matchers, `matchMedia` mock, `Audio` mock
4. Created shared i18n mock helper (`src/test/i18nMock.ts`)
5. Wrote 111 tests across 13 test files:
   - `constants/index.test.ts` (9 tests)
   - `store/useTimerStore.test.ts` (21 tests) — formatTime, parseTime, full lifecycle
   - `store/useThemeStore.test.ts` (5 tests) — mode switching, gradient, localStorage
   - `components/ShortcutsPanel.test.tsx` (4 tests)
   - `components/ErrorBoundary.test.tsx` (5 tests)
   - `components/Header.test.tsx` (5 tests)
   - `components/Icons.test.tsx` (21 tests) — 7 icons × 3 tests each
   - `components/LanguageSelector.test.tsx` (5 tests)
   - `components/ThemeSelector.test.tsx` (8 tests)
   - `components/Timer.test.tsx` (13 tests)
   - `components/MusicSelector.test.tsx` (4 tests)
   - `components/NotesPanel.test.tsx` (5 tests)
   - `components/FloatingActions.test.tsx` (6 tests)

### Bugs found and fixed during testing
- NotesPanel mock used wrong export names (`loadNotes`/`saveNotes` → `getNote`/`saveNote`)
- FloatingActions test had duplicate `aria-label="Theme"` (button + dialog) — fixed with `getByRole('button', { name: 'Theme' })`
- ShortcutsPanel title had emoji prefix — fixed with regex matcher
- ThemeStore test had unused variable — fixed for TypeScript strict mode
- ErrorBoundary reset test — component re-throws after reset, adjusted test expectation

---

## Phase 5: Documentation & Deployment (~15 min)

### Prompt
> Read "Working software" from README 2.md and work on it

### What happened
1. Created `.env.example` — stub environment file (no keys needed)
2. Created `APPROACH.md` — problem choice, architecture decisions, UX improvements, tradeoffs, failure modes, next steps
3. Updated `README.md` — quick start, Linux container setup, features, tech stack, project structure
4. Deployed to Vercel via dashboard → https://flowtime-two.vercel.app
5. Updated URLs in docs

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total commits | ~8 |
| Components built | 12 |
| Unit tests | 111 |
| Test files | 13 |
| Storybook stories | 13 |
| Languages supported | 3 (en, es, it) |
| Zustand stores | 3 |
| Lines of test code | ~1,400 |
| Build time | ~200ms |
| Test run time | ~4s |

---

## What I Pushed Back On (AI Corrections)

1. **Docker** — AI suggested Dockerfile + docker-compose. I said "we don't need docker" since Vercel handles deployment.
2. **Mock naming** — AI initially mocked `loadNotes`/`saveNotes` but the actual exports were `getNote`/`saveNote`. Tests caught this immediately.
3. **Test assertions** — AI wrote an ErrorBoundary reset test that assumed the component would recover, but since the child still throws, it re-enters error state. Adjusted to match actual behavior.
4. **Unused variables** — TypeScript strict mode caught an unused `first` variable in theme store test. Removed it.

---

## Tools Used

- **Claude** (via Cline VS Code extension) — all code generation, test writing, documentation
- **VS Code** — IDE
- **Vercel** — deployment (via dashboard, not CLI due to auth)
- **GitHub** — version control
