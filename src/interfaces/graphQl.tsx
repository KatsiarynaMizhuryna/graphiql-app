import { createGraphiQLFetcher } from '@graphiql/toolkit';

export interface DocumentationViewerProps {
  endpointUrl: string;
}

export interface EndpointInputProps {
  endpointUrl: string;
  setEndpointUrl: (url: string) => void;
  sdlUrl: string;
  setSdlUrl: (url: string) => void;
}

export type FetcherType = ReturnType<typeof createGraphiQLFetcher>;

export interface HeaderEditorProps {
  headers: string;
  setHeaders: (headers: string) => void;
}

export interface IconButtonWithTextProps {
  iconSrc: string;
  iconAlt: string;
  buttonText: string;
  onClick: () => void;
}

export interface QueryEditorProps {
  query: string;
  setQuery: (query: string) => void;
  onBlur?: () => void;
}

export interface prettifyQueryProps {
  query: string;
  setQuery: (query: string) => void;
}

export interface ResponseViewerProps {
  response: string | undefined;
  status: string;
}

export interface toggleDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export interface VariablesEditorProps {
  variables: string;
  setVariables: (variables: string) => void;
}
