import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '@/app/not-found';

describe('NotFound Component', () => {
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
    expect(messageElement).toHaveTextContent('Could not find requested resource');
  });
});