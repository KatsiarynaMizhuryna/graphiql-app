import prettifyQuery from '@/utils/prettifyQuery';
import gqlPrettier from 'graphql-prettier';
import { toast } from 'react-hot-toast';

jest.mock('graphql-prettier', () => jest.fn());
jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('prettifyQuery', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly format a query and call setQuery', () => {
    const query = 'query { test }';
    const formattedQuery = 'query {\n  test\n}';
    const setQuery = jest.fn();
    (gqlPrettier as jest.Mock).mockReturnValue(formattedQuery);

    const result = prettifyQuery({ query, setQuery });

    expect(result).toBe(formattedQuery);
    expect(setQuery).toHaveBeenCalledWith(formattedQuery);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should return the original query and show an error toast if formatting fails', () => {
    const query = 'query { test }';
    const errorMessage = 'Mocked formatting error';
    const setQuery = jest.fn();
    (gqlPrettier as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const toastErrorSpy = jest.spyOn(toast, 'error').mockImplementation();
    const result = prettifyQuery({ query, setQuery });
    expect(result).toBe(query);
    expect(setQuery).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(
      `Check your query, please: ${errorMessage}`
    );
    toastErrorSpy.mockRestore();
  });
});
