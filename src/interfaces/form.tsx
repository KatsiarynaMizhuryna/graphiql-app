export interface FormProps {
  title: string;
  submitLabel: string;
  onSubmit: (email: string, password: string) => void;
}

export interface FormInputs {
  email: string;
  password: string;
}
