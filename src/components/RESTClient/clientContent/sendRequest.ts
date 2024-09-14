import { Variable } from '@/types/client';

export const sendRequest = async (
  method: string,
  url: string,
  header: Variable[],
  body: string,
  setResponseStatus: (status: number | null) => void,
  setResponseData: (data: {}) => void
) => {
  try {
    const headersObject = header.reduce(
      (acc, { checked, key, value }) => {
        if (checked && key) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const methodsWithBody = ['POST', 'PUT', 'PATCH'];
    const shouldIncludeBody = methodsWithBody.includes(method.toUpperCase());

    if (shouldIncludeBody) {
      headersObject['Content-Type'] = 'application/json';
    }

    const requestUrl = url.trim();

    const response = await fetch(requestUrl, {
      method: method.toUpperCase(),
      headers: headersObject,
      body: shouldIncludeBody ? JSON.stringify(JSON.parse(body)) : undefined
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    console.log('Response:', responseData);

    setResponseStatus(response.status);
    setResponseData(responseData);
  } catch (e) {
    const error = e as Error;
    console.error('Error:', error.message);

    setResponseStatus(null);
    setResponseData(error.toString());
  }
};
