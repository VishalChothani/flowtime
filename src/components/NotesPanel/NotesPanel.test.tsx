import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotesPanel } from './NotesPanel';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

// Mock IndexedDB notesDb
vi.mock('../../lib/notesDb', () => ({
  getNote: vi.fn().mockResolvedValue(null),
  saveNote: vi.fn().mockResolvedValue(undefined),
}));

describe('NotesPanel', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <NotesPanel isOpen={false} onClose={() => {}} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders the panel when open', () => {
    render(<NotesPanel isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows title', () => {
    render(<NotesPanel isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Quick Notes/)).toBeInTheDocument();
  });

  it('has a textarea with placeholder', () => {
    render(<NotesPanel isOpen={true} onClose={() => {}} />);
    expect(screen.getByPlaceholderText('Write your notes here...')).toBeInTheDocument();
  });

  it('has a close button', () => {
    render(<NotesPanel isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText('Close notes')).toBeInTheDocument();
  });
});
