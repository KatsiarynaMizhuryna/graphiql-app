import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import React from 'react';

jest.mock('next/font/google', () => ({
  Nunito: jest.fn(() => ({
    className: 'mocked-nunito-font'
  })),
  Oswald: jest.fn(() => ({
    className: 'mocked-oswald-font'
  })),
  Ubuntu: jest.fn(() => ({
    className: 'mocked-ubuntu-font'
  }))
}));

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('display error boundary and error message ', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
