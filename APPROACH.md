# APPROACH.md

## What I Built

**Flowtime** — a polished, accessible focus timer web app inspired by the Flowtime Technique. I chose **Problem 3: Clone and Improve** — rebuilding the core experience of Pomodoro/focus timer apps, then making it meaningfully better.

**Live URL:** https://flowtime-two.vercel.app

---

## Why This Problem

Every focus timer I've used has the same issues: they look dated, they're rigid about timing, and they ignore the small details that make a tool feel *good* to use. I wanted to build something I'd actually keep open all day — minimal, beautiful, and keyboard-first.

---

## Key Decisions & Tradeoffs

### Architecture
- **Fully client-side SPA** — no backend needed. All state lives in Zustand stores with localStorage persistence. Notes use IndexedDB for larger content. This means zero latency, works offline, and deploys as static files.
- **React 19 + Vite 8 + TypeScript 6** — latest stable versions for speed and type safety.
- **Zustand over Redux** — simpler API, less boilerplate, perfect for this scale. Three focused stores: timer, theme, music.

### UX Improvements Over Typical Timers
- **Editable duration** — click to edit minutes/seconds inline, not locked to 25-minute Pomodoro cycles. Clamped to 00:10–59:59 with validation.
- **Three theme modes** — Light, Dark, and Gradient (with shuffle). Gradient mode picks from 10+ curated color combinations.
- **Ambient sounds** — Ocean, Rain, White Noise built in. Audio plays/pauses with the timer.
- **Quick Notes** — persistent notepad (IndexedDB) for capturing thoughts without leaving the timer.
- **Keyboard shortcuts** — Space (start/pause), R (reset), E (edit), T (theme), M (music), N (notes), ? (help), Esc (close). Discoverable via shortcuts panel.
- **i18n** — English, Spanish, Italian. Language persists across sessions.
- **Motivational quotes** — random quote in the header, localized per language.

### Quality
- **111 unit tests** across 13 test files (vitest + testing-library + jsdom)
- **Storybook** for component development with stories for all major components
- **Full accessibility** — ARIA roles, labels, keyboard navigation, screen reader support
- **ESLint + Prettier** enforced formatting

### What I Intentionally Left Out
- **User accounts / cloud sync** — adds backend complexity without improving the core timer experience. LocalStorage + IndexedDB is sufficient for a single-device tool.
- **Session history / analytics** — useful but not core. Would be the next feature.
- **Mobile app** — the web app is responsive and works well on mobile browsers. A native app would be premature.
- **Sound customization** — volume control and custom uploads would be nice but aren't essential for v1.

---

## What Breaks First Under Pressure

1. **Audio on mobile Safari** — iOS requires user gesture to play audio. The first play works (triggered by button click), but autoplay on timer start may fail on some mobile browsers.
2. **IndexedDB in private browsing** — some browsers limit or disable IndexedDB in incognito mode. Notes would fail silently.
3. **Timer accuracy during sleep** — `setInterval` drifts when the tab is backgrounded. For a focus timer this is acceptable (you're looking at the screen), but a production version would use `requestAnimationFrame` + timestamp comparison.

---

## What I'd Build Next

1. **Session history** — track completed focus sessions with timestamps, visualize streaks and daily totals
2. **Pomodoro mode** — automatic work/break cycling with configurable ratios
3. **Sound mixer** — layer multiple ambient sounds with individual volume controls
4. **PWA** — service worker for true offline support, installable on mobile
5. **Focus stats API** — optional backend to sync sessions across devices
6. **Browser notifications** — alert when timer completes even if tab is backgrounded

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
| TanStack React Query | Data fetching (ready for future API) |
| Storybook 10 | Component development |
| Vitest | Unit testing |
| Testing Library | Component testing |
| i18next | Internationalization |
| ESLint 9 + Prettier | Code quality |
