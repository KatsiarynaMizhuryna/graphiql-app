'use client';

import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/userSlice';
import { Button } from '@/ui/button';

export const BlockBtnIsLogged = () => {
  const dispatch = useDispatch();
  const { userName, userIsLogged } = useSelector(
    (state: RootState) => state.user
  );

  const handleSignOut = () => {
    dispatch(logOut());
    console.log(userIsLogged);
    console.log('click');
  };

  return (
    <div className="flex gap-5">
      <div>Welcome, {userName}!</div>
      <Button onClick={handleSignOut}>Sign OUT</Button>
    </div>
  );
};
