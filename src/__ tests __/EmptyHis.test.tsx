import { render, screen } from '@testing-library/react';
import HistoryLogic from '@/components/history/emptyHis/EmptyHis';

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
    key: jest.fn(),
  } as Storage;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders message and buttons when no requests exist', () => {
  mockGetItem.mockReturnValue(null);

  render(<HistoryLogic />);
  const messageElement = screen.queryByText(/You have not executed any requests yet/i);
  const restClientButton = screen.queryByText(/REST Client/i);
  const graphQlClientButton = screen.queryByText(/Graph-QL Client/i);

  expect(messageElement).not.toBeNull();
  expect(restClientButton).not.toBeNull();
  expect(graphQlClientButton).not.toBeNull();
});
