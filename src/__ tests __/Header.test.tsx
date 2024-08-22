import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/header/Header';
import { fireEvent } from '@testing-library/dom';

jest.mock('@/components/header/logo/Logo', () => ({
  Logo: () => <div data-testid="logo" />
}));

jest.mock('@/components/header/switcher/Switcher', () => ({
  Switcher: () => <div data-testid="switcher" />
}));

jest.mock('@/components/header/signUp/SignUp', () => ({
  SignUp: () => <div data-testid="signUp" />
}));

describe('Header Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Logo, Switcher, and SignUp components', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('switcher')).toBeInTheDocument();
    expect(screen.getByTestId('signUp')).toBeInTheDocument();
  });

  it('applies sticky class when scrolled past 150px', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('fixed');

    fireEvent.scroll(window, { target: { scrollY: 200 } });

    expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');
  });

  it('removes sticky class when scrolled back to top', () => {
    render(<Header />);

    const header = screen.getByRole('banner');

    fireEvent.scroll(window, { target: { scrollY: 200 } });
    expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

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
