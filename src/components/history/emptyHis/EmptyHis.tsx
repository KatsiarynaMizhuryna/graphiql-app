'use client';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { LinkButton } from '@/ui/linkButton';

const HistoryLogic = () => {
  const t = useTranslations('HistoryPage');
  const locale = useLocale();
  const tBtn = useTranslations('buttons.redirect');

  const [requestsExist, setRequestsExist] = useState(false);

  useEffect(() => {
    const requests = localStorage.getItem('requests');
    if (requests) {
      setRequestsExist(true);
    }
  }, []);

  if (!requestsExist) {
    return (
      <div className="text-center">
        <p className="text-xl">{t('subTitle')}</p>
        <div className="mt-4 space-x-4">
          <LinkButton href={`/${locale}/restClient`}>
            {tBtn('restClient')}
          </LinkButton>
          <LinkButton href={`/${locale}/graphQlClient`}>
            {tBtn('graphQlClient')}
          </LinkButton>
        </div>
      </div>
    );
  }
};

export default HistoryLogic;
