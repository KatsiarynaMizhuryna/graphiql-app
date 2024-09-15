import React from 'react';
import BodyEditor from '@/ui/editor';
import { useTranslations } from 'next-intl';

interface BodyRequestProps {
  body: string;
  method: string;
  setBody: (body: string) => void;
}

const BodyRequest: React.FC<BodyRequestProps> = ({ body, method, setBody }) => {
  const t = useTranslations('RestClientPage');
  const isReadOnly =
    method === 'GET' || method === 'OPTIONS' || method === 'HEAD';

  return (
    <div>
      <div>{t('Body')}</div>
      <BodyEditor
        content={body}
        setContent={setBody}
        isReadOnly={isReadOnly}
        method={method}
      />
    </div>
  );
};

export default BodyRequest;
