import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  EditTimerIcon,
  KeyboardIcon,
  LogoIcon,
  MusicIcon,
  PaletteIcon,
  PencilIcon,
  ResetIcon,
} from './index';

const icons = [
  { name: 'EditTimerIcon', Component: EditTimerIcon },
  { name: 'KeyboardIcon', Component: KeyboardIcon },
  { name: 'LogoIcon', Component: LogoIcon },
  { name: 'MusicIcon', Component: MusicIcon },
  { name: 'PaletteIcon', Component: PaletteIcon },
  { name: 'PencilIcon', Component: PencilIcon },
  { name: 'ResetIcon', Component: ResetIcon },
];

describe('Icon components', () => {
  icons.forEach(({ name, Component }) => {
    it(`${name} renders an SVG element`, () => {
      const { container } = render(<Component />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it(`${name} passes className prop`, () => {
      const { container } = render(<Component className="h-8 w-8 text-red-500" />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('class')).toContain('h-8');
      expect(svg?.getAttribute('class')).toContain('text-red-500');
    });

    it(`${name} has aria-hidden attribute`, () => {
      const { container } = render(<Component />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
