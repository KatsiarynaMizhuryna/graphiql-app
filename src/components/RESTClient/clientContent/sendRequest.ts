import { Variable } from '@/interfaces/client';
import { saveRequestToUserHistory } from '@/store/localStorage';
import toast from 'react-hot-toast';

export const sendRequest = async (
  method: string,
  url: string,
  header: Variable[],
  body: string,
  setResponseStatus: (status: number | null) => void,
  setResponseData: (data: {}) => void,
  uid: string,
  variables: Variable[]
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

    const requestUrl = url.trim() || '';

    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers: headersObject
    };

    if (shouldIncludeBody && body.trim()) {
      requestOptions.body = JSON.stringify(JSON.parse(body));
    }

    const response = await fetch(requestUrl, requestOptions);

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    setResponseStatus(response.status);
    setResponseData(responseData);

    const newRequest = {
      client: 'restClient',
      request: {
        date: new Date().toISOString(),
        method: method,
        url: url,
        header: header,
        body: body,
        response: responseData,
        variables: variables,
        status: response.status.toString()
      }
    };

    saveRequestToUserHistory(uid, newRequest);
  } catch (e) {
    const error = e as Error;
    toast.error(`Error: ${error.message}`);

    setResponseStatus(null);
    setResponseData(error.toString());
  }
};
