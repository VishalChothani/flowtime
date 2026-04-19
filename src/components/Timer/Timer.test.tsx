import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Timer } from './Timer';
import { useTimerStore } from '../../store/useTimerStore';
import { useThemeStore } from '../../store/useThemeStore';
import { TimerStatus, ThemeMode } from '../../constants';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

beforeEach(() => {
  useTimerStore.setState({
    initialSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    status: TimerStatus.Idle,
    intervalId: null,
  });
  useThemeStore.setState({ mode: ThemeMode.Dark });
});

describe('Timer', () => {
  it('renders the timer display with 25:00', () => {
    render(<Timer />);
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('has countdown timer section', () => {
    render(<Timer />);
    expect(screen.getByLabelText('Countdown timer')).toBeInTheDocument();
  });

  it('shows Start button when idle', () => {
    render(<Timer />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('shows Pause button when running', () => {
    useTimerStore.setState({ status: TimerStatus.Running });
    render(<Timer />);
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('shows Resume button when paused', () => {
    useTimerStore.setState({ status: TimerStatus.Paused });
    render(<Timer />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('shows edit and reset buttons when idle', () => {
    render(<Timer />);
    expect(screen.getByLabelText('Set countdown duration')).toBeInTheDocument();
    expect(screen.getByLabelText('Reset countdown')).toBeInTheDocument();
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<Timer />);
    fireEvent.click(screen.getByLabelText('Set countdown duration'));
    expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
  });

  it('shows min/max hint in edit mode', () => {
    render(<Timer />);
    fireEvent.click(screen.getByLabelText('Set countdown duration'));
    expect(screen.getByText('Min 00:10 · Max 59:59')).toBeInTheDocument();
  });

  it('shows status text when running', () => {
    useTimerStore.setState({ status: TimerStatus.Running });
    render(<Timer />);
    expect(screen.getByText('Focus time...')).toBeInTheDocument();
  });

  it('shows paused text when paused', () => {
    useTimerStore.setState({ status: TimerStatus.Paused });
    render(<Timer />);
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('shows times up when finished', () => {
    useTimerStore.setState({ remainingSeconds: 0, status: TimerStatus.Idle });
    render(<Timer />);
    expect(screen.getByText("Time's up! 🎉")).toBeInTheDocument();
  });

  it('uses white text on dark theme', () => {
    render(<Timer />);
    const output = screen.getByRole('status');
    expect(output.className).toContain('text-white');
  });

  it('uses dark text on light theme', () => {
    useThemeStore.setState({ mode: ThemeMode.Light });
    render(<Timer />);
    const output = screen.getByRole('status');
    expect(output.className).toContain('text-gray-900');
  });
});
