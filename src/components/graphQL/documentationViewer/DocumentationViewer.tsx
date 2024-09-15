'use client';
import React, { useEffect, useState } from 'react';
import { GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { DocExplorer } from '@graphiql/react';
import { DocumentationViewerProps } from '@/interfaces/graphQl';
import { FetcherType } from '@/interfaces/graphQl';
import '@graphiql/react/dist/style.css';
import { useTranslations } from 'next-intl';

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  endpointUrl
}) => {
  const [fetcher, setFetcher] = useState<FetcherType | null>(null);
  const t = useTranslations('Errors');

  useEffect(() => {
    if (typeof window !== 'undefined' && endpointUrl) {
      const newFetcher = createGraphiQLFetcher({ url: endpointUrl });
      setFetcher(() => newFetcher);
    }
  }, [endpointUrl]);

  if (!fetcher) {
    return <div>{t('valid_graphQL_endpoint')}</div>;
  }

  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div className="graphiql-container">
        <DocExplorer />
      </div>
    </GraphiQLProvider>
  );
};

export default DocumentationViewer;
