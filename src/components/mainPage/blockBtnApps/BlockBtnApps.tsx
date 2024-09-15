'use client';

import { useLocale } from 'next-intl';
import { LinkButton } from '@/ui/linkButton';
import { useTranslations } from 'next-intl';

export const BlockBtnApps = () => {
  const locale = useLocale();
  const t = useTranslations('buttons.redirect');

  return (
    <div className="w-full flex justify-between max-sm:flex-col max-sm:text-center max-sm:gap-5 pb-10 max-sm:mt-5">
      <LinkButton href={`/${locale}/restClient`}>{t('restClient')}</LinkButton>
      <LinkButton href={`/${locale}/graphQlClient`}>
        {t('graphQlClient')}
      </LinkButton>
      <LinkButton href={`/${locale}/history`}>{t('history')}</LinkButton>
    </div>
  );
};
