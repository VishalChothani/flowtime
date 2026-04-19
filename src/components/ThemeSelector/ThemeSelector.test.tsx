import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSelector } from './ThemeSelector';
import { useThemeStore } from '../../store/useThemeStore';
import { ThemeMode } from '../../constants';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

beforeEach(() => {
  useThemeStore.setState({ mode: ThemeMode.Light });
});

describe('ThemeSelector', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <ThemeSelector isOpen={false} onClose={() => {}} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders theme options when open', () => {
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Gradient')).toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has a listbox with options', () => {
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('marks current theme as selected', () => {
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    const lightOption = screen.getByText('Light').closest('[role="option"]');
    expect(lightOption).toHaveAttribute('aria-selected', 'true');
  });

  it('changes theme on click', () => {
    const onClose = vi.fn();
    render(<ThemeSelector isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Dark'));
    expect(useThemeStore.getState().mode).toBe(ThemeMode.Dark);
    expect(onClose).toHaveBeenCalled();
  });

  it('shows shuffle button when gradient is selected', () => {
    useThemeStore.setState({ mode: ThemeMode.Gradient });
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Shuffle gradient/)).toBeInTheDocument();
  });

  it('does not show shuffle button for non-gradient modes', () => {
    render(<ThemeSelector isOpen={true} onClose={() => {}} />);
    expect(screen.queryByText(/Shuffle gradient/)).not.toBeInTheDocument();
  });
});
