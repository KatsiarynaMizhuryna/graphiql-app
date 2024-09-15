import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/footer/Footer';

describe('Footer component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo, year, rs-logo components', () => {
    render(<Footer />);

    expect(screen.getByTestId('github-logo')).toBeInTheDocument();
    expect(screen.getByTestId('year-text')).toBeInTheDocument();
    expect(screen.getByTestId('rs-logo')).toBeInTheDocument();
  });
});
