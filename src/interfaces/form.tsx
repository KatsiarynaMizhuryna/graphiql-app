export interface FormProps {
  title: string;
  submitLabel: string;
  onSubmit: () => void;
}

export interface FormInputs {
  email: string;
  password: string;
}
