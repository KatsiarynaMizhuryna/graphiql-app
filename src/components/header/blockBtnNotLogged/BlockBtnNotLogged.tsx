import { LinkButton } from '@/ui/linkButton';

export const BlockBtnNotLogged = () => {
  return (
    <div className="flex gap-5">
      <LinkButton href="/login">Sign IN</LinkButton>
      <LinkButton href="/registration">Sign UP</LinkButton>
    </div>
  );
};
