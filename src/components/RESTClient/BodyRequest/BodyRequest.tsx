import React from 'react';
import BodyEditor from '@/ui/editor';

interface BodyRequestProps {
  body: string;
  method: string;
  setBody: (body: string) => void;
}

const BodyRequest: React.FC<BodyRequestProps> = ({ body, method, setBody }) => {
  const isReadOnly =
    method === 'GET' || method === 'OPTIONS' || method === 'HEAD';

  return (
    <div>
      <div>Body</div>
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
