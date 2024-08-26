export interface FormInputs {
  email: string;
  password: string;
}

export interface FormProps {
  title: string;
  submitLabel: string;
  onSubmit: (inputs: FormInputs) => void;
}
