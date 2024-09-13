'use client';

// import { useTranslations } from 'next-intl';
import BodyRequest from '../BodyRequest/BodyRequest';
import StatusRequest from '../statusRequest/statusRequest';

const ClientResponse = () => {
  // const t = useTranslations('RestClientPage');

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <div>Response</div>
      <StatusRequest />
      <BodyRequest />
    </div>
  );
};

export default ClientResponse;
