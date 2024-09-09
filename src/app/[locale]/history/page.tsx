import { useTranslations } from 'next-intl';
import HistoryLogic from '@/components/history/emptyHis/EmptyHis';

const History = () => {
  const t = useTranslations('HistoryPage');

  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className="text-4xl">{t('title')}</h1>
      <HistoryLogic />
    </main>
  );
};

export default History;
