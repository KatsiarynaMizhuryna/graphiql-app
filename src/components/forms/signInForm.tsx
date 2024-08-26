'use client';
import Form from '@/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/../firebase';
import { FormInputs } from '@/interfaces/form';

const SignIn: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (inputs: FormInputs) => {
    const { email, password } = inputs;
    setError('');
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      await fetch('/login', {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      router.push('/');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <Form
        title="Sign in to your account"
        submitLabel="Sign in"
        onSubmit={handleSignIn}
      />
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export default SignIn;
