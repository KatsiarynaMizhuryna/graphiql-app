import React from 'react';

interface ResponseViewerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({  response }) => {
  return (
    <section className="w-2/5 bg-gray-850 p-4 rounded-lg">
    <div className="bg-gray-900 text-gray-400 p-4 h-full rounded-lg">
    <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-x-auto">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  </section>
  );
};

export default ResponseViewer;

