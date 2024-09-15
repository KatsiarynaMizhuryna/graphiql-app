'use client';

import { useLocale } from 'next-intl';
import { MethodRequestProps } from '@/interfaces/client';
import { useEffect } from 'react';

const InputRequest: React.FC<MethodRequestProps> = ({
  url,
  setUrl,
  method,
  setMethod
}) => {
  const locale = useLocale();

  useEffect(() => {
    if (!url) {
      const urlWithMethod = `/${locale}/restClient/${method}`;
      setUrl(urlWithMethod);
      window.history.replaceState(null, '', urlWithMethod);
    }
  }, [locale, method, url, setUrl, setMethod]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMethod = e.target.value;
    setMethod(selectedMethod);
    const urlWithMethod = `/${locale}/restClient/${selectedMethod}`;
    window.history.replaceState(null, '', urlWithMethod);
  };

  return (
    <div className="w-[calc(100%-75px)]">
      <label
        htmlFor="url"
        className="inline-flex items-center text-sm font-medium leading-6 text-gray-900"
      >
        <div className="text-">URL: </div>
        {url ? url : 'Untitled Request'}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="method" className="sr-only">
            HTTP Method
          </label>
          <select
            id="method"
            name="method"
            value={method}
            onChange={handleMethodChange}
            className="h-full rounded-md border-0 bg-transparent py-1 pl-2 pr-1 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-black-500 sm:text-sm"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
            <option>HEAD</option>
            <option>OPTIONS</option>
          </select>
        </div>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={handleUrlChange}
          className="block w-full rounded-md border-0 py-1.5 pl-32 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-black-500 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};

export default InputRequest;
