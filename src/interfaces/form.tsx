export interface FormProps {
    title: string;    
    submitLabel: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => void;
  }
