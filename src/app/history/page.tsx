import HistoryLogic from '@/components/history/emptyHis/EmptyHis';
const History = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className="text-4xl">History PAGE</h1>
      <HistoryLogic />
    </main>
  );
};

export default History;
