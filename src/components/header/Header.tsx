'use client';
import { Logo } from '@/components/header/logo/Logo';
import { Switcher } from '@/components/header/switcher/Switcher';
import { SignUp } from '@/components/header/signUp/SignUp';

export const Header = () => {
  return (
    <header className="flex w-full h-28 items-center justify-between bg-gray-300 px-10">
      <Logo />
      <Switcher />
      <SignUp />
    </header>
  );
};
