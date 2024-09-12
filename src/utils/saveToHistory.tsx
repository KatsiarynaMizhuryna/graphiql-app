import { SaveToHistoryProps } from '@/interfaces/saveToHistoryProps';

const saveToHistory = ({
  encodedUrl,
  encodedQuery,
  encodedVariables,
  method,
  localStorageKey
}: SaveToHistoryProps) => {
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
