'use client';

import BodyEditor from '@/ui/editor';

// import { useTranslations } from 'next-intl';

const StatusRequest = () => {
  // const t = useTranslations('RestClientPage');
  const sampleJson = {
    name: 'John Doe',
    age: 30,
    job: 'Developer',
    name1: 'John Doe',
    age1: 30,
    job1: 'Developer',
    name2: 'John Doe',
    age2: 30,
    job2: 'Developer',
    name3: 'John Doe',
    age3: 30,
    job3: 'Developer',
    name4: 'John Doe',
    age4: 30,
    job4: 'Developer',
    name5: 'John Doe',
    age5: 30,
    job5: 'Developer',
    name6: 'John Doe',
    age6: 30,
    job6: 'Developer',
    name7: 'John Doe',
    age7: 30,
    job7: 'Developer'
  };

  const initialContent = '';

  return (
    <div className="w-full flex flex-col gap-[30px]">
      <span>Status:</span>
      <span>HTTP Status Code</span>
      <BodyEditor
        initialContent={initialContent}
        isReadOnly={true}
        date={sampleJson}
      />
    </div>
  );
};

export default StatusRequest;
