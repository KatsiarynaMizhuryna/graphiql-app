'use client';

import { useState } from 'react';
import EndpointInput from '../endpointInut/EndpointInput';
import QueryEditor from '../queryEditor/QueryEditor';
import ResponseViewer from '../responseViewer/ResponseViewer';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import Image from 'next/image';
import HeaderEditor from '../headersEditor/HeadersEditor';
import DocumentationViewer from '../documentationViewer/DocumentationViewer';
import IconButton from '@/ui/iconButton';

const GraphiQL = () => {
  const [endpointUrl, setEndpointUrl] = useState<string>('');
  const [sdlUrl, setSdlUrl] = useState<string>('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>();
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [response, setResponse] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
    } catch (error) {
      console.error('Error:', (error as Error).message);
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
      console.error('Error parsing headers:', (error as Error).message);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const prettifyQuery = () => {
    console.log('prettifyQuery');
  };

  return (
    <div className="mx-auto p-4 flex w-4/5 bg-slate-600 rounded-lg text-gray-200 font-mono">
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} w-1/4 p-4 z-50`}
      >
        <button
          onClick={toggleDrawer}
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
      <section className="w-3/5 bg-slate-600 p-4 rounded-lg flex flex-col">
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
                onClick={toggleDrawer}
              />
            )}
            <IconButton
              iconSrc="/icon/clear.png"
              iconAlt="Prettify"
              buttonText="Prettify"
              onClick={prettifyQuery}
            />
          </div>
        </div>
        <QueryEditor query={query} setQuery={setQuery} />
        <div className="mt-4 flex space-x-4">
          <VariablesEditor variables={variables} setVariables={setVariables} />
          <HeaderEditor
            headers={headers}
            onHeadersChange={handleHeadersChange}
          />
        </div>
      </section>
      <ResponseViewer response={response} />
    </div>
  );
};

export default GraphiQL;
