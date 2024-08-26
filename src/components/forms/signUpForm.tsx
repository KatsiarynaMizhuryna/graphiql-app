'use client'
import Form from '@/ui/form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "@/../firebase"
import { useRouter } from "next/navigation";
import { useState } from 'react';

const SignUp: React.FC =  () => {   
  const [error, setError] = useState("");
  const router = useRouter();
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault();
        setError("");
        console.log("Email:", email);
        console.log("Password:", password);  
        console.log(app);  
        const createUser = createUserWithEmailAndPassword(getAuth(app), email, password);
        console.log(createUser)
        try {
          await createUserWithEmailAndPassword(getAuth(app), email, password);
          router.push("/login");
        } catch (e) {
          setError((e as Error).message);
        }    
      };
  return (       
      <Form
      title="Sign up to your account"      
      submitLabel="Sign up"
      onSubmit={handleSignUp}
    />    
  );
};

export default SignUp;
