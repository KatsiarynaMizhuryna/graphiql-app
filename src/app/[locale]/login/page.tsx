import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const t = useTranslations('LoginPage');

  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className="text-4xl">{t('title')}</h1>
    </main>
  );
};

export default LoginPage;
