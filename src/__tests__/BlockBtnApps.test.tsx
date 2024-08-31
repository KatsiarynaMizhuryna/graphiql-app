import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';
import { NextIntlClientProvider } from 'next-intl';
import { ReactElement } from 'react';

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en'
  })
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

describe('BlockBtnApps', () => {
  const messages = {
    buttons: {
      redirect: {
        restClient: 'REST Client',
        graphQlClient: 'GraphiQL Client',
        history: 'History'
      }
    }
  };

  const renderWithIntl = (component: ReactElement) => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {component}
      </NextIntlClientProvider>
    );
  };

  it('renders the REST Client button', () => {
    renderWithIntl(<BlockBtnApps />);
    const restClientButton = screen.getByText(/REST Client/i);
    expect(restClientButton).toBeInTheDocument();
    expect(restClientButton).toHaveAttribute('href', '/en/restClient');
  });

  it('renders the GraphiQL Client button', () => {
    renderWithIntl(<BlockBtnApps />);
    const graphQLClientButton = screen.getByText(/GraphiQL Client/i);
    expect(graphQLClientButton).toBeInTheDocument();
    expect(graphQLClientButton).toHaveAttribute('href', '/en/graphQlClient');
  });

  it('renders the History button', () => {
    renderWithIntl(<BlockBtnApps />);
    const historyButton = screen.getByText(/History/i);
    expect(historyButton).toBeInTheDocument();
    expect(historyButton).toHaveAttribute('href', '/en/history');
  });
});
