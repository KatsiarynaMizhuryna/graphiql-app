'use client';
import { useSearchParams } from 'next/navigation';
import GraphiQL from '@/components/graphQL/graphQlClient/GraphQlClient';
import decodeBase64 from '@/utils/decodeBase64';

const GraphQLClientPage = ({ params }: { params: { url?: string[] } }) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');
  const variablesParam = searchParams.get('variables');
  const decodedUrl = params.url
    ? decodeBase64(decodeURIComponent(params.url[1]))
    : '';
  const decodedQuery = queryParam ? decodeBase64(queryParam) : '';
  const decodedVariables = variablesParam ? decodeBase64(variablesParam) : '';

  return (
    <div>
      <GraphiQL
        initialEndpointUrl={decodedUrl}
        initialQuery={decodedQuery}
        initialVariables={decodedVariables}
      />
    </div>
  );
};

export default GraphQLClientPage;
