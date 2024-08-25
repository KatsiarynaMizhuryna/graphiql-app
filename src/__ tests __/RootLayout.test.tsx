import { render, screen, within } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/components/header/Header', () => ({
  Header: () => <div>Mocked Header</div>
}));

jest.mock('@/components/footer/Footer', () => ({
  Footer: () => <div>Mocked Footer</div>
}));

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

describe('RootLayout', () => {
  it('renders Header, children, and Footer correctly', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = within(document.body);

    expect(body.getByText('Mocked Header')).toBeInTheDocument();

    expect(body.getByText('Test Content')).toBeInTheDocument();

    expect(body.getByText('Mocked Footer')).toBeInTheDocument();
  });

  it('applies the correct class and data-testid to the body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(container.querySelector('body')).toHaveClass(
      'flex',
      'flex-col',
      'min-h-screen'
    );

    expect(screen.getByTestId('children-content')).toBeInTheDocument();
  });
});
