'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/../firebase';
import { getAuth } from 'firebase/auth';
import { WelcomeContent } from '@/components/mainPage/welcomeContent/WelcomeContent';
import { BlockBtnApps } from '@/components/mainPage/blockBtnApps/BlockBtnApps';

const Home = () => {
  const [user, loading, error] = useAuthState(getAuth(app));
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main
      className="flex-grow container mx-auto flex flex-col items-center justify-around px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
      data-testid="children-content"
    >
      {loading ? <p>Loading...</p> : null}
      {user ? <BlockBtnApps /> : null}
      <WelcomeContent />
    </main>
  );
};

export default Home;
