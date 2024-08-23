import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '@/app/page';

interface LinkButtonProps {
  children: ReactNode;
  href: string;
}

jest.mock('@/components/welcomePage/mainContent/MainContent', () => ({
  MainContent: () => <div>MainContent</div>
}));
jest.mock('@/components/welcomePage/welcomeContent/WelcomeContent', () => ({
  WelcomeContent: () => <div>WelcomeContent</div>
}));

describe('Home component', () => {
  it('renders WelcomeContent when user is not logged in', () => {
    render(<Home />);
    expect(screen.getByText('WelcomeContent')).toBeInTheDocument();
  });

  it('renders MainContent when user is logged in', () => {
    jest.spyOn(React, 'useState').mockReturnValue([true, jest.fn()]);

    render(<Home />);
    expect(screen.getByText('MainContent')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});

jest.mock('@/components/common/LinkButton', () => ({
  LinkButton: ({ children, href }: LinkButtonProps) => (
    <a href={href}>{children}</a>
  )
}));
