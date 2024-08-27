'use client';
import { Button } from '@/ui/button';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/../firebase';
import { getAuth, signOut } from 'firebase/auth';

export const BlockBtnIsLogged = () => {
  const [user] = useAuthState(getAuth(app));
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(getAuth(app));
    router.push('/');
  };

  return (
    <div className="flex gap-5 items-center">
      <div className="max-sm:text-center">
        Welcome, <b>{user?.email}</b>!
      </div>
      <Button onClick={handleSignOut}>Sign OUT</Button>
    </div>
  );
};
