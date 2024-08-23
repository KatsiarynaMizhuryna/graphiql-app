import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MainContent } from '@/components/welcomePage/mainContent/MainContent';

interface LinkButtonProps {
  children: ReactNode;
  href: string;
}

jest.mock('@/components/common/LinkButton', () => ({
  LinkButton: ({ children, href }: LinkButtonProps) => (
    <a href={href}>{children}</a>
  )
}));

describe('MainContent component', () => {
  it('renders the welcome message with username', () => {
    const userName = 'John Doe';

    render(<MainContent userName={userName} />);

    expect(screen.getByText(`Welcome Back, ${userName}!`)).toBeInTheDocument();
  });

  it('renders main page link', () => {
    render(<MainContent userName="John Doe" />);

    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.getByText('Main page').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders REST Client, GraphiQL Client, and History links', () => {
    render(<MainContent userName="John Doe" />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('REST Client').closest('a')).toHaveAttribute(
      'href',
      '/#'
    );

    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client').closest('a')).toHaveAttribute(
      'href',
      '/#'
    );

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('History').closest('a')).toHaveAttribute(
      'href',
      '/#'
    );
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<MainContent userName="John Doe" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
