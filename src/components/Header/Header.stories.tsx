import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    themeClasses: {
      bg: 'bg-gray-950',
      heading: 'text-white',
      subtitle: 'text-gray-300',
      quote: 'text-gray-400',
    },
  },
};

export const LightTheme: Story = {
  args: {
    themeClasses: {
      bg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      heading: 'text-gray-900',
      subtitle: 'text-gray-600',
      quote: 'text-gray-500',
    },
  },
};
