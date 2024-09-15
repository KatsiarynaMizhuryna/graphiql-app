'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Form from '@/ui/form';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/../firebase';
import { FormInputs } from '@/interfaces/form';
import { checkedLocalStorage } from '@/store/localStorage';
import toast from 'react-hot-toast';

const SignIn: React.FC = () => {
  const t = useTranslations('Forms');
  const locale = useLocale();
  const router = useRouter();

  const handleSignIn = async (inputs: FormInputs) => {
    const { email, password } = inputs;
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      await fetch(`/${locale}/login`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      if (credential.user.email) {
        checkedLocalStorage(credential.user.uid, credential.user.email);
      }

      router.push(`/${locale}/`);
      toast.success(`${t('hi')}, ${credential.user.email}`);
    } catch (e) {
      const errorMessage = (e as Error).message
        .replaceAll('-', ' ')
        .replaceAll('(', ' ')
        .replace(')', ' ')
        .replace('.', '');
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Form
        title={t('signIn.title')}
        submitLabel={t('signIn.label')}
        onSubmit={handleSignIn}
      />
    </>
  );
};

export default SignIn;
