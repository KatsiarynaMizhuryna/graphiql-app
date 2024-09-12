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

const GraphiQL = ({
  initialEndpointUrl = '',
  initialSdlEndpointUrl = '',
  initialQuery = '',
  initialVariables = ''
}) => {
  const [endpointUrl, setEndpointUrl] = useState<string>(initialEndpointUrl);
  const [sdlUrl, setSdlUrl] = useState<string>(initialSdlEndpointUrl);
  const [headers, setHeaders] = useState<{ [key: string]: string }>();
  const [query, setQuery] = useState<string>(initialQuery);
  const [variables, setVariables] = useState<string>(initialVariables);
  const [status, setStatus] = useState<string>('');
  const [response, setResponse] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const encodedUrl = encodeBase64(endpointUrl);
  const encodedQuery = encodeBase64(query);
  const encodedVariables = encodeBase64(variables);

  const handleBlur = () => {
    const newUrl = `${window.location.origin}${window.location.pathname.split('/GRAPHQL')[0]}/GRAPHQL/${encodedUrl}?query=${encodedQuery}&variables=${encodedVariables}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleExecuteQuery = async () => {
    try {
      const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {})
        },
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
        method: 'GRAPHQL',
        localStorageKey: 'graphql_requests'
      });
    } catch (error) {
      console.error('Error:', (error as Error).message);
      toast.error('Error: Check your query, please');
    }
  };

  const handleHeadersChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      const headersObject = JSON.parse(event.target.value);
      if (typeof headersObject === 'object' && headersObject !== null) {
        setHeaders(headersObject);
      } else {
        console.error('Invalid headers format');
      }
    } catch (error) {
      toast.error(`Error parsing headers: ${(error as Error).message}`);
    }
  };

  return (
    <div className="relative mx-auto p-4 flex w-4/5 bg-slate-600 rounded-lg text-gray-200 font-mono">
      <div
        className={`absolute top-0 right-0 h-full bg-gray-600 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full hidden'} w-2/5 p-4 z-50 overflow-y-auto`}
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
              iconAlt="Execute button"
              buttonText="Execute"
              onClick={handleExecuteQuery}
            />
            {sdlUrl && (
              <IconButton
                iconSrc="/icon/docs.png"
                iconAlt="Documentation"
                buttonText="Documentation"
                onClick={() => toggleDrawer({ isDrawerOpen, setIsDrawerOpen })}
              />
            )}
            <IconButton
              iconSrc="/icon/clear.png"
              iconAlt="Prettify"
              buttonText="Prettify"
              onClick={() => prettifyQuery({ query, setQuery })}
            />
          </div>
        </div>
        <QueryEditor query={query} setQuery={setQuery} onBlur={handleBlur} />
        <div className="mt-4 flex space-x-4">
          <VariablesEditor variables={variables} setVariables={setVariables} />
          <HeaderEditor
            headers={headers}
            onHeadersChange={handleHeadersChange}
          />
        </div>
      </section>
      <ResponseViewer response={response} status={status} />
    </div>
  );
};

export default GraphiQL;
