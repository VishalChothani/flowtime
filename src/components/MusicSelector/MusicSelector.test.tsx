import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MusicSelector } from './MusicSelector';
import { useMusicStore } from '../../store/useMusicStore';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

beforeEach(() => {
  useMusicStore.setState({
    activeSound: null,
    isPlaying: false,
    audio: null,
  });
});

describe('MusicSelector', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MusicSelector isOpen={false} onClose={() => {}} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders sound options when open', () => {
    render(<MusicSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Ocean Waves')).toBeInTheDocument();
    expect(screen.getByText('Rain')).toBeInTheDocument();
    expect(screen.getByText('White Noise')).toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(<MusicSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows title', () => {
    render(<MusicSelector isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Ambient Sounds/)).toBeInTheDocument();
  });
});
