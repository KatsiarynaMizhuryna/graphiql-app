import React from 'react';
import { HeaderEditorProps } from '@/interfaces/graphQl';

const HeaderEditor: React.FC<HeaderEditorProps> = ({
  headers,
  onHeadersChange
}) => {
  return (
    <div className="flex-grow">
      <div className="text-sm text-gray-400">Headers</div>
      <textarea
        value={JSON.stringify(headers, null, 2)}
        onChange={onHeadersChange}
        className="w-full bg-zinc-300 text-gray-800 p-2 rounded-lg focus:outline-none resize-none"
        rows={3}
      ></textarea>
    </div>
  );
};

export default HeaderEditor;
