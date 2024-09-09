import { useTranslations } from 'next-intl';

const RestClientPage = () => {
  const t = useTranslations('GraphClientPage');

  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className="text-4xl">{t('title')}</h1>
    </main>
  );
};

export default RestClientPage;
