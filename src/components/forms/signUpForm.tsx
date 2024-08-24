'use client'
import Form from '@/ui/form';

const SignUp: React.FC = () => {
    const handleSignUp = (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);        
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