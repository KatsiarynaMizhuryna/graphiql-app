'use client'
import Form from '@/ui/form';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "@/../firebase"

const SignIn: React.FC = () => { 
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    setError("");
    console.log("Email:", email);
    console.log("Password:", password); 
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      console.log("idToken",idToken)
      await fetch("/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }   
  };
  return (       
      <Form
      title="Sign in to your account"      
      submitLabel="Sign in"
      onSubmit={handleSignIn}
    />    
  );
};

export default SignIn;
