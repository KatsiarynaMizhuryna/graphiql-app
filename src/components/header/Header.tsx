'use client';

import { Logo } from '@/components/header/logo/Logo';
import { Switcher } from '@/components/header/switcher/Switcher';
import { BlockBtnIsLogged } from '@/components/header/blockBtnIsLogged/BlockBtnIsLogged';
import { BlockBtnNotLogged} from '@/components/header/blockBtnNotLogged/BlockBtnNotLogged';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';


export const Header = () => {
  const { userIsLogged } = useSelector((state: RootState) => state.user);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`page-header w-full top-0 z-50 transition-transform duration-300 ease-out ${
        isSticky
          ? 'fixed shadow-lg py-2 backdrop-blur-lg transform translate-y-0 animate-slideDown'
          : ''
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-20">
        <Logo />
        <Switcher />
        {userIsLogged ? <BlockBtnIsLogged /> : <BlockBtnNotLogged />}
      </div>
    </header>
  );
};
