export interface handleKeyDownProps {
  e: React.KeyboardEvent<HTMLTextAreaElement>;
  setQuery: (query: string) => void;
}
