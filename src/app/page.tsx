import { oswald } from '@/ui/fonts';
import { LinkButton } from '@/ui/linkButton';


const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-around p-24">
      <h1
        className={`${oswald.className} text-xl text-gray-800 md:text-7xl md:leading-normal`}
      >
        Welcome!
      </h1>
      <div className="flex items-center gap-4">
        <LinkButton href="/login">Sign In</LinkButton>
        <LinkButton href="/logOut">Sign Up</LinkButton>
      </div>
    </main>
  );
}

export default Home;
