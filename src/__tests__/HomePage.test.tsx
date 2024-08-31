import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/[locale]/page';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

jest.mock('react-firebase-hooks/auth');
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn()
}));

jest.mock('@/components/mainPage/welcomeContent/WelcomeContent', () => ({
  WelcomeContent: () => (
    <div data-testid="mock-welcome-content">Welcome Content</div>
  )
}));

jest.mock('@/components/mainPage/blockBtnApps/BlockBtnApps', () => ({
  BlockBtnApps: () => (
    <div data-testid="mock-block-btn-apps">Block Btn Apps</div>
  )
}));

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render WelcomeContent and not render BlockBtnApps when user is not logged in', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);

    render(<Home />);

    expect(screen.getByTestId('children-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-welcome-content')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-block-btn-apps')).not.toBeInTheDocument();
  });

  it('should render BlockBtnApps when user is logged in', () => {
    const mockUser = { uid: '12345', email: 'test@example.com' };
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false, null]);

    render(<Home />);

    expect(screen.getByTestId('children-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-welcome-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-block-btn-apps')).toBeInTheDocument();
  });

  it('should render loading text when loading is true', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, true, null]);

    render(<Home />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error toast when there is an error', () => {
    const errorMessage = 'Test error';
    (useAuthState as jest.Mock).mockReturnValue([
      null,
      false,
      new Error(errorMessage)
    ]);

    render(<Home />);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
