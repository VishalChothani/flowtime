import '@testing-library/jest-dom/vitest';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock Audio for music store tests
class MockAudio {
  src = '';
  loop = false;
  volume = 1;
  play = () => Promise.resolve();
  pause = () => {};
  load = () => {};
  addEventListener = () => {};
  removeEventListener = () => {};
}

Object.defineProperty(window, 'Audio', {
  writable: true,
  value: MockAudio,
});
