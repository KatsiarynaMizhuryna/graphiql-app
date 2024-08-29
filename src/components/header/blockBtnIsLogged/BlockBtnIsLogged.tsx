'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/userContext';
import { logOutUserToLocalStorage } from '@/store/localStorage';

export const BlockBtnIsLogged = () => {
  const { uid, userEmail, setUser } = useAuth();
  const locale = useLocale();
  const router = useRouter();

  const handleSignOut = () => {
    if (uid) {
      logOutUserToLocalStorage(uid);
    }
    setUser(null, null, false);
    router.push(`/${locale}/`);
  };

  return (
    <div className="flex gap-5 items-center">
      <div className="max-sm:text-center">
        Welcome, <b>{userEmail}</b>!
      </div>
      <Button onClick={handleSignOut}>Sign OUT</Button>
    </div>
  );
};
