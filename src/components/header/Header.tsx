'use client';
import { Logo } from '@/components/header/logo/Logo';
import { Switcher } from '@/components/header/switcher/Switcher';
import { SignUp } from '@/components/header/signUp/SignUp';
import { useEffect, useState } from 'react';

export const Header = () => {
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
        <SignUp />
      </div>
    </header>
  );
};
