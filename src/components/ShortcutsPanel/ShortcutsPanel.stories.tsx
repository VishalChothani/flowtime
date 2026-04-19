import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShortcutsPanel } from './ShortcutsPanel';

const meta: Meta<typeof ShortcutsPanel> = {
  title: 'Components/ShortcutsPanel',
  component: ShortcutsPanel,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShortcutsPanel>;

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
