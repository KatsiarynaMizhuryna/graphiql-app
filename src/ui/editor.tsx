import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BodyEditorProps } from '@/types/client';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

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
      console.error(error.message);
      setError('Invalid JSON format');
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    if (!isReadOnly && setContent) {
      setContent(updatedContent);
    }
    validateJson(updatedContent);
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
      setError((e as Error).message || 'Invalid JSON format');
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
          <ReactJson
            src={content ? JSON.parse(content) : {}}
            name={false}
            collapsed={false}
          />
        </div>
      ) : (
        <textarea
          className="w-full p-2 border min-h-[200px] bg-white"
          value={content}
          onChange={handleContentChange}
          placeholder="Enter JSON here"
        />
      )}
    </div>
  );
};

export default BodyEditor;
