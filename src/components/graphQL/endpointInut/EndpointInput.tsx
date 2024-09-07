import React from 'react';

interface EndpointInputProps {
  endpointUrl: string;
  setEndpointUrl: (url: string) => void;
  sdlUrl: string;
  setSdlUrl: (url: string) => void;
}

const EndpointInput: React.FC<EndpointInputProps> = ({ endpointUrl, setEndpointUrl, sdlUrl, setSdlUrl }) => {
  return (
    <div className="flex flex-col bg-gray-800 p-4 w-3/5">
      <label  htmlFor="endpointUrl" className="block text-sm font-medium text-gray-400">Endpoint URL:</label>
      <input
        type="text"
        value={endpointUrl}
        onChange={(e) => setEndpointUrl(e.target.value)}
        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <label htmlFor="sdlUrl" className="block text-sm font-medium text-gray-400 mt-2">SDL URL:</label>
      <input
        type="text"
        value={sdlUrl}
        onChange={(e) => setSdlUrl(e.target.value || `${endpointUrl}?sdl`)}
        className="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default EndpointInput;
