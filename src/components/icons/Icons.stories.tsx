import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  EditTimerIcon,
  KeyboardIcon,
  LogoIcon,
  MusicIcon,
  PaletteIcon,
  PencilIcon,
  ResetIcon,
} from './index';

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const AllIcons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-8">
      {[
        { name: 'EditTimerIcon', Icon: EditTimerIcon },
        { name: 'KeyboardIcon', Icon: KeyboardIcon },
        { name: 'MusicIcon', Icon: MusicIcon },
        { name: 'PaletteIcon', Icon: PaletteIcon },
        { name: 'PencilIcon', Icon: PencilIcon },
        { name: 'ResetIcon', Icon: ResetIcon },
      ].map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon className="h-8 w-8 text-white" />
          <span className="text-xs text-gray-400">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Logo: StoryObj = {
  render: () => (
    <div className="p-8">
      <LogoIcon className="h-12" />
    </div>
  ),
};

export const IconSizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-4 p-8">
      <PaletteIcon className="h-4 w-4 text-white" />
      <PaletteIcon className="h-6 w-6 text-white" />
      <PaletteIcon className="h-8 w-8 text-white" />
      <PaletteIcon className="h-12 w-12 text-white" />
      <PaletteIcon className="h-16 w-16 text-white" />
    </div>
  ),
};

export const IconColors: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <MusicIcon className="h-8 w-8 text-white" />
      <MusicIcon className="h-8 w-8 text-indigo-500" />
      <MusicIcon className="h-8 w-8 text-emerald-500" />
      <MusicIcon className="h-8 w-8 text-amber-500" />
      <MusicIcon className="h-8 w-8 text-rose-500" />
    </div>
  ),
};
