import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useTranslations, useLocale } from 'next-intl';
import HistoryLogic from '@/components/history/History';
import { checkedLocalStorage } from '@/store/localStorage';

jest.mock('firebase/auth');
jest.mock('react-firebase-hooks/auth');
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
  useLocale: jest.fn()
}));
jest.mock('@/store/localStorage', () => ({
  checkedLocalStorage: jest.fn()
}));

describe('HistoryLogic Component', () => {
  const mockUid = 'mock-uid';
  const mockEmail = 'mock@example.com';
  const t = jest.fn((key) => key);
  const tBtn = jest.fn((key) => key);
  const locale = 'en';

  beforeEach(() => {
    (getAuth as jest.Mock).mockReturnValue({});
    (useAuthState as jest.Mock).mockReturnValue([
      { uid: mockUid, email: mockEmail },
      false
    ]);
    (useTranslations as jest.Mock).mockImplementation((namespace) => {
      return namespace === 'HistoryPage' ? t : tBtn;
    });
    (useLocale as jest.Mock).mockReturnValue(locale);
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'users') {
            return JSON.stringify({
              'mock-uid': {
                uid: mockUid,
                isLogged: true,
                email: mockEmail,
                history: [
                  {
                    request: {
                      date: new Date().toISOString(),
                      method: 'GET',
                      url: 'mockurl.com',
                      body: 'mockBody',
                      variable: 'mockVariable',
                      headers: 'mockHeaders'
                    }
                  }
                ]
              }
            });
          }
          return null;
        }),
        setItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('checks local storage on component mount', async () => {
    render(<HistoryLogic />);

    await waitFor(() => {
      expect(checkedLocalStorage).toHaveBeenCalledWith(mockUid, mockEmail);
    });
  });

  it('renders the history request list when there are requests', async () => {
    render(<HistoryLogic />);

    await waitFor(() => {
      expect(screen.getByTestId('history-container')).toBeInTheDocument();
      expect(
        screen.getByText(
          'GET/mockurl.com?query=mockBody&variables=mockVariable&headers=mockHeaders'
        )
      ).toBeInTheDocument();
    });
  });

  it('sorts the requests by date in descending order', async () => {
    window.localStorage.getItem = jest.fn().mockReturnValue(
      JSON.stringify({
        'mock-uid': {
          uid: mockUid,
          isLogged: true,
          email: mockEmail,
          history: [
            {
              request: {
                date: new Date('2023-09-12T12:34:56Z').toISOString(),
                method: 'GET',
                url: 'firsturl.com',
                body: 'firstBody',
                variable: 'firstVariable',
                headers: 'firstHeaders'
              }
            },
            {
              request: {
                date: new Date('2023-09-13T12:34:56Z').toISOString(),
                method: 'POST',
                url: 'secondurl.com',
                body: 'secondBody',
                variable: 'secondVariable',
                headers: 'secondHeaders'
              }
            }
          ]
        }
      })
    );

    render(<HistoryLogic />);

    await waitFor(() => {
      const requestLinks = screen.getAllByTestId('request-button');
      expect(requestLinks[0]).toHaveTextContent('POST/secondurl.com');
      expect(requestLinks[1]).toHaveTextContent('GET/firsturl.com');
    });
  });

  it('handles parsing errors in stored requests gracefully', async () => {
    window.localStorage.getItem = jest.fn().mockReturnValue('invalid-json');

    render(<HistoryLogic />);

    await waitFor(() => {
      expect(screen.getByTestId('history-container')).toBeInTheDocument();
      expect(screen.queryByTestId('request-button')).toBeNull();
    });
  });
});
