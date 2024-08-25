import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';

describe('BlockBtnApps', () => {
  it('renders the REST Client button', () => {
    render(<BlockBtnApps />);
    const restClientButton = screen.getByText(/REST Client/i);
    expect(restClientButton).toBeInTheDocument();
    expect(restClientButton).toHaveAttribute('href', '/restClient');
  });

  it('renders the GraphiQL Client button', () => {
    render(<BlockBtnApps />);
    const graphQLClientButton = screen.getByText(/GraphiQL Client/i);
    expect(graphQLClientButton).toBeInTheDocument();
    expect(graphQLClientButton).toHaveAttribute('href', '/graphQLClient');
  });

  it('renders the History button', () => {
    render(<BlockBtnApps />);
    const historyButton = screen.getByText(/History/i);
    expect(historyButton).toBeInTheDocument();
    expect(historyButton).toHaveAttribute('href', '/history');
  });
});
