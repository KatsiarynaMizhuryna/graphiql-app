import React from 'react';
import { VariablesEditorProps } from '@/interfaces/graphQl';

const VariablesEditor: React.FC<VariablesEditorProps> = ({
  variables,
  setVariables
}) => {
  return (
    <div className="flex-grow">
      <textarea
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
        className="w-full  text-gray-800 p-2 rounded-lg focus:outline-none resize-none"
        rows={3}
      ></textarea>
    </div>
  );
};

export default VariablesEditor;
