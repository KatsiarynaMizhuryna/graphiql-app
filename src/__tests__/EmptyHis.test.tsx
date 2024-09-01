import { render, screen } from '@testing-library/react';
import HistoryLogic from '@/components/history/emptyHis/EmptyHis';
import { useTranslations, useLocale } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
  useLocale: jest.fn()
}));

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();

beforeEach(() => {
  global.localStorage = {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    length: 0,
    key: jest.fn()
  } as Storage;

  (useTranslations as jest.Mock).mockImplementation(() => (key: string) => {
    const translations: Record<string, string> = {
      'HistoryPage.subTitle': 'You have not executed any requests yet',
      'buttons.redirect.restClient': 'REST Client',
      'buttons.redirect.graphQlClient': 'Graph-QL Client'
    };
    return translations[key];
  });
  (useLocale as jest.Mock).mockReturnValue('en');
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders message and buttons when no requests exist', () => {
  mockGetItem.mockReturnValue(null);

  render(<HistoryLogic />);

  const messageElement = screen.getByTestId('history-subtitle');
  expect(messageElement).not.toBeNull();
});
