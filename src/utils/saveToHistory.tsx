const saveToHistory = (
  encodedUrl: string,
  encodedQuery: string,
  encodedVariables: string,
  method: string,
  localStorageKey: string
) => {
  const newUrl = `${method}/${encodedUrl}?query=${encodedQuery}&variables=${encodedVariables}`;

  const requestData = {
    method: method,
    requestGraphQL: newUrl,
    time: new Date().toISOString()
  };

  const savedRequests = JSON.parse(
    localStorage.getItem(localStorageKey) || '[]'
  );

  savedRequests.push(requestData);
  localStorage.setItem(localStorageKey, JSON.stringify(savedRequests));
};

export default saveToHistory;
