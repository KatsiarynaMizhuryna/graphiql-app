import React, { useState, useEffect } from 'react';
import { BodyEditorProps } from '@/interfaces/client';
import toast from 'react-hot-toast';
import JSONView from '@uiw/react-json-view';
import { useTranslations } from 'next-intl';

const BodyEditor: React.FC<BodyEditorProps> = ({
  content,
  setContent,
  isReadOnly,
  method = 'GET',
  data
}) => {
  const t = useTranslations('RestClientPage');
  const [error, setError] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<string>(content || '');

  useEffect(() => {
    setLocalContent(content || '');
  }, [content]);

  const prettifyJson = () => {
    try {
      if (!localContent?.trim()) {
        if (method === 'POST') {
          if (setContent) {
            setContent('');
          }
          setError(null);
          return;
        } else {
          throw new Error(`${t('message')}`);
        }
      }

      let jsonObject = JSON.parse(localContent);

      if (typeof jsonObject !== 'object' || jsonObject === null) {
        throw new Error(`${t('messageInvalidJSON')}`);
      }

      if (data) {
        jsonObject = { ...jsonObject, ...data };
      }

      const prettyJson = JSON.stringify(jsonObject, null, 2);

      if (!isReadOnly && setContent) {
        setContent(prettyJson);
      }

      setLocalContent(prettyJson);
      setError(null);
    } catch (e) {
      const error = e as Error;
      toast.error(`Error: ${error.message}`);
      setError(error.message || `${t('messageInvalidJSON')}`);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalContent(newValue);

    if (newValue.trim() === '') {
      if (setContent) setContent('');
      setError(null);
    } else if (!isValidJson(newValue)) {
      toast.error(`${t('messageInvalidJSON')}`);
      setError(`${t('messageInvalidJSON')}`);
    } else {
      setError(null);
      if (setContent) {
        setContent(newValue);
      }
    }
  };

  const isValidJson = (jsonString: string): boolean => {
    try {
      if (jsonString.trim() === '') {
        return method === 'POST';
      }
      const parsed = JSON.parse(jsonString);
      return typeof parsed === 'object' && parsed !== null;
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      return false;
    }
  };

  useEffect(() => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      setLocalContent('');
      setError(null);

      if (setContent) {
        setContent('');
      }
    }
  }, [method, setContent]);

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

      {!isReadOnly ? (
        <div>
          <textarea
            placeholder={
              ['GET', 'HEAD', 'OPTIONS'].includes(method)
                ? 'Request body is not required for this method'
                : 'Enter JSON here...'
            }
            value={localContent}
            onChange={handleTextareaChange}
            className="w-full p-2 border custom-scrollbar"
            rows={10}
            disabled={['GET', 'HEAD', 'OPTIONS'].includes(method)}
          />
        </div>
      ) : (
        <div className="border p-2 bg-gray-100">
          {localContent?.trim() ? (
            <JSONView
              value={JSON.parse(localContent)}
              style={{ overflowX: 'auto' }}
              collapsed={false}
            />
          ) : (
            <div>{t('message')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BodyEditor;
