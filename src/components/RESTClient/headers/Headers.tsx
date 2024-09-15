'use client';
import { VariablesProps } from '@/interfaces/client';
import TableHeaders from '@/ui/table';
import { useTranslations } from 'next-intl';

const Headers = ({ variables, setVariables }: VariablesProps) => {
  const t = useTranslations('RestClientPage');

  return (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="flex justify-between">
        <div className="self-end text-[25px]">{t('Headers')}</div>
      </div>
      <TableHeaders variables={variables} setVariables={setVariables} />
    </div>
  );
};

export default Headers;
