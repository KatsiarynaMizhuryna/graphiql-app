export interface FormInputs {
  email: string;
  password: string;
}

export interface FormProps {
  title: string;
  submitLabel: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (inputs: FormInputs) => void;
}
