'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/ui/button';
import { useRouter } from 'next/navigation';
import { logOutUserToLocalStorage } from '@/store/localStorage';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const BlockBtnIsLogged = () => {
  const t = useTranslations('buttons.action');
  const locale = useLocale();
  const router = useRouter();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const email = user?.email;

  const handleSignOut = async () => {
    if (uid) {
      logOutUserToLocalStorage(uid);
    }

    try {
      localStorage.removeItem('graphql_requests');
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
    router.push(`/${locale}/`);
  };

  return (
    <div className="flex gap-5 items-center">
      <div className="max-sm:text-center">
        {t('welcome')}, <b>{email}</b>!
      </div>
      <Button onClick={handleSignOut}>{t('logOut')}</Button>
    </div>
  );
};
