'use client';

import { WelcomeContent } from '@/components/mainPage/welcomeContent/WelcomeContent';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Home = () => {
  const { userIsLogged } = useSelector((state: RootState) => state.user);
  return (
    <main className="flex-grow container mx-auto flex flex-col items-center justify-around px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {userIsLogged ? <BlockBtnApps /> : null}
      <WelcomeContent />
    </main>
  );
};

export default Home;
