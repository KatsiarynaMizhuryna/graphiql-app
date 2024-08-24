import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainContent } from '@/components/welcomePage/mainContent/MainContent';
import Link from 'next/link';


interface LinkButtonProps {
  children: ReactNode;
  href: string;
}

jest.mock('@/ui/LinkButton', () => ({
  LinkButton: ({ children, href }: LinkButtonProps) => (
    <Link href={href}>{children}</Link>
  )
}));

jest.mock('@/ui/fonts', () => ({
  Nunito: () => ({
    className: 'nunito',
  }),
}));

jest.mock('@/ui/fonts', () => ({
  oswald: { className: 'oswald-font' },
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
    expect(screen.getByText('Main page').closest('a')).toHaveAttribute('href', '/');
  });

  it('renders REST Client, GraphiQL Client, and History links', () => {
    render(<MainContent userName="John Doe" />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('REST Client').closest('a')).toHaveAttribute('href', '/#');

    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('GraphiQL Client').closest('a')).toHaveAttribute('href', '/#');

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('History').closest('a')).toHaveAttribute('href', '/#');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<MainContent userName="John Doe" />);
    expect(asFragment()).toMatchSnapshot();
  });
});