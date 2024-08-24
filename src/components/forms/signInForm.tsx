'use client'
import Form from '@/ui/form';

const SignIn: React.FC = () => {
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);    
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
