import { useState } from 'react';
import EndpointInput from '../endpointInut/EndpointInput';
import QueryEditor from '../queryEditor/QueryEditor';
import ResponseViewer from '../responseViewer/ResponseViewer';
import VariablesEditor from '../variablesEditor/VariablesEditor';
import Image from 'next/image';
import HeaderEditor from '../headersEditor/HeadersEditor';


const GraphiQL = () => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>();
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [response, setResponse] = useState('');
 

  const handleExecuteQuery = async () => {
    const headersObject = headers;

    try {
      const res = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headersObject,
        },
        body: JSON.stringify({
          query,
          variables: JSON.parse(variables || '{}'),
        }),
      });

      const result = await res.json();
      setResponse(result);
      

      // if (res.ok && result.data) {
      //   const sdlRes = await fetch(sdlUrl || `${endpointUrl}?sdl`);
      //  // const sdl = await sdlRes.json();
        
      // }
    } catch (error) {
      console.error('Error executing query:', error);
     
    }
  };

  const handleHeadersChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const headersObject = JSON.parse(event.target.value);
      if (typeof headersObject === 'object' && headersObject !== null) {
        setHeaders(headersObject);
      } else {
        console.error('Invalid headers format');
      }
    } catch (error) {
      console.error('Error parsing headers:', error);
    }
  };

  return (
    <div className="mx-auto p-4 flex w-4/5 bg-gray-900 text-gray-200 font-mono">
      <section className="w-3/5 bg-gray-800 p-4 rounded-lg flex flex-col">
        <div className="flex justify-between items-center">
          <EndpointInput
            endpointUrl={endpointUrl}
            setEndpointUrl={setEndpointUrl}
            sdlUrl={sdlUrl}
            setSdlUrl={setSdlUrl}
          />
          <div className="flex space-x-2">
            <div className="text-lg font-bold text-gray-200"></div>
          </div>
          <div className='flex flex-col'>
            <button onClick={handleExecuteQuery}>
              <Image
                src="/icon/play.png"
                alt="Execute button"
                width={30}
                height={30}
                className="m-2"
              />
            </button>
            <Image
              src="/icon/docs.png"
              alt="Documentation"
              width={30}
              height={30}
              className="m-2"
            />
          </div>
        </div>

        <QueryEditor query={query} setQuery={setQuery} />

        <div className="mt-4 flex space-x-4">
          <VariablesEditor variables={variables} setVariables={setVariables} />
          <HeaderEditor headers={headers} onHeadersChange={handleHeadersChange} />
        </div>
      </section>

      <ResponseViewer response={response} />
    </div>
  );
};

export default GraphiQL;