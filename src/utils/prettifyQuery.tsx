import gqlPrettier from 'graphql-prettier';
import { toast } from 'react-hot-toast';
import { prettifyQueryProps } from '@/interfaces/graphQl';

const prettifyQuery = ({ query, setQuery }: prettifyQueryProps) => {
  try {
    const formattedQuery = gqlPrettier(query);
    setQuery(formattedQuery);
    return formattedQuery;
  } catch (error) {
    toast.error(`Check your query, please: ${(error as Error).message}`);
    return query;
  }
};

export default prettifyQuery;
