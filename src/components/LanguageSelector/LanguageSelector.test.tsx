import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from './LanguageSelector';

const changeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'language.switchLanguage': 'Switch language',
        'language.en': 'English',
        'language.es': 'Español',
        'language.it': 'Italiano',
      };
      return map[key] ?? key;
    },
    i18n: {
      language: 'en',
      changeLanguage,
    },
  }),
}));

describe('LanguageSelector', () => {
  it('renders the trigger button with current language', () => {
    render(<LanguageSelector />);
    const button = screen.getByLabelText('Switch language');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('EN');
  });

  it('opens dropdown on click', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByLabelText('Switch language'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Italiano')).toBeInTheDocument();
  });

  it('calls changeLanguage when selecting a language', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByLabelText('Switch language'));
    fireEvent.click(screen.getByText('Español'));
    expect(changeLanguage).toHaveBeenCalledWith('es');
  });

  it('has aria-expanded attribute', () => {
    render(<LanguageSelector />);
    const button = screen.getByLabelText('Switch language');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks current language as selected', () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByLabelText('Switch language'));
    const enOption = screen.getByText('English').closest('[role="option"]');
    expect(enOption).toHaveAttribute('aria-selected', 'true');
  });
});
