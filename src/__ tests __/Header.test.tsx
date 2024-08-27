import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { BlockBtnIsLogged } from '@/components/header/blockBtnIsLogged/BlockBtnIsLogged';

jest.mock('react-firebase-hooks/auth');
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
  }))
}));

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/'
  })
}));

describe('Header Component', () => {
  beforeEach(() => {
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
  });

  test('renders the Header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('header has sticky class when scrolled past 150px', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 200 } });
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toHaveClass(
      'fixed shadow-lg py-2 backdrop-blur-lg transform translate-y-0 animate-slideDown'
    );

    fireEvent.scroll(window, { target: { scrollY: 0 } });
    expect(headerElement).not.toHaveClass(
      'fixed shadow-lg py-2 backdrop-blur-lg transform translate-y-0 animate-slideDown'
    );
  });

  test('renders BlockBtnNotLogged when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);
    render(<Header />);

    expect(screen.getByText(/Sign IN/i)).toBeInTheDocument();
  });

  test('renders BlockBtnIsLogged when user is logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([
      { uid: '123', email: 'user@example.com' },
      false,
      null
    ]);
    render(<BlockBtnIsLogged />);
    expect(screen.getByText(/Sign OUT/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          content.startsWith('Welcome,') &&
          element?.querySelector('b')?.textContent === 'user@example.com' &&
          content.endsWith('!')
      )
    ).toBeInTheDocument();
  });

  test('adds and removes the scroll event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Header />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
