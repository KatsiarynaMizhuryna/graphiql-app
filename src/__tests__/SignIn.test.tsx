import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '@/components/forms/signInForm';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

jest.mock('firebase/auth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
  useLocale: jest.fn()
}));
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));
jest.mock('@/store/localStorage', () => ({
  checkedLocalStorage: jest.fn()
}));

describe('SignIn Component', () => {
  const mockPush = jest.fn();
  const t = jest.fn((key) => key);
  const mockLocale = 'en';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTranslations as jest.Mock).mockReturnValue(t);
    (useLocale as jest.Mock).mockReturnValue(mockLocale);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with title and submit label', () => {
    render(<SignIn />);
    expect(screen.getByText('signIn.title')).toBeInTheDocument();
    expect(screen.getByText('signIn.label')).toBeInTheDocument();
  });

  it('handles the translation keys correctly', () => {
    render(<SignIn />);
    expect(t).toHaveBeenCalledWith('signIn.title');
    expect(t).toHaveBeenCalledWith('signIn.label');
  });
});
