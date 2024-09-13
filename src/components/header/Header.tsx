'use client';
import { Logo } from '@/components/header/logo/Logo';
import { Switcher } from '@/components/header/switcher/Switcher';
import { BlockBtnIsLogged } from '@/components/header/blockBtnIsLogged/BlockBtnIsLogged';
import { BlockBtnNotLogged } from '@/components/header/blockBtnNotLogged/BlockBtnNotLogged';
import { useEffect, useState } from 'react';
import { app } from '@/../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

export const Header = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 70) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`page-header w-full top-0 z-50 transition-transform duration-300 ease-out ${
        isSticky
          ? 'fixed shadow-lg py-2 backdrop-blur-lg animate-slideDown'
          : 'relative'
      }`}
      data-testid="header"
    >
      <div className="container mx-auto flex items-center justify-between px-20 py-10 max-sm:flex-col  max-sm:gap-3 max-sm:p-5">
        <Logo />
        <Switcher />
        {user ? <BlockBtnIsLogged /> : <BlockBtnNotLogged />}
      </div>
    </header>
  );
};
