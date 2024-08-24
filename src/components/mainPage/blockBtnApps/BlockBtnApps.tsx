import { LinkButton } from '@/ui/linkButton';

export const BlockBtnApps = () => {
  return (
    <>
      <div className="w-full flex justify-between max-sm:flex-col max-sm:text-center max-sm:gap-5 ">
        <LinkButton href="/#">REST Client</LinkButton>
        <LinkButton href="/#">GraphiQL Client</LinkButton>
        <LinkButton href="/#">History</LinkButton>
      </div>
    </>
  );
};
