'use client';
import { useSearchParams } from 'next/navigation';
import GraphiQL from '@/components/graphQL/graphQlClient/GraphQlClient';
import decodeBase64 from '@/utils/decodeBase64';

const GraphQLClientPage = ({ params }: { params: { url?: string } }) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const decodedUrl = params.url
    ? decodeBase64(decodeURIComponent(params.url))
    : '';
  const decodedQuery = decodeBase64(queryParam!) || '';

  return (
    <div>
      <GraphiQL initialEndpointUrl={decodedUrl} initialQuery={decodedQuery} />
    </div>
  );
};

export default GraphQLClientPage;
