import { LinkButton } from '@/ui/linkButton';

interface MainContentProps {
  userName: string;
}

const userName = 'John Doy';

export const MainContent = ({ userName }: MainContentProps) => {
  return (<div className="flex-grow container mx-auto flex flex-col items-center justify-between gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28">
      <div className="ml-auto">
        <LinkButton className="ml-auto" href="/">
          Main page
        </LinkButton>
      </div>
      <div className="flex-grow place-content-center">
        Welcome Back, {userName}!
      </div>
      <div className="flex flex-row justify-between">
        <LinkButton href="/#">REST Client</LinkButton>
        <LinkButton href="/#">GraphiQL Client</LinkButton>
        <LinkButton href="/#">History</LinkButton>
      </div>
    </div>
  );
};
