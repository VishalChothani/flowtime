import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShortcutsPanel } from './ShortcutsPanel';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'shortcuts.title': 'Keyboard Shortcuts',
        'shortcuts.startPause': 'Start / Pause timer',
        'shortcuts.reset': 'Reset timer',
        'shortcuts.edit': 'Edit timer',
        'shortcuts.theme': 'Open theme selector',
        'shortcuts.music': 'Open music selector',
        'shortcuts.notes': 'Open notes',
        'shortcuts.help': 'Show shortcuts',
        'shortcuts.close': 'Close panel',
      };
      return translations[key] ?? key;
    },
  }),
}));

describe('ShortcutsPanel', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <ShortcutsPanel isOpen={false} onClose={() => {}} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders all shortcuts when open', () => {
    render(<ShortcutsPanel isOpen={true} onClose={() => {}} />);

    expect(screen.getByText(/Keyboard Shortcuts/)).toBeInTheDocument();
    expect(screen.getByText('Start / Pause timer')).toBeInTheDocument();
    expect(screen.getByText('Reset timer')).toBeInTheDocument();
    expect(screen.getByText('Edit timer')).toBeInTheDocument();
    expect(screen.getByText('Open theme selector')).toBeInTheDocument();
    expect(screen.getByText('Open music selector')).toBeInTheDocument();
    expect(screen.getByText('Open notes')).toBeInTheDocument();
    expect(screen.getByText('Show shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Close panel')).toBeInTheDocument();
  });

  it('renders keyboard keys', () => {
    render(<ShortcutsPanel isOpen={true} onClose={() => {}} />);

    expect(screen.getByText('Space')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
    expect(screen.getByText('Esc')).toBeInTheDocument();
  });

  it('has dialog role with aria-label', () => {
    render(<ShortcutsPanel isOpen={true} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Keyboard Shortcuts');
  });
});
