'use client';

import { Button } from '@/ui/button';
// import { useTranslations } from 'next-intl';
import TableHeaders from '@/ui/table';

const Headers = () => {
  // const t = useTranslations('RestClientPage');

  return (
    <div className="flex flex-col gap-[20px] w-full">
      <div className="flex justify-between">
        <div className="self-end text-[25px]">Headers</div>
        <Button
          onClick={() => console.log('Clicked!')}
          className="h-[36px]"
          disabled={false}
        >
          Add Header
        </Button>
      </div>
      <TableHeaders />
    </div>
  );
};

export default Headers;
