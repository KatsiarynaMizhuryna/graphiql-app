import { MainContent } from '@/components/welcomePage/mainContent/MainContent';
import { WelcomeContent } from '@/components/welcomePage/welcomeContent/WelcomeContent';

const userIsLogged = false;
const userName = 'John Doy';

const Home = () => {
  return (
    <main className="flex-grow container mx-auto flex-col items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {userIsLogged ? <MainContent userName={userName} /> : <WelcomeContent />}
    </main>
  );
};

export default Home;
