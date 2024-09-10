'use client';
import React, { useEffect, useState } from 'react';
import { GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { DocExplorer } from '@graphiql/react';
import { DocumentationViewerProps } from '@/interfaces/graphQl';
import { FetcherType } from '@/interfaces/graphQl';

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  endpointUrl
}) => {
  const [fetcher, setFetcher] = useState<FetcherType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && endpointUrl) {
      const newFetcher = createGraphiQLFetcher({ url: endpointUrl });
      setFetcher(() => newFetcher);
    }
  }, [endpointUrl]);

  if (!fetcher) {
    return <div>Please provide a valid GraphQL endpoint.</div>;
  }

  return (
    <GraphiQLProvider fetcher={fetcher}>
      <div>
        <DocExplorer />
      </div>
    </GraphiQLProvider>
  );
};

export default DocumentationViewer;
