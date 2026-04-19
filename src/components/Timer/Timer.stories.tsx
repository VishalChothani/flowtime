import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timer } from './Timer';

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-h-[400px] w-[800px] bg-gray-950 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Default: Story = {};

export const OnLightBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-[400px] w-[800px] bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
        <Story />
      </div>
    ),
  ],
};

export const OnGradientBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-[400px] w-[800px] bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 p-8">
        <Story />
      </div>
    ),
  ],
};
