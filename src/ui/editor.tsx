/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

interface BodyEditorProps {
  initialContent: string;
  isReadOnly: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // JSON object from API
}

const BodyEditor: React.FC<BodyEditorProps> = ({
  initialContent,
  isReadOnly,
  data
}) => {
  const [content, setContent] = useState(initialContent); // JSON data in text format
  const [error, setError] = useState<string | null>(null); // Error message if JSON is invalid

  // Merge API data into the content JSON
  const mergeApiData = (jsonContent: string, apiData: any) => {
    try {
      const contentObj = JSON.parse(jsonContent);
      const mergedContent = { ...contentObj, ...apiData };
      return JSON.stringify(mergedContent, null, 2);
    } catch {
      // If content is invalid JSON, return it as is
      return jsonContent;
    }
  };

  // Validate JSON format
  const validateJson = (json: string) => {
    try {
      JSON.parse(json); // If parsing succeeds, the JSON is valid
      setError(null); // Clear the error
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
      setError('Invalid JSON format'); // Set error message
    }
  };

  // Handle changes in textarea and validate the JSON
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);
    validateJson(updatedContent); // Check JSON validity on each change
  };

  // Prettify the JSON
  const prettifyJson = () => {
    try {
      if (!content.trim()) {
        throw new Error('Content is empty'); // Empty input check
      }

      let jsonObject = JSON.parse(content); // Parse string as JSON

      if (typeof jsonObject !== 'object' || jsonObject === null) {
        throw new Error('Invalid JSON format'); // Validate JSON structure
      }

      // Merge API data into the JSON if provided
      if (data) {
        jsonObject = { ...jsonObject, ...data };
      }

      setContent(JSON.stringify(jsonObject, null, 2)); // Format JSON with indentation
      setError(null); // Clear error if everything succeeds
    } catch (e) {
      setError((e as Error).message || 'Invalid JSON format'); // Show error message
    }
  };

  // Update JSON content with API data when `data` prop changes
  useEffect(() => {
    if (data) {
      const updatedContent = mergeApiData(content, data);
      setContent(updatedContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="p-4 border w-full">
      {/* Prettify Button */}
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

      {/* Error message if JSON is invalid */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Show JSON based on mode (read-only or editable) */}
      {isReadOnly ? (
        <div className="border p-2 bg-gray-100">
          {/* Render JSON in read-only mode */}
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
