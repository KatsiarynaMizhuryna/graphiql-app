import React from 'react';
import { QueryEditorProps } from '@/interfaces/graphQl';
import handleKeyDown from '@/utils/handleKeyDown';

const QueryEditor: React.FC<QueryEditorProps> = ({
  query,
  setQuery,
  onBlur
}) => {
  return (
    <textarea
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => handleKeyDown({ e, setQuery })}
      onBlur={onBlur}
      className="flex-grow bg-zinc-300 text-gray-800 p-4 mt-2 rounded-lg focus:outline-none resize-none"
      rows={15}
      placeholder="Type your query here..."
    ></textarea>
  );
};

export default QueryEditor;
