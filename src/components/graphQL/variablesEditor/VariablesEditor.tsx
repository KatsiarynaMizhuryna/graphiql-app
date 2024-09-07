import React from 'react';

interface VariablesEditorProps {
  variables: string;
  setVariables: (variables: string) => void;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ variables, setVariables }) => {
  return (
    <div className="flex-grow">
      <div className="text-sm text-gray-400">Variables</div>
      <textarea
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
        className="w-full bg-gray-900 text-gray-200 p-2 rounded-lg focus:outline-none resize-none"
          rows={3}
      ></textarea>
    </div>
  );
};

export default VariablesEditor;
