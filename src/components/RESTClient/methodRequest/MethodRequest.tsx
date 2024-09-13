'use client';

import InputRequest from '@/ui/inputRequest';
import { Button } from '@/ui/button';
// import { useTranslations } from 'next-intl';

const MethodRequest = () => {
  // const t = useTranslations('RestClientPage');

  return (
    <div className="flex items-end gap-[20px]">
      <InputRequest />
      <Button onClick={() => console.log('Click')} disabled={false}>
        Send
      </Button>
    </div>
  );
};

export default MethodRequest;
