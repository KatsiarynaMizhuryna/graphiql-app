'use client';
import Form from '@/ui/form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/../firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormInputs } from '@/interfaces/form';

const SignUp: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSignUp = async (inputs: FormInputs) => {
    const { email, password } = inputs;
    setError('');
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      router.push('/login');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <Form
        title="Sign up to your account"
        submitLabel="Sign up"
        onSubmit={handleSignUp}
      />
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export default SignUp;
