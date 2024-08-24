'use client';

import { RootState } from '@/store/store';
import { LinkButton } from '@/ui/linkButton';
import { useSelector } from 'react-redux';

export const BlockBtnIsLogged = () => {
  const { userName } = useSelector((state: RootState) => state.user);

  return (
    <div className='flex gap-5'>
      <div>Welcome, {userName}!</div>
      <LinkButton href="/registration">Sign OUT</LinkButton>
    </div>
  );
};
