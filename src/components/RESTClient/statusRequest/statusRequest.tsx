'use client';

// import { useTranslations } from 'next-intl';

const StatusRequest = () => {
  // const t = useTranslations('RestClientPage');

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <span>Status:</span>
      <span>HTTP Status Code</span>
    </div>
  );
};

export default StatusRequest;
