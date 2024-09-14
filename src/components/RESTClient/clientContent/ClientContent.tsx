'use client';

import MethodRequest from '../methodRequest/MethodRequest';
import Headers from '../headers/Headers';
import BodyRequest from '../BodyRequest/BodyRequest';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StatusRequest from '../statusRequest/statusRequest';
import Variables from '../variables/Variables';
import { Variable } from '@/types/client';
import { Button } from '@/ui/button';
import { sendRequest } from './sendRequest';

const ClientContent = () => {
  const locale = useLocale();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [header, setHeaders] = useState<Variable[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [body, setBody] = useState('');
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.replace(`/${locale}/restClient/${method}`);
  }, [locale, method, router]);

  useEffect(() => {
    const checkedVariables = variables.filter(
      (variable) => variable.checked && variable.key
    );
    if (checkedVariables.length > 0) {
      const queryString = checkedVariables
        .map(
          ({ key, value }) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
      const baseUrl = url.split('?')[0];
      const newUrl = `${baseUrl}?${queryString}`;
      setUrl(newUrl);
    } else {
      setUrl(url.split('?')[0]);
    }
  }, [variables, url]);

  const handleSendRequest = () => {
    sendRequest(method, url, header, body, setResponseStatus, setResponseData);
  };

  return (
    <div className="w-full flex justify-evenly gap-[30px] flex-wrap md:flex-nowrap">
      <div className="flex flex-col w-full md:w-[50%] md:min-w-[360px]">
        <div className="">
          <MethodRequest
            url={url}
            setUrl={setUrl}
            method={method}
            setMethod={setMethod}
          />
          <Button onClick={handleSendRequest}>Send</Button>
        </div>
        <div className="">
          <Headers variables={header} setVariables={setHeaders} />
        </div>
        <div className="">
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        <div className="">
          <BodyRequest body={body} setBody={setBody} />
        </div>
      </div>
      <div className="w-full md:w-[40%] md:min-w-[330px]">
        <StatusRequest status={responseStatus} data={responseData} />
      </div>
    </div>
  );
};

export default ClientContent;
