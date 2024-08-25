import { LinkButton } from '@/ui/linkButton';

export const BlockBtnApps = () => {
  return (
    <>
      <div className="w-full flex justify-between max-sm:flex-col max-sm:text-center max-sm:gap-5 pb-10 max-sm:mt-5">
        <LinkButton href="/restClient">REST Client</LinkButton>
        <LinkButton href="/graphQlClient">GraphiQL Client</LinkButton>
        <LinkButton href="/history">History</LinkButton>
      </div>
    </>
  );
};
