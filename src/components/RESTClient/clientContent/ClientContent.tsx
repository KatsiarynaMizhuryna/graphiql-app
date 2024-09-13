'use client';

import { useTranslations } from 'next-intl';
import MethodRequest from '../methodRequest/MethodRequest';
import Headers from '../headers/Headers';
import BodyRequest from '../BodyRequest/BodyRequest';
import ClientResponse from '../clientResponse/clientResponse';

const ClientContent = () => {
  const t = useTranslations('RestClientPage');

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <h1 className="text-4xl text-center">{t('title')}</h1>
      <MethodRequest />
      <Headers />
      <BodyRequest />
      <ClientResponse />
    </div>
  );
};

export default ClientContent;
