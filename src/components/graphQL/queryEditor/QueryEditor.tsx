import React from 'react';

interface QueryEditorProps {
  query: string;
  setQuery: (query: string) => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ query, setQuery }) => {
  return (
    <textarea
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-grow bg-gray-900 text-gray-200 p-4 mt-2 rounded-lg focus:outline-none resize-none"
      rows={15}
      placeholder="Type your query here..."
    ></textarea>
  );
};

export default QueryEditor;
