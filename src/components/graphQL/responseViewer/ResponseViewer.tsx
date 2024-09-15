import React from 'react';
import { ResponseViewerProps } from '@/interfaces/graphQl';
import { useTranslations } from 'next-intl';

const ResponseViewer: React.FC<ResponseViewerProps> = ({
  response,
  status
}) => {
  const statusColor = status === '200' ? 'text-green-800' : 'text-red-500';
  const t = useTranslations('GraphClientPage');
  return (
    <section className="w-2/5 bg-zinc-300 p-4 rounded-lg">
      <div className="bg-zinc-300 text-gray-400 p-4 h-full rounded-lg">
        {response && (
          <>
            <p className={`text-lg font-semibold ${statusColor} mb-2`}>
              {t('status')}: {status}
            </p>
            <pre className="mt-2 p-2 bg-gray-100 rounded-md overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </>
        )}
      </div>
    </section>
  );
};

export default ResponseViewer;
