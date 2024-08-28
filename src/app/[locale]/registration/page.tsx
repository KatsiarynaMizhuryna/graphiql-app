'use client';
import { useTranslations } from 'next-intl';

const RegistrationPage = () => {
  const t = useTranslations('RegistrationPage');

  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className="text-4xl">{t('title')}</h1>
    </main>
  );
};

export default RegistrationPage;
