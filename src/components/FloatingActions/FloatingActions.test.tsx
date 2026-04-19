import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingActions } from './FloatingActions';
import { useTimerStore } from '../../store/useTimerStore';
import { useMusicStore } from '../../store/useMusicStore';
import { TimerStatus } from '../../constants';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

// Mock notesDb for NotesPanel
vi.mock('../../lib/notesDb', () => ({
  getNote: vi.fn().mockResolvedValue(null),
  saveNote: vi.fn().mockResolvedValue(undefined),
}));

beforeEach(() => {
  useTimerStore.setState({
    initialSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    status: TimerStatus.Idle,
    intervalId: null,
  });
  useMusicStore.setState({
    activeSound: null,
    isPlaying: false,
    audio: null,
  });
});

describe('FloatingActions', () => {
  it('renders the quick actions aside', () => {
    render(<FloatingActions />);
    expect(screen.getByLabelText('Quick actions')).toBeInTheDocument();
  });

  it('renders all four action buttons', () => {
    render(<FloatingActions />);
    expect(screen.getByLabelText('Keyboard Shortcuts')).toBeInTheDocument();
    expect(screen.getByLabelText('Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Music')).toBeInTheDocument();
    expect(screen.getByLabelText('Edit')).toBeInTheDocument();
  });

  it('toggles theme panel on click', () => {
    render(<FloatingActions />);
    const themeBtn = screen.getByLabelText('Theme');
    fireEvent.click(themeBtn);
    expect(themeBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles shortcuts panel on click', () => {
    render(<FloatingActions />);
    const shortcutsBtn = screen.getByLabelText('Keyboard Shortcuts');
    fireEvent.click(shortcutsBtn);
    expect(shortcutsBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes panel when clicking same button again', () => {
    render(<FloatingActions />);
    const themeBtn = screen.getByLabelText('Theme');
    fireEvent.click(themeBtn);
    expect(themeBtn).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(themeBtn);
    expect(themeBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('only one panel open at a time', () => {
    render(<FloatingActions />);
    const themeBtn = screen.getByRole('button', { name: 'Theme' });
    const musicBtn = screen.getByRole('button', { name: 'Music' });

    fireEvent.click(themeBtn);
    expect(themeBtn).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(musicBtn);
    expect(themeBtn).toHaveAttribute('aria-expanded', 'false');
    expect(musicBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
