import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const BodyEditor = () => {
  const [isJson, setIsJson] = useState(true);
  const [content, setContent] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const prettifyJson = () => {
    try {
      const jsonObject = JSON.parse(content);
      setContent(JSON.stringify(jsonObject, null, 2));
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 border w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <label>
            <input
              type="radio"
              name="mode"
              checked={isJson}
              onChange={() => setIsJson(true)}
            />
            JSON
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              checked={!isJson}
              onChange={() => setIsJson(false)}
            />
            Text
          </label>
        </div>
        <button
          onClick={prettifyJson}
          disabled={!isJson}
          className="bg-blue-500 text-white px-2 py-1"
        >
          Prettify
        </button>
        <button
          onClick={() => setIsReadOnly(!isReadOnly)}
          className="bg-green-500 text-white px-2 py-1"
        >
          Toggle Read-Only
        </button>
      </div>

      {isJson ? (
        <div>
          {isReadOnly ? (
            <ReactJson
              src={JSON.parse(content || '{}')}
              name={false}
              collapsed={false}
            />
          ) : (
            <textarea
              className="w-full h-40 p-2 border"
              value={content}
              onChange={handleContentChange}
              placeholder="Enter JSON here"
            />
          )}
        </div>
      ) : (
        <textarea
          className="w-full h-40 p-2 border"
          value={content}
          onChange={handleContentChange}
          readOnly={isReadOnly}
          placeholder="Enter plain text here"
        />
      )}
    </div>
  );
};

export default BodyEditor;
