'use client';

import { StatusRequestProps } from '@/interfaces/client';
import BodyEditor from '@/ui/editor';
import { useTranslations } from 'next-intl';

const StatusRequest: React.FC<StatusRequestProps> = ({ status, data }) => {
  const t = useTranslations('RestClientPage');
  const content = data ? JSON.stringify(data, null, 2) : '';

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <span>
        {t('Status')}: {status !== null ? status : `${t('StatusMessage')}`}
      </span>
      <BodyEditor content={content} isReadOnly={true} data={data} />
    </div>
  );
};

export default StatusRequest;
