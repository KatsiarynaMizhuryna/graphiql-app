import { oswald } from '@/ui/fonts';
import { LinkButton } from '@/ui/linkButton';

interface MainContentProps {
  userName: string;
}

export const MainContent = ({ userName }: MainContentProps) => {
  return (
    <>
      <div className="ml-auto place-content-end">
        <LinkButton href="/">Main page</LinkButton>
      </div>
      <h1
        className={`${oswald.className} text-4xl font-bold mb-10 text-center`}
      >
        Welcome Back, {userName}!
      </h1>
      <div className="w-full flex justify-between max-sm:flex-col max-sm:text-center max-sm:gap-5 ">
        <LinkButton href="/#">REST Client</LinkButton>
        <LinkButton href="/#">GraphiQL Client</LinkButton>
        <LinkButton href="/#">History</LinkButton>
      </div>
    </>
  );
};
