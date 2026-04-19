import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSelector } from './ThemeSelector';

const meta: Meta<typeof ThemeSelector> = {
  title: 'Components/ThemeSelector',
  component: ThemeSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeSelector>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
