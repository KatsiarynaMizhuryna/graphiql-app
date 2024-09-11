import { render, screen } from '@testing-library/react';
import HistoryLogic from '@/components/history/History';
import '@testing-library/jest-dom';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
  useLocale: jest.fn(() => 'en')
}));

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('HistoryLogic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders requests in sorted order', () => {
    const mockRequests = [
      {
        method: 'POST',
        url: 'https://api.example.com/resource',
        time: new Date(Date.now() - 1000).toISOString()
      },
      {
        method: 'GET',
        url: 'https://api.example.com/resource/1',
        time: new Date(Date.now() - 2000).toISOString()
      },
      {
        method: 'GRAPHQL',
        url: 'https://graphql.example.com/query',
        time: new Date(Date.now() - 3000).toISOString()
      }
    ];

    localStorage.setItem('requestsHistory', JSON.stringify(mockRequests));

    render(<HistoryLogic />);
    const requestElements = screen.getAllByRole('link');
    expect(requestElements[0]).toHaveTextContent(
      'POST https://api.example.com/resource'
    );
    expect(requestElements[1]).toHaveTextContent(
      'GET https://api.example.com/resource/1'
    );
    expect(requestElements[2]).toHaveTextContent(
      'GRAPHQL https://graphql.example.com/query'
    );
  });
});
