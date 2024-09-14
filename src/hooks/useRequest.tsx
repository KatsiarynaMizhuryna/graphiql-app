import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useRequest = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({
    'Content-Type': 'application/json'
  });

  const router = useRouter();

  const encodeBase64 = (data: string) => Buffer.from(data).toString('base64');

  useEffect(() => {
    if (url) {
      const encodedUrl = encodeBase64(url);
      const encodedBody = body ? encodeBase64(body) : '';
      const headerQuery = Object.entries(headers)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');

      let finalUrl = `/restClient/${method}/${encodedUrl}`;
      if (encodedBody) {
        finalUrl += `/${encodedBody}`;
      }
      if (headerQuery) {
        finalUrl += `?${headerQuery}`;
      }
      router.replace(finalUrl);
    }
  }, [method, url, body, headers, router]);

  return { method, setMethod, url, setUrl, body, setBody, headers, setHeaders };
};
