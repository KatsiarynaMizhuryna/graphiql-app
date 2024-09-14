'use client';

// import { useTranslations } from 'next-intl';
import MethodRequest from '../methodRequest/MethodRequest';
import Headers from '../headers/Headers';
import BodyRequest from '../BodyRequest/BodyRequest';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StatusRequest from '../statusRequest/statusRequest';
import Variables from '../variables/Variables';
import { Variable } from '@/types/client';

const ClientContent = () => {
  const locale = useLocale();
  // const t = useTranslations('RestClientPage');

  //const { method, setMethod, url, setUrl, body, setBody, headers, setHeaders } = useRequest();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [header, setHeaders] = useState<Variable[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  // const [body, setBody] = useState('');
  // const [request, setRequest] = useState('');

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
  console.log(variables);
  console.log(header);
  console.log('url', url);

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
        </div>
        <div className="">
          <Headers variables={header} setVariables={setHeaders} />
        </div>
        <div className="">
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        <div className="">
          <BodyRequest />
        </div>
      </div>
      <div className="w-full md:w-[40%] md:min-w-[330px]">
        <StatusRequest />
      </div>
    </div>
  );
};

export default ClientContent;
