'use client';

import ClientContent from '@/components/RESTClient/clientContent/ClientContent';

const RestClientPage = () => {
  return (
    <main className="flex-grow gap-[50px] min-h-screen items-center justify-between px-24 py-5 max-[1000px]:p-7 max-[700px]:px-5">
      <ClientContent />
    </main>
  );
};

export default RestClientPage;
