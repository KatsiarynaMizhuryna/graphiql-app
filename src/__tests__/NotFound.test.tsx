import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '@/app/not-found';

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

describe('NotFound Component', () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  test('renders NotFound title', () => {
    render(<NotFound />);
    const titleElement = screen.getByTestId('not-found-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Not Found');
  });

  test('renders the NotFound message', () => {
    render(<NotFound />);

    const messageElement = screen.getByTestId('not-found-message');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent(
      'Could not find requested resource'
    );
  });
});
