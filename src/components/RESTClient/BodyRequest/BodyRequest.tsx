import React from 'react';
import BodyEditor from '@/ui/editor';

interface BodyRequestProps {
  body: string;
  setBody: (body: string) => void;
}

const BodyRequest: React.FC<BodyRequestProps> = ({ body, setBody }) => {
  return (
    <div>
      <div>Body</div>
      <BodyEditor content={body} setContent={setBody} isReadOnly={false} />
    </div>
  );
};

export default BodyRequest;
