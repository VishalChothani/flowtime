import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

vi.mock('react-i18next', async () => (await import('../../test/i18nMock')).mockI18n);

describe('Header', () => {
  it('renders the logo link', () => {
    render(<Header />);
    const link = screen.getByLabelText(/flowtime/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders a motivational quote', () => {
    render(<Header />);
    const quote = screen.getByLabelText('Motivational quote');
    expect(quote).toBeInTheDocument();
  });

  it('renders the language selector', () => {
    render(<Header />);
    expect(screen.getByLabelText('Switch language')).toBeInTheDocument();
  });

  it('has banner role', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('applies custom theme classes for quote', () => {
    render(
      <Header
        themeClasses={{
          bg: 'bg-gray-950',
          heading: 'text-white',
          subtitle: 'text-gray-300',
          quote: 'text-red-500',
        }}
      />,
    );
    const quote = screen.getByLabelText('Motivational quote');
    expect(quote.className).toContain('text-red-500');
  });
});
