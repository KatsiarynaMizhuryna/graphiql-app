'use client';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import EndpointInput from '../endpointInut/EndpointInput';
import QueryEditor from '../queryEditor/QueryEditor';
import ResponseViewer from '../responseViewer/ResponseViewer';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import Image from 'next/image';
import HeaderEditor from '../headersEditor/HeadersEditor';
import DocumentationViewer from '../documentationViewer/DocumentationViewer';
import IconButton from '@/ui/iconButton';
import prettifyQuery from '@/utils/prettifyQuery';
import toggleDrawer from '@/utils/toggleDrawer';
import encodeBase64 from '@/utils/encodeBase64';
import saveToHistory from '@/utils/saveToHistory';
import { usePathname } from 'next/navigation';
import TextButton from '@/ui/textButton';
import handleToggleVisibility from '@/utils/handleToggleVisibility';
import { useTranslations } from 'next-intl';

const GraphiQL = ({
  initialEndpointUrl = '',
  initialQuery = '',
  initialVariables = '',
  initialHeaders = ''
}) => {
  const [endpointUrl, setEndpointUrl] = useState<string>(initialEndpointUrl);
  const [sdlUrl, setSdlUrl] = useState<string>(initialEndpointUrl);
  const [headers, setHeaders] = useState<string>(initialHeaders);
  const [query, setQuery] = useState<string>(initialQuery);
  const [variables, setVariables] = useState<string>(initialVariables);
  const [status, setStatus] = useState<string>('');
  const [response, setResponse] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const encodedUrl = encodeBase64(endpointUrl);
  const encodedQuery = encodeBase64(query);
  const encodedVariables = encodeBase64(variables);
  const encodedHeaders = encodeBase64(headers);
  const pathname = usePathname();
  const [selectedEditor, setSelectedEditor] = useState('variables editor');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const variablesEditor = 'variables editor';
  const headersEditor = 'headers editor';
  const t = useTranslations('GraphClientPage');
  const tt = useTranslations('Errors');

  const saveHeaders = () => {
    const parsingHeaders = JSON.parse(headers || '{}');
    return {
      'Content-Type': 'application/json',
      ...(parsingHeaders || {})
    };
  };

  const handleBlur = () => {
    if (!endpointUrl) {
      toast.error(tt('endpoint_required'));
      return;
    }
    const locale = pathname.split('/')[1];
    const newUrl = `${window.location.origin}/${locale}/graphQlClient/GRAPHQL/${encodedUrl}?query=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleExecuteQuery = async () => {
    try {
      const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: saveHeaders(),
        body: JSON.stringify({
          query,
          variables: JSON.parse(variables || '{}')
        })
      });

      const result = await res.json();
      localStorage.setItem('graphql_query', query);
      setResponse(result);
      setStatus(res.status.toString());
      saveToHistory({
        encodedUrl,
        encodedQuery,
        encodedVariables,
        encodedHeaders,
        method: 'GRAPHQL',
        localStorageKey: 'graphql_requests'
      });
    } catch (error) {
      console.error('Error:', (error as Error).message);
      toast.error(tt('check_query'));
    }
  };

  return (
    <div className="relative mx-auto p-4 flex w-4/5 bg-slate-600 rounded-lg text-gray-200 font-mono">
      <div
        className={`absolute top-0 right-0 h-full bg-gray-600 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full hidden'} w-2/5 p-4 z-50`}
      >
        <button
          onClick={() => toggleDrawer({ isDrawerOpen, setIsDrawerOpen })}
          className="mb-4 text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
        >
          <Image
            src="/icon/close.png"
            alt="Close drawer"
            width={30}
            height={30}
          />
        </button>
        <DocumentationViewer endpointUrl={sdlUrl} />
      </div>
      <section className="w-full bg-slate-600 p-4 rounded-lg flex flex-col">
        <div className="flex justify-between bg-zinc-300 rounded-lg items-center">
          <EndpointInput
            endpointUrl={endpointUrl}
            setEndpointUrl={setEndpointUrl}
            sdlUrl={sdlUrl}
            setSdlUrl={setSdlUrl}
          />
          <div className="flex space-x-2">
            <div className="text-lg font-bold text-gray-400"></div>
          </div>
          <div className="flex flex-col">
            <IconButton
              iconSrc="/icon/play.png"
              iconAlt={t('execute')}
              buttonText={t('execute')}
              onClick={handleExecuteQuery}
            />
            {sdlUrl && (
              <IconButton
                iconSrc="/icon/docs.png"
                iconAlt={t('documentation')}
                buttonText={t('documentation')}
                onClick={() => toggleDrawer({ isDrawerOpen, setIsDrawerOpen })}
              />
            )}
            <IconButton
              iconSrc="/icon/clear.png"
              iconAlt={t('prettify')}
              buttonText={t('prettify')}
              onClick={() => prettifyQuery({ query, setQuery })}
            />
          </div>
        </div>
        <QueryEditor query={query} setQuery={setQuery} onBlur={handleBlur} />
        <div className="bg-zinc-300 text-white p-4 rounded-lg mt-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <TextButton
                buttonText={t('variables')}
                onClick={() => setSelectedEditor(variablesEditor)}
                isActive={selectedEditor === variablesEditor}
              />
              <TextButton
                buttonText={t('headers')}
                onClick={() => setSelectedEditor(headersEditor)}
                isActive={selectedEditor === headersEditor}
              />
            </div>
            <button
              className={`transition-transform ${isVisible ? 'rotate-180' : ''} p-2`}
              onClick={() =>
                handleToggleVisibility({ isVisible, setIsVisible })
              }
              aria-label="Toggle section"
            >
              <span
                className={`${isVisible ? 'rotate-180' : ''} text-black text-2xl`}
              >
                ▼
              </span>
            </button>
          </div>
          {isVisible && (
            <div className=" p-4 rounded-lg">
              {selectedEditor === variablesEditor && (
                <VariablesEditor
                  variables={variables}
                  setVariables={setVariables}
                />
              )}
              {selectedEditor === headersEditor && (
                <HeaderEditor headers={headers} setHeaders={setHeaders} />
              )}
            </div>
          )}
        </div>
      </section>
      <ResponseViewer response={response} status={status} />
    </div>
  );
};

export default GraphiQL;
