import saveToHistory from '@/utils/saveToHistory';

describe('saveToHistory', () => {
  const localStorageKey = 'testHistoryKey';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should save a new request to history correctly', () => {
    const encodedUrl = 'example.com/graphql';
    const encodedQuery = 'query%20{test}';
    const encodedVariables = '{}';
    const encodedHeaders = '{}';
    const method = 'POST';

    saveToHistory({
      encodedUrl,
      encodedQuery,
      encodedVariables,
      encodedHeaders,
      method,
      localStorageKey
    });

    const savedRequests = JSON.parse(
      localStorage.getItem(localStorageKey) || '[]'
    );

    expect(savedRequests).toHaveLength(1);
    expect(savedRequests[0]).toMatchObject({
      method,
      requestGraphQL: `${method}/${encodedUrl}?query=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`,
      time: expect.any(String)
    });
  });

  it('should initialize localStorage if empty', () => {
    const encodedUrl = 'example.com/graphql';
    const encodedQuery = 'query%20{test}';
    const encodedVariables = '{}';
    const encodedHeaders = '{}';
    const method = 'POST';

    saveToHistory({
      encodedUrl,
      encodedQuery,
      encodedVariables,
      encodedHeaders,
      method,
      localStorageKey
    });

    const savedRequests = JSON.parse(
      localStorage.getItem(localStorageKey) || '[]'
    );

    expect(savedRequests).toHaveLength(1);
  });
});
