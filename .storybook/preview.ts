import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import '../src/i18n';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#030712' },
        { name: 'light', value: '#eef2ff' },
        { name: 'gradient', value: 'linear-gradient(135deg, #6366f1, #a855f7)' },
      ],
    },
  },
};

export default preview;
