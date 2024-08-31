'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Form from '@/ui/form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/../firebase';
import { useRouter } from 'next/navigation';
import { FormInputs } from '@/interfaces/form';
import toast from 'react-hot-toast';
import { saveUserToLocalStorage } from '@/store/localStorage';

const SignUp: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Forms');
  const router = useRouter();

  const handleSignUp = async (inputs: FormInputs) => {
    const { email, password } = inputs;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );

      const userId = userCredential.user.uid;
      const userEmail = userCredential.user.email;

      if (userEmail) {
        saveUserToLocalStorage(userId, userEmail);
      }

      toast.success(`Hello, ${email}!`);
      router.push(`/${locale}/`);
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
        title={t('signUp.title')}
        submitLabel={t('signUp.label')}
        onSubmit={handleSignUp}
      />
    </>
  );
};

export default SignUp;
