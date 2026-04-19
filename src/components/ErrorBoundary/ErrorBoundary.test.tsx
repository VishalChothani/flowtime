import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Suppress console.error from ErrorBoundary during tests
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error message');
  return <div>Child content</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders default fallback on error', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
    expect(screen.getByText('Reload page')).toBeInTheDocument();
  });

  it('shows error details', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Error details')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('calls handleReset on Try again click', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Clicking "Try again" triggers handleReset which clears error state
    // But since ThrowingComponent still throws, it will re-enter error state
    fireEvent.click(screen.getByText('Try again'));
    // The component re-throws, so we're back to the error fallback
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
