import { useTranslations } from 'next-intl';
import HistoryLogic from '@/components/history/History';

const History = () => {
  const t = useTranslations('HistoryPage');

  return (
    <main className="flex-grow flex flex-col items-center ">
      <h1 className="text-4xl mb-2">{t('title')}</h1>
      <HistoryLogic />
    </main>
  );
};

export default History;
