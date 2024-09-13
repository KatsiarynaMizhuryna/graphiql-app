import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn()
}));

jest.mock('@/components/header/logo/Logo', () => ({
  Logo: () => <div data-testid="logo" />
}));

jest.mock('@/components/header/switcher/Switcher', () => ({
  Switcher: () => <div data-testid="switcher" />
}));

jest.mock('@/components/header/blockBtnIsLogged/BlockBtnIsLogged', () => ({
  BlockBtnIsLogged: () => <div data-testid="blockBtnIsLogged" />
}));

jest.mock('@/components/header/blockBtnNotLogged/BlockBtnNotLogged', () => ({
  BlockBtnNotLogged: () => <div data-testid="blockBtnNotLogged" />
}));

describe('Header Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Logo, Switcher, and BlockBtnNotLogged components when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null]);

    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('switcher')).toBeInTheDocument();
    expect(screen.getByTestId('blockBtnNotLogged')).toBeInTheDocument();
  });

  it('renders BlockBtnIsLogged when user is logged in', () => {
    const mockUser = { uid: '12345', email: 'test@example.com' };
    (useAuthState as jest.Mock).mockReturnValue([mockUser]);

    render(<Header />);

    expect(screen.getByTestId('blockBtnIsLogged')).toBeInTheDocument();
    expect(screen.queryByTestId('blockBtnNotLogged')).not.toBeInTheDocument();
  });

  it('applies sticky class when scrolled past 150px', () => {
    render(<Header />);

    const header = screen.getByTestId('header');
    expect(header).not.toHaveClass('fixed');

    fireEvent.scroll(window, { target: { scrollY: 71 } });

    expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');
  });

  it('removes sticky class when scrolled back to top', () => {
    render(<Header />);

    const header = screen.getByTestId('header');

    fireEvent.scroll(window, { target: { scrollY: 200 } });
    expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');

    fireEvent.scroll(window, { target: { scrollY: 69 } });

    expect(header).not.toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');
  });

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Header />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
