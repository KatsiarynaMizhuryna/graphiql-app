export interface KeyValueItem {
  key: string;
  value: string;
  description: string;
}

export interface Variable extends KeyValueItem {
  checked: boolean;
}

export interface VariablesProps {
  variables: Variable[];
  setVariables: (newVariables: Variable[]) => void;
}

export interface Header {
  key: string;
  value: string;
}

export interface MethodRequestProps {
  url: string;
  setUrl: (url: string) => void;
  method: string;
  setMethod: (method: string) => void;
}
