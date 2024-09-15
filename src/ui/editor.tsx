import React, { useState, useEffect } from 'react';
import { BodyEditorProps } from '@/interfaces/client';
import toast from 'react-hot-toast';
import JSONView from '@uiw/react-json-view';

type JsonViewUpdate = {
  updated_src: object;
};

const BodyEditor: React.FC<BodyEditorProps> = ({
  content,
  setContent,
  isReadOnly,
  data
}) => {
  const [error, setError] = useState<string | null>(null);

  const mergeApiData = (jsonContent: string, apiData: {}) => {
    try {
      const contentObj = JSON.parse(jsonContent);
      const mergedContent = { ...contentObj, ...apiData };
      return JSON.stringify(mergedContent, null, 2);
    } catch {
      return jsonContent;
    }
  };

  const validateJson = (json: string) => {
    try {
      JSON.parse(json);
      setError(null);
    } catch (e) {
      const error = e as Error;
      toast.error(`Error: ${error.message}`);
      setError('Invalid JSON format');
    }
  };

  const handleContentChange = (updatedContent: unknown) => {
    const { updated_src } = updatedContent as JsonViewUpdate;
    if (!isReadOnly && setContent) {
      setContent(JSON.stringify(updated_src, null, 2));
    }
    validateJson(JSON.stringify(updated_src, null, 2));
  };

  const prettifyJson = () => {
    try {
      if (!content.trim()) {
        throw new Error('Content is empty');
      }

      let jsonObject = JSON.parse(content);

      if (typeof jsonObject !== 'object' || jsonObject === null) {
        throw new Error('Invalid JSON format');
      }

      if (data) {
        jsonObject = { ...jsonObject, ...data };
      }

      if (!isReadOnly && setContent) {
        setContent(JSON.stringify(jsonObject, null, 2));
      }
      setError(null);
    } catch (e) {
      const error = e as Error;
      toast.error(`Error: ${error.message}`);
      setError(error.message || 'Invalid JSON format');
    }
  };

  useEffect(() => {
    if (data) {
      const updatedContent = mergeApiData(content, data);
      if (!isReadOnly && setContent) {
        setContent(updatedContent);
      }
    }
  }, [content, data, isReadOnly, setContent]);

  return (
    <div className="p-4 border w-full">
      {!isReadOnly && (
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={prettifyJson}
            className="bg-blue-500 text-white px-2 py-1 mr-2"
          >
            Prettify
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {isReadOnly ? (
        <div className="border p-2 bg-gray-100">
          <JSONView
            value={content ? JSON.parse(content) : {}}
            style={{ overflowX: 'auto' }}
            collapsed={false}
          />
        </div>
      ) : (
        <JSONView
          value={content ? JSON.parse(content) : {}}
          onChange={(updatedContent) => handleContentChange(updatedContent)}
          style={{ overflowX: 'auto' }}
          collapsed={false}
        />
      )}
    </div>
  );
};

export default BodyEditor;
