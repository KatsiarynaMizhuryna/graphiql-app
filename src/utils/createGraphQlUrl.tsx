import { Buffer } from 'buffer';

const createGraphQLUrl = (
  endpointUrl: string,
  body: string,
  headers: { [key: string]: string } | undefined
) => {
  const encodedEndpoint = Buffer.from(endpointUrl, 'utf8').toString('base64');
  const encodedBody = Buffer.from(body, 'utf8').toString('base64');
  const headerParams = new URLSearchParams(
    Object.entries(headers || {}).map(([key, value]) => [
      key,
      encodeURIComponent(value)
    ])
  ).toString();

  return `http://localhost:3000/GRAPHQL/${encodedEndpoint}/${encodedBody}?${headerParams}`;
};

export default createGraphQLUrl;
