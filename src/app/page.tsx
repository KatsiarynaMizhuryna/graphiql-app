'use client'
import { oswald } from '@/ui/fonts';
import { LinkButton } from '@/ui/linkButton';
import {useAuthState} from 'react-firebase-hooks/auth'
import { app } from "@/../firebase";
import { getAuth } from 'firebase/auth';

const Home = () => {
  const [user, loading, error] = useAuthState(getAuth(app));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;  
  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1 className={`${oswald.className} text-xl text-gray-800 md:text-7xl md:leading-normal`}>
        Welcome {user ? `back, ${user.email}` : '!' }
      </h1>
      <div className="flex items-center gap-4">
      
        <LinkButton href="/login">Sign In</LinkButton>
        <LinkButton href="/registration">Sign Up</LinkButton>
      </div>
    </main>
  );
};

export default Home;
