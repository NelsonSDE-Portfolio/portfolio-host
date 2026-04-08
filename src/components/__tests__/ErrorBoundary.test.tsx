import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });
});
