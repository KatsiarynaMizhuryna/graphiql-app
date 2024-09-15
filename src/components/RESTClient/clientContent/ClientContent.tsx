'use client';

import MethodRequest from '../methodRequest/MethodRequest';
import Headers from '../headers/Headers';
import BodyRequest from '../BodyRequest/BodyRequest';
import { useEffect, useState } from 'react';
import StatusRequest from '../statusRequest/statusRequest';
import Variables from '../variables/Variables';
import { Variable } from '@/interfaces/client';
import { Button } from '@/ui/button';
import { sendRequest } from './sendRequest';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import encodeBase64 from '@/utils/encodeBase64';
import { useLocale, useTranslations } from 'next-intl';

const ClientContent = () => {
  const t = useTranslations('RestClientPage');
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  // url panel
  const [urlPanel, setUrlPanel] = useState('');

  const locale = useLocale();

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [header, setHeaders] = useState<Variable[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [body, setBody] = useState('');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<object | string>('');
  const path = `/${locale}/restClient/${method}`;

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

  useEffect(() => {
    const isHeaderEmpty = header.every(
      (item) => !item.key && !item.value && !item.description
    );
    const isVariablesEmpty = variables.every(
      (item) => !item.key && !item.value && !item.description
    );
    let urlPanelHeader = '';
    let urlPanelVariables = '';
    if (!isHeaderEmpty) {
      urlPanelHeader = encodeBase64(JSON.stringify(header));
    }
    if (!isVariablesEmpty) {
      urlPanelVariables = encodeBase64(JSON.stringify(variables));
    }

    const urlPanelUrl = encodeBase64(url.replace(method, ''));
    const urlPanelBody = encodeBase64(body);

    const encodedUrl = `${path}/${urlPanelUrl}.${urlPanelBody}.${urlPanelHeader}.${urlPanelVariables}`;
    setUrlPanel(encodedUrl);
    window.history.replaceState(null, '', encodedUrl);
  }, [locale, method, url, setUrl, setMethod, body, header, path, variables]);

  const handleSendRequest = () => {
    if (uid) {
      sendRequest(
        method,
        url,
        urlPanel,
        header,
        body,
        setResponseStatus,
        setResponseData,
        uid,
        variables
      );
    }
  };

  return (
    <div className="w-full flex justify-evenly gap-[30px] flex-wrap md:flex-nowrap">
      <div className="flex flex-col w-full md:w-[50%] md:min-w-[360px]">
        <div className="flex">
          <MethodRequest
            url={url}
            setUrl={setUrl}
            method={method}
            setMethod={setMethod}
          />
          <div className="w-[65px] pt-[30px] pl-[10px]">
            <Button onClick={handleSendRequest}>{t('Send')}</Button>
          </div>
        </div>
        <div>
          <Headers variables={header} setVariables={setHeaders} />
        </div>
        <div>
          <Variables variables={variables} setVariables={setVariables} />
        </div>
        <div>
          <BodyRequest body={body} setBody={setBody} method={method} />
        </div>
      </div>
      <div className="w-full md:w-[40%] md:min-w-[330px]">
        <StatusRequest status={responseStatus} data={responseData} />
      </div>
    </div>
  );
};

export default ClientContent;
