'use client';

import { StatusRequestProps } from '@/types/client';
import BodyEditor from '@/ui/editor';

const StatusRequest: React.FC<StatusRequestProps> = ({ status, data }) => {
  const content = data ? JSON.stringify(data, null, 2) : '';

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <span>Status: {status !== null ? status : 'No Status'}</span>
      <BodyEditor content={content} isReadOnly={true} data={data} />
    </div>
  );
};

export default StatusRequest;
