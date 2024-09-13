'use client';

import BodyEditor from '@/ui/editor';
// import { useTranslations } from 'next-intl';

const BodyRequest = () => {
  // const t = useTranslations('RestClientPage');

  return (
    <div className="">
      <div>Body</div>
      <BodyEditor />
    </div>
  );
};

export default BodyRequest;
