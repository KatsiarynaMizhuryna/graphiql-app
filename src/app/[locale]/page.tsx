'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/../firebase';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import { WelcomeContent } from '@/components/mainPage/welcomeContent/WelcomeContent';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';
import { CustomToaster } from '@/ui/toaster';

const Home = () => {
  const [user, loading, error] = useAuthState(getAuth(app));
  if (error) return toast.error(`${error.message}`);

  return (
    <main
      className="flex-grow container mx-auto flex flex-col items-center justify-around px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
      data-testid="children-content"
    >
      <CustomToaster />
      {user ? <BlockBtnApps /> : null}
      {loading ? <p>Loading...</p> : <WelcomeContent />}
    </main>
  );
};

export default Home;
