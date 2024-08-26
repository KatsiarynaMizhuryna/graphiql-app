'use client';

import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/userSlice';
import { Button } from '@/ui/button';
import { useRouter } from 'next/navigation';

export const BlockBtnIsLogged = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  const handleSignOut = () => {
    dispatch(logOut());
    router.push(`/`);
  };

  return (
    <div className="flex gap-5 items-center">
      <div className="max-sm:text-center">
        Welcome, <b>{userName}</b>!
      </div>
      <Button onClick={handleSignOut}>Sign OUT</Button>
    </div>
  );
};
