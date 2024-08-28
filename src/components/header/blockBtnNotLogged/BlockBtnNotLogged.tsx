import { useLocale, useTranslations } from 'next-intl';
import { LinkButton } from '@/ui/linkButton';

export const BlockBtnNotLogged = () => {
  const locale = useLocale();
  const t = useTranslations('buttons.redirect');

  return (
    <div className="flex gap-5">
      <LinkButton href={`/${locale}/login`}>{t('login')}</LinkButton>
      <LinkButton href={`/${locale}/registration`}>
        {t('registration')}
      </LinkButton>
    </div>
  );
};
